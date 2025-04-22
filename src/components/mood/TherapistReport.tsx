
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, subDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MoodHistory = {
  [date: string]: string;
};

export type TherapistReportType = {
  id: string;
  date: string;
  content: string;
  moodData: MoodHistory;
};

interface TherapistReportProps {
  history: MoodHistory;
  apiKey: string;
  onError: (message: string) => void;
  onPublish?: (report: TherapistReportType) => void;
}

const moods = [
  { label: "Happy", value: "happy", color: "#4ade80" },
  { label: "Calm", value: "calm", color: "#60a5fa" },
  { label: "Anxious", value: "anxious", color: "#facc15" },
  { label: "Sad", value: "sad", color: "#fb7185" },
  { label: "Angry", value: "angry", color: "#f43f5e" },
];

const TherapistReport = ({ history, apiKey, onError, onPublish }: TherapistReportProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const getLast30Days = () => {
    return Array.from({ length: 30 }).map((_, i) =>
      format(subDays(new Date(), i), "yyyy-MM-dd")
    ).reverse();
  };

  const prepareMoodData = () => {
    const moodCounts: { [key: string]: number } = {};
    Object.values(history).forEach(mood => {
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    return moods.map(mood => ({
      name: mood.label,
      count: moodCounts[mood.value] || 0,
      fill: mood.color,
    }));
  };

  const handlePublish = () => {
    if (!report) return;
    
    const newReport: TherapistReportType = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: report,
      moodData: { ...history }
    };

    // Store directly in localStorage to ensure it's saved
    const REPORTS_STORAGE_KEY = 'counseling-reports';
    const existingReportsJSON = localStorage.getItem(REPORTS_STORAGE_KEY);
    const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
    const updatedReports = [...existingReports, newReport];
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));

    // Call the onPublish callback if provided
    if (onPublish) {
      onPublish(newReport);
    }
    
    toast({
      title: t('mood.reportPublished'),
      description: t('mood.reportPublishedDesc'),
    });
  };

  const generateReport = async () => {
    setLoading(true);
    const last30 = getLast30Days();
    const dailyMoods = last30
      .map(date => {
        const mood = history[date];
        if (!mood) return null;
        const moodLabel = moods.find(m => m.value === mood)?.label || "Unknown";
        return `${format(parseISO(date), "MMM d")}: ${moodLabel}`;
      })
      .filter(Boolean)
      .join("\n");

    if (!dailyMoods) {
      onError("No mood data available for analysis");
      setLoading(false);
      return;
    }

    const prompt = `
As a professional therapist, analyze this 30-day mood log and provide a comprehensive report. Focus on:
1. Mood patterns and cycles
2. Notable changes or triggers
3. Potential areas for improvement
4. Positive developments

Mood log:
${dailyMoods}

Provide a professional yet empathetic analysis in 3-4 paragraphs.`;

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
            { role: "system", content: "You are a professional therapist providing an analysis of mood tracking data." },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate report");
      
      const data = await response.json();
      const analysisText = data.choices?.[0]?.message?.content;
      
      if (!analysisText) throw new Error("No analysis generated");
      
      setReport(analysisText);
      toast({
        title: "Report Generated",
        description: "The mood analysis report has been generated successfully.",
      });
    } catch (err) {
      onError("Failed to generate the report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    happy: { theme: { light: "#4ade80", dark: "#4ade80" } },
    calm: { theme: { light: "#60a5fa", dark: "#60a5fa" } },
    anxious: { theme: { light: "#facc15", dark: "#facc15" } },
    sad: { theme: { light: "#fb7185", dark: "#fb7185" } },
    angry: { theme: { light: "#f43f5e", dark: "#f43f5e" } },
  };

  return (
    <Card className="mt-8 max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{t('mood.therapistReport')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareMoodData()} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip content={({ active, payload }) => (
                  <div className="bg-background border p-2 rounded-lg shadow-lg">
                    {active && payload?.[0] && (
                      <div>
                        <div>{payload[0].payload.name}</div>
                        <div className="font-bold">{payload[0].value} days</div>
                      </div>
                    )}
                  </div>
                )} />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <Button 
          onClick={generateReport} 
          disabled={loading || Object.keys(history).length === 0}
          className="w-full"
        >
          {loading ? t('mood.generating') : t('mood.generateReport')}
        </Button>

        {report && (
          <div className="space-y-4">
            <div className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-line">
              {report}
            </div>
            {onPublish && (
              <Button 
                onClick={handlePublish}
                className="w-full"
                variant="secondary"
              >
                {t('mood.publishReport')}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TherapistReport;
