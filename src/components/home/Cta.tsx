
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-wellness-primary/90 to-wellness-secondary/90 z-0"></div>
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-white/90 max-w-xl">
            Join thousands of others who have found support, guidance, and tools to improve their mental wellbeing with SereneMinds.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-gray-50 text-wellness-primary">
            <Link to="/ai-chat">Talk to AI Assistant</Link>
          </Button>
          <Button asChild size="lg" className="bg-wellness-dark/30 hover:bg-wellness-dark/50 border border-white/40 text-white">
            <Link to="/counseling">Book a Session</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
