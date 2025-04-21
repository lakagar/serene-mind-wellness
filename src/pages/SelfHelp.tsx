
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Journaling",
    description: "Reflect on your thoughts and feelings daily for better mental clarity.",
  },
  {
    title: "Gratitude Practice",
    description: "Write 3 things you're grateful for each day to boost your mood.",
  },
  {
    title: "Breathing Exercises",
    description: "Try guided breathing to calm anxiety and stress within minutes.",
  },
];

const SelfHelp = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Self-Help Tools</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
            <p className="text-gray-700">{tool.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default SelfHelp;
