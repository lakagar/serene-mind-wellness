import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, History } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, subDays, parseISO, compareAsc } from "date-fns";
import { toast } from "sonner";
import TherapistReport from "@/components/mood/TherapistReport";
import { useTranslation } from "react-i18next";
import { TherapistReportType } from "@/components/mood/TherapistReport";

const moods = [
  { label: "happy", value: "happy", icon: "😊" },
  { label: "calm", value: "calm", icon: "😌" },
  { label: "anxious", value: "anxious", icon: "😰" },
  { label: "sad", value: "sad", icon: "😢" },
  { label: "angry", value: "angry", icon: "😠" },
];

function getSuggestion(mood: string): string {
  switch (mood) {
    case "happy":
      return "Keep doing what you're doing! Consider spreading your positive energy.";
    case "calm":
      return "Enjoy this serenity! Try a relaxing meditation to stay in the moment.";
    case "anxious":
      return "Try a 5-minute breathing exercise or journaling session to calm your mind.";
    case "sad":
      return "Reach out to a friend, or try a gratitude practice to gently lift your mood.";
    case "angry":
      return "Consider a walk or some deep breathing—it's okay to acknowledge how you feel.";
    default:
      return "Select a mood to get a personalized suggestion.";
  }
}

// Function to generate a summary based on the last 7 days mood patterns
function getLocalSummary(history: MoodHistory): string {
  const last7 = getLast7Days().filter((d) => !!history[d]);
  
  if (last7.length === 0) {
    return "No mood data available for the last 7 days.";
  }

  // Count occurrences of each mood
  const moodCounts: Record<string, number> = {};
  let mostFrequentMood = "";
  let maxCount = 0;

  last7.forEach(date => {
    const mood = history[date];
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    
    if (moodCounts[mood] > maxCount) {
      mostFrequentMood = mood;
      maxCount = moodCounts[mood];
    }
  });

  // Get the label of the most frequent mood
  const mostFrequentMoodLabel = moods.find(m => m.value === mostFrequentMood)?.label || "Unknown";
  
  // Check for mood variety
  const uniqueMoods = Object.keys(moodCounts).length;
  
  // Generate appropriate summary based on patterns
  if (uniqueMoods === 1) {
    // Only one mood all week
    if (mostFrequentMood === "happy") {
      return "You've had a consistently happy week! This is wonderful to see. Remember to celebrate these positive periods in your life.";
    } else if (mostFrequentMood === "calm") {
      return "Your week has been consistently calm. This steadiness can be a great foundation. Consider how to maintain this balanced state.";
    } else if (mostFrequentMood === "anxious") {
      return "You've been feeling anxious throughout the week. Try to identify specific triggers and maybe consider some calming activities like deep breathing or nature walks.";
    } else if (mostFrequentMood === "sad") {
      return "You've been experiencing sadness consistently this week. Remember it's okay to feel down, but also consider reaching out for support if needed.";
    } else if (mostFrequentMood === "angry") {
      return "You've experienced anger throughout the week. Consider healthy ways to process these feelings, like physical exercise or journaling about your thoughts.";
    }
  } else if (uniqueMoods >= 3) {
    return `Your week showed quite a range of emotions, with ${mostFrequentMoodLabel.toLowerCase()} being your most common feeling. Emotional variety is normal - consider noting what might have triggered these changes.`;
  } else {
    return `This week, you've primarily felt ${mostFrequentMoodLabel.toLowerCase()}. Notice what activities or situations might be influencing your mood patterns.`;
  }
  
  return "Looking at your mood patterns can help you understand yourself better. Consider what might have influenced these feelings.";
}

type MoodHistory = {
  [date: string]: string; // date in yyyy-MM-dd => mood value
};

function getTodayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

const LOCAL_KEY = "mood-tracker-history";
const REPORTS_STORAGE_KEY = 'counseling-reports';

const getLast7Days = () =>
  Array.from({ length: 7 }).map((_, i) =>
    format(subDays(new Date(), i), "yyyy-MM-dd")
  ).reverse();

