
import {
  Heart,
  MessageSquare,
  Video,
  Users,
  Pill,
  Lightbulb,
  BarChart4,
  Headphones
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-wellness-primary" />,
      title: "AI Chat Support",
      description: "Talk to our AI mental health assistant anytime for immediate emotional support and guidance.",
      link: "/ai-chat"
    },
    {
      icon: <Video className="h-10 w-10 text-wellness-primary" />,
      title: "Professional Counseling",
      description: "Connect with licensed therapists through video calls or chat sessions for personalized care.",
      link: "/counseling"
    },
    {
      icon: <Users className="h-10 w-10 text-wellness-primary" />,
      title: "Group Sessions",
      description: "Join supportive communities in group therapy sessions led by mental health professionals.",
      link: "/groups"
    },
    {
      icon: <Headphones className="h-10 w-10 text-wellness-primary" />,
      title: "Guided Meditation",
      description: "Access a library of guided meditation sessions for stress relief and mindfulness practice.",
      link: "/meditation"
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-wellness-primary" />,
      title: "Self-Help Tools",
      description: "Explore evidence-based self-help resources, worksheets, and activities to support your journey.",
      link: "/self-help"
    },
    {
      icon: <Pill className="h-10 w-10 text-wellness-primary" />,
      title: "Medication Management",
      description: "Easily manage and order your mental health medications with convenient delivery options.",
      link: "/medication"
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-wellness-primary" />,
      title: "Mood Tracker",
      description: "Track your mood patterns and receive AI-powered insights and personalized recommendations.",
      link: "/mood-tracker"
    },
    {
      icon: <Heart className="h-10 w-10 text-wellness-primary" />,
      title: "Holistic Wellness",
      description: "Resources for complete mental wellness including sleep, nutrition, and physical activity.",
      link: "/wellness"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need for your mental wellness journey in one place, accessible anywhere and anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <a 
              href={feature.link}
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="mb-4 p-3 rounded-lg bg-wellness-light inline-flex">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-wellness-dark">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
