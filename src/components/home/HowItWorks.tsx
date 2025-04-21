
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Tell us how you're feeling",
      description: "Start by talking to our AI assistant or take a quick assessment to help us understand your needs.",
      color: "bg-wellness-blue"
    },
    {
      number: "02",
      title: "Explore personalized recommendations",
      description: "Based on your input, we'll suggest appropriate resources, tools, and support options.",
      color: "bg-wellness-green"
    },
    {
      number: "03",
      title: "Connect with support",
      description: "Book sessions with professionals, join group discussions, or use self-help tools at your own pace.",
      color: "bg-wellness-peach"
    },
    {
      number: "04",
      title: "Track your progress",
      description: "Monitor your mood, set goals, and celebrate improvements on your mental wellness journey.",
      color: "bg-wellness-yellow"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-wellness-primary font-medium mb-3">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
            How SereneMinds Works
          </h2>
          <p className="text-lg text-gray-600">
            Your journey to better mental health in four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`${step.color} rounded-xl h-32 md:h-48 flex items-center justify-center mb-6`}>
                <span className="text-4xl md:text-6xl font-bold text-white/80">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-wellness-dark">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-8 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-wellness-primary hover:bg-wellness-secondary px-8">
            <Link to="/ai-chat">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