const getSortedDates = (history: MoodHistory) =>
  Object.keys(history).sort((a, b) => compareAsc(parseISO(a), parseISO(b)));

const MoodTracker = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [history, setHistory] = useState<MoodHistory>({});
  const [apiKey, setApiKey] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [summaryErr, setSummaryErr] = useState<string | null>(null);
  const [showAllHistory, setShowAllHistory] = useState<boolean>(false);
  const [useLocalSummary, setUseLocalSummary] = useState<boolean>(false);
  const [publishedReports, setPublishedReports] = useState<TherapistReportType[]>([]);

  // Load history from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (stored) {
      setPublishedReports(JSON.parse(stored));
    }
  }, []);

  // Update selectedMood if date changes (show mood for selected date)
  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setSelectedMood(history[dateStr] || null);
  }, [selectedDate, history]);

  // Save mood selection for the chosen date
  const handleSelectMood = (moodValue: string) => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const updatedHistory = { ...history, [dateStr]: moodValue };
    setHistory(updatedHistory);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedHistory));
    setSelectedMood(moodValue);
    
    // Show confirmation toast
    const moodLabel = moods.find(m => m.value === moodValue)?.label || "Unknown";
    toast.success(`${moodLabel} mood saved for ${format(selectedDate, "MMM d")}`);
  };

  // --- AI SUMMARY FUNCTIONALITY ---
  async function fetchAiSummary() {
    setLoadingSummary(true);
    setAiSummary(null);
    setSummaryErr(null);

    const last7 = getLast7Days().filter((d) => !!history[d]);
    if (!apiKey && !useLocalSummary) {
      setSummaryErr("Please enter your Perplexity API key or switch to local summary.");
      setLoadingSummary(false);
      return;
    }
    if (last7.length === 0) {
      setSummaryErr("No mood data available for the last 7 days.");
      setLoadingSummary(false);
      return;
    }

    // If using local summary, generate it without API
    if (useLocalSummary) {
      setAiSummary(getLocalSummary(history));
      setLoadingSummary(false);
      return;
    }

    // build a readable report for AI
    const dailyLines = last7.map((date) => {
      const mood = history[date];
      const moodLabel = moods.find((m) => m.value === mood)?.label || "Unknown";
      return `${format(parseISO(date), "eeee (MMM d)")}: ${moodLabel}`;
    }).join("\n");

    const prompt = `
You are an empathetic mental health coach. 
Here is a user's 7-day mood journal:
${dailyLines}
Please write a short, friendly summary of their weekly mood pattern, highlighting positive changes, repeating feelings, or helpful tips for balance or well-being. Do NOT offer clinical diagnoses. Limit to 2-4 sentences. Be friendly and supportive.
`;

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            { role: "system", content: "Be precise and concise." },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 400,
          return_images: false,
          return_related_questions: false,
          search_domain_filter: ["perplexity.ai"],
          search_recency_filter: "month",
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch summary.");
      const data = await response.json();
      setAiSummary(data.choices?.[0]?.message?.content || "No summary generated.");
    } catch (err: any) {
      setSummaryErr("Could not fetch summary. Try using the local summary option instead.");
      setUseLocalSummary(true); // Auto-switch to local summary on error
    } finally {
      setLoadingSummary(false);
    }
  }

  const handlePublishReport = (report: TherapistReportType) => {
    const updatedReports = [...publishedReports, report];
    setPublishedReports(updatedReports);
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));
  };

  // Toggle between local and API summary
  const toggleSummaryMode = () => {
    setUseLocalSummary(prev => !prev);
    setAiSummary(null);
    setSummaryErr(null);
  };

  // --- HISTORY LIST FOR ALL TIME ---
  const allDatesSorted = getSortedDates(history);

  // UI
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-wellness-dark">
          {t('mood.title')}
        </h1>

        {/* AI Mood Summary */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-wellness-primary/30 via-white to-white p-5 rounded-xl shadow flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-between">
              <span className="font-semibold flex items-center gap-2 text-lg">
                <History size={18} /> 
                {useLocalSummary ? "Mood Summary (Local)" : "AI Mood Summary"} (Last 7 Days)
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={useLocalSummary ? "outline" : "secondary"} 
                  onClick={toggleSummaryMode}
                >
                  {useLocalSummary ? "Use API" : "Use Local"}
                </Button>
                <Button size="sm" variant="outline" onClick={fetchAiSummary} disabled={loadingSummary}>
                  {loadingSummary ? "Analyzing..." : "Generate"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {!useLocalSummary && (
                <input
                  type="password"
                  placeholder="Perplexity API Key"
                  className="border px-3 py-2 rounded bg-gray-50 text-sm mb-2"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  autoComplete="off"
                />
              )}
              {summaryErr && (
                <span className="text-sm text-red-500">{summaryErr}</span>
              )}
              {!summaryErr && aiSummary && (
                <div className="bg-white p-3 rounded text-gray-700 border">{aiSummary}</div>
              )}
              {!summaryErr && !aiSummary && !loadingSummary && (
                <div className="text-gray-400 text-sm">Click "Generate" for a {useLocalSummary ? "locally generated" : "personalized AI"} summary.</div>
              )}
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-6 flex flex-col items-center max-w-xs mx-auto">
          <label className="mb-1 text-sm text-gray-600 font-medium flex items-center gap-2">
            <CalendarIcon size={18} /> {t('mood.selectDate')}
          </label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={date => date && setSelectedDate(date)}
            className="rounded-md border shadow"
            disabled={(date) => date > new Date()}
          />
          <span className="mt-2 text-xs text-gray-500">
            {isToday(selectedDate) ? t('mood.today') : format(selectedDate, "eeee, dd MMM yyyy")}
          </span>
        </div>

        {/* Mood Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`text-4xl p-3 rounded-full border transition hover:scale-105
                  ${selectedMood === mood.value ? "bg-wellness-primary/20 border-wellness-primary" : "bg-white border-gray-300"}
                `}
                onClick={() => handleSelectMood(mood.value)}
                aria-label={t(`mood.${mood.label}`)}
                type="button"
              >
                <span>{mood.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Suggestion Display */}
        <div className="max-w-xl mx-auto text-center">
          <div className="p-5 bg-white rounded-xl shadow text-lg min-h-[100px] flex items-center justify-center">
            {getSuggestion(selectedMood || "")}
          </div>
        </div>

        {/* Therapist Report Section */}
        <TherapistReport 
          history={history} 
          apiKey={apiKey} 
          onError={(message) => {
            setSummaryErr(message);
            setUseLocalSummary(true);
          }}
          onPublish={handlePublishReport}
        />

        {/* Mood History */}
        <div className="max-w-xl mx-auto mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-wellness-dark">
              {showAllHistory ? t('mood.allTime') : t('mood.last7Days')}
            </h2>
            <Button size="sm" variant="ghost" onClick={() => setShowAllHistory(s => !s)}>
              {showAllHistory ? t('mood.show7Days') : t('mood.showAll')}
            </Button>
          </div>
          <div className="bg-white rounded shadow divide-y divide-gray-100">
            {(showAllHistory ? allDatesSorted : getLast7Days()).map(dateStr => (
              <div key={dateStr} className="flex justify-between items-center px-4 py-2">
                <span className={dateStr === getTodayISO() ? "font-bold" : ""}>
                  {dateStr === getTodayISO() ? "Today" : format(parseISO(dateStr), "eeee, MMM d")}
                </span>
                <span>
                  {
                    history[dateStr]
                      ? moods.find(m => m.value === history[dateStr])?.icon + " " + moods.find(m => m.value === history[dateStr])?.label
                      : <span className="text-gray-400">No mood recorded</span>
                  }
                </span>
              </div>
            ))}
            {((showAllHistory ? allDatesSorted : getLast7Days()).length === 0) && (
              <div className="px-4 py-6 text-center text-gray-400">No data yet.</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoodTracker;
