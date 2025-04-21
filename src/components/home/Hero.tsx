
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-16 px-4 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-wellness-light via-white to-wellness-blue opacity-50 z-0"></div>
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 space-y-6">
          <div className="inline-block rounded-full bg-wellness-primary/10 px-3 py-1 text-sm text-wellness-secondary mb-2">
            Your journey to better mental health starts here
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wellness-dark">
            Find Peace and Balance with SereneMinds
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Professional mental health support, AI-assisted tools, and guidance accessible anywhere, anytime. Start your wellness journey today.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-wellness-primary hover:bg-wellness-secondary text-white font-medium">
              <Link to="/ai-chat">Talk to AI Assistant</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-wellness-primary text-wellness-primary hover:bg-wellness-light">
              <Link to="/counseling">Book a Session</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-wellness-${i === 1 ? 'primary' : i === 2 ? 'blue' : i === 3 ? 'green' : 'peach'}`}></div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">500+</span> people found relief this week
            </p>
          </div>
        </div>

        <div className="flex-1 lg:max-w-[500px] relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop"
              alt="Peaceful meditation scene" 
              className="w-full h-[350px] object-cover"
            />
            <div className="p-5">
              <h3 className="font-medium text-lg text-wellness-dark">Find your path to wellness</h3>
              <p className="text-gray-600">Personalized support for your mental health journey</p>
            </div>
          </div>
          <div className="absolute top-8 -right-6 w-24 h-24 bg-wellness-yellow rounded-full z-0 blur-xl"></div>
          <div className="absolute -bottom-4 -left-8 w-32 h-32 bg-wellness-primary/40 rounded-full z-0 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
