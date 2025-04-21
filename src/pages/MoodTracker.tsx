
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, subDays } from "date-fns";

const moods = [
  { label: "Happy", value: "happy", icon: "😊" },
  { label: "Calm", value: "calm", icon: "😌" },
  { label: "Anxious", value: "anxious", icon: "😰" },
  { label: "Sad", value: "sad", icon: "😢" },
  { label: "Angry", value: "angry", icon: "😠" },
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

type MoodHistory = {
  [date: string]: string; // date in yyyy-MM-dd => mood value
};

function getTodayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

const LOCAL_KEY = "mood-tracker-history";

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [history, setHistory] = useState<MoodHistory>({});

  // Load history from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
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
  };

  // Get last 7 days including today
  const last7Days = Array.from({ length: 7 }).map((_, i) =>
    format(subDays(new Date(), i), "yyyy-MM-dd")
  ).reverse();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-wellness-dark">Mood Tracker</h1>

        {/* Date Picker */}
        <div className="mb-6 flex flex-col items-center max-w-xs mx-auto">
          <label className="mb-1 text-sm text-gray-600 font-medium flex items-center gap-2">
            <CalendarIcon size={18} /> Select Date
          </label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={date => date && setSelectedDate(date)}
            className="rounded-md border shadow"
            disabled={(date) => date > new Date()}
          />
          <span className="mt-2 text-xs text-gray-500">{isToday(selectedDate) ? "Today" : format(selectedDate, "eeee, dd MMM yyyy")}</span>
        </div>

        {/* Mood Selector */}
        <div className="mb-8">
          <div className="flex gap-4 justify-center items-center">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`text-4xl p-3 rounded-full border transition hover:scale-105
                  ${selectedMood === mood.value ? "bg-wellness-primary/20 border-wellness-primary" : "bg-white border-gray-300"}
                `}
                onClick={() => handleSelectMood(mood.value)}
                aria-label={mood.label}
                type="button"
              >
                <span>{mood.icon}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-xl mx-auto text-center">
          <div className="p-5 bg-white rounded-xl shadow text-lg min-h-[100px] flex items-center justify-center">
            {getSuggestion(selectedMood || "")}
          </div>
        </div>

        {/* Mood History */}
        <div className="max-w-xl mx-auto mt-10">
          <h2 className="text-lg font-semibold mb-4 text-wellness-dark">Your Mood for Past 7 Days</h2>
          <div className="bg-white rounded shadow divide-y divide-gray-100">
            {last7Days.map(dateStr => (
              <div key={dateStr} className="flex justify-between items-center px-4 py-2">
                <span className={dateStr === getTodayISO() ? "font-bold" : ""}>
                  {dateStr === getTodayISO() ? "Today" : format(new Date(dateStr), "eeee, MMM d")}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoodTracker;
