
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

const MoodTracker = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-wellness-dark">Mood Tracker</h1>
        <div className="mb-8">
          <div className="flex gap-4 justify-center items-center">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`text-4xl p-3 rounded-full border transition hover-scale ${
                  selected === mood.value ? "bg-wellness-primary/20 border-wellness-primary" : "bg-white border-gray-300"
                }`}
                onClick={() => setSelected(mood.value)}
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
            {getSuggestion(selected || "")}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoodTracker;
