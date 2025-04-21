
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Clock,
  Headphones,
  Volume2,
  Bookmark,
  Heart
} from "lucide-react";

const meditations = [
  {
    id: 1,
    title: "Morning Mindfulness",
    category: "Mindfulness",
    duration: "10 min",
    instructor: "Dr. Emily Torres",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
    description: "Begin your day with clarity and intention through this gentle mindfulness practice.",
    favorited: true,
  },
  {
    id: 2,
    title: "Anxiety Relief Breathing",
    category: "Stress Relief",
    duration: "15 min",
    instructor: "Dr. Michael Roberts",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5463805?q=80&w=400&auto=format&fit=crop",
    description: "A guided breathing exercise designed to reduce anxiety and create a sense of calm.",
    favorited: false,
  },
  {
    id: 3,
    title: "Body Scan for Sleep",
    category: "Sleep",
    duration: "20 min",
    instructor: "Rebecca Chen, LMFT",
    image: "https://images.unsplash.com/photo-1455642305354-a2cocb421f37?q=80&w=400&auto=format&fit=crop",
    description: "This gentle body scan will help release tension and prepare your mind and body for restful sleep.",
    favorited: true,
  },
  {
    id: 4,
    title: "Loving-Kindness Meditation",
    category: "Emotional Wellness",
    duration: "12 min",
    instructor: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?q=80&w=400&auto=format&fit=crop",
    description: "Cultivate compassion for yourself and others through this heart-centered practice.",
    favorited: false,
  },
  {
    id: 5,
    title: "Stress Relief Visualization",
    category: "Stress Relief",
    duration: "18 min",
    instructor: "Dr. James Wilson",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop",
    description: "Use the power of visualization to release stress and invite calm into your mind and body.",
    favorited: false,
  },
  {
    id: 6,
    title: "Mindful Walking Guide",
    category: "Mindfulness",
    duration: "15 min",
    instructor: "Dr. Emily Torres",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400&auto=format&fit=crop",
    description: "Transform a simple walk into a mindful practice that grounds you in the present moment.",
    favorited: false,
  },
];

const categories = [
  "All",
  "Mindfulness",
  "Stress Relief",
  "Sleep",
  "Emotional Wellness",
  "Beginners",
];

interface MeditationCardProps {
  meditation: typeof meditations[0];
  onPlay: () => void;
}

const MeditationCard = ({ meditation, onPlay }: MeditationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(meditation.favorited);
  
  return (
    <Card 
      className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={meditation.image} 
          alt={meditation.title}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            className="bg-wellness-primary hover:bg-wellness-secondary rounded-full h-12 w-12"
            onClick={onPlay}
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute top-3 right-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full bg-white/80 ${isFavorited ? 'text-red-500' : 'text-gray-500'}`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 bg-wellness-primary text-white text-xs px-2 py-1 rounded-full">
          {meditation.category}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg mb-1">{meditation.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{meditation.instructor}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {meditation.duration}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{meditation.description}</p>
      </CardContent>
    </Card>
  );
};

interface MeditationPlayerProps {
  isPlaying: boolean;
  currentMeditation: typeof meditations[0] | null;
  onClose: () => void;
  onPlayPause: () => void;
}

const MeditationPlayer = ({ isPlaying, currentMeditation, onClose, onPlayPause }: MeditationPlayerProps) => {
  if (!currentMeditation) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={currentMeditation.image} 
              alt={currentMeditation.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <h3 className="font-medium">{currentMeditation.title}</h3>
              <p className="text-sm text-gray-600">{currentMeditation.instructor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {currentMeditation.duration}
            </div>
            
            <Button 
              className={`bg-wellness-primary hover:bg-wellness-secondary rounded-full h-10 w-10`}
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-wellness-primary" style={{ width: '35%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>3:25</span>
            <span>{currentMeditation.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Meditation = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentMeditation, setCurrentMeditation] = useState<typeof meditations[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const filteredMeditations = activeCategory === "All" 
    ? meditations 
    : meditations.filter(m => m.category === activeCategory);
  
  const handlePlayMeditation = (meditation: typeof meditations[0]) => {
    setCurrentMeditation(meditation);
    setIsPlaying(true);
  };
  
  const handleCloseMeditation = () => {
    setCurrentMeditation(null);
    setIsPlaying(false);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-wellness-light to-wellness-blue/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
                Guided Meditation Collection
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover peace and balance with our library of guided meditations 
                designed to support your mental wellness journey.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <div className="border-b">
                <TabsList className="overflow-x-auto flex justify-start w-full bg-transparent">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-wellness-light data-[state=active]:text-wellness-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-wellness-primary rounded-none"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
            
            {/* Grid of Meditations */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeditations.map(meditation => (
                <MeditationCard 
                  key={meditation.id} 
                  meditation={meditation}
                  onPlay={() => handlePlayMeditation(meditation)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-wellness-light/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 text-wellness-dark">
                Benefits of Meditation
              </h2>
              <p className="text-gray-600">
                Regular meditation practice can have profound effects on your mental and physical wellbeing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-wellness-light rounded-full p-3 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain text-wellness-primary">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-3">Reduced Stress & Anxiety</h3>
                  <p className="text-gray-600">
                    Regular meditation activates the body's relaxation response, lowering stress hormones 
                    and reducing symptoms of anxiety.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-wellness-light rounded-full p-3 mb-4">
                    <Headphones className="h-8 w-8 text-wellness-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Improved Focus</h3>
                  <p className="text-gray-600">
                    Meditation trains your attention and increases your ability to concentrate on tasks 
                    for longer periods.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-wellness-light rounded-full p-3 mb-4">
                    <Heart className="h-8 w-8 text-wellness-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Emotional Wellbeing</h3>
                  <p className="text-gray-600">
                    Develop greater emotional regulation, resilience, and a more positive outlook 
                    through consistent practice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-wellness-dark">
                Meditation Tips for Beginners
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-light rounded-full p-3">
                    <Volume2 className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Start Small</h3>
                    <p className="text-gray-600">
                      Begin with just 5 minutes daily and gradually increase your meditation time as you become more comfortable.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-light rounded-full p-3">
                    <Clock className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Consistency is Key</h3>
                    <p className="text-gray-600">
                      Try to meditate at the same time each day to establish a routine that will help make meditation a habit.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-light rounded-full p-3">
                    <Bookmark className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Be Patient</h3>
                    <p className="text-gray-600">
                      Don't judge your meditation experience. It's normal for the mind to wander; simply notice and gently bring your attention back.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild size="lg" className="bg-wellness-primary hover:bg-wellness-secondary px-8">
                  <a href="/self-help">Explore Self-Help Resources</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Meditation Player */}
      {currentMeditation && (
        <MeditationPlayer 
          isPlaying={isPlaying}
          currentMeditation={currentMeditation}
          onClose={handleCloseMeditation}
          onPlayPause={handlePlayPause}
        />
      )}
    </div>
  );
};

export default Meditation;
