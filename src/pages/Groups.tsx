
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Clock } from "lucide-react";

const groups = [
  {
    id: 1,
    title: "Anxiety Support Group",
    facilitator: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    description: "A supportive space to share experiences and learn strategies for managing anxiety.",
    schedule: "Every Monday, 6:00 PM - 7:15 PM EST",
    participants: "6-8 participants",
    topics: ["Identifying anxiety triggers", "Breathing techniques", "Cognitive restructuring", "Building resilience"],
  },
  {
    id: 2,
    title: "Depression Management",
    facilitator: "Dr. Michael Roberts",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop", 
    description: "Connect with others experiencing depression and explore coping strategies together.",
    schedule: "Every Wednesday, 5:30 PM - 6:45 PM EST",
    participants: "6-8 participants",
    topics: ["Understanding depression", "Building daily routines", "Behavioral activation", "Challenging negative thoughts"],
  },
  {
    id: 3,
    title: "Grief & Loss Support",
    facilitator: "Rebecca Chen, LMFT",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    description: "A compassionate community for those navigating grief and processing loss.",
    schedule: "Every Thursday, 7:00 PM - 8:15 PM EST",
    participants: "6-8 participants",
    topics: ["The stages of grief", "Honoring memories", "Moving forward", "Self-care during grief"],
  },
  {
    id: 4,
    title: "Stress Management",
    facilitator: "Dr. James Wilson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    description: "Learn practical tools and techniques to manage stress in your daily life.",
    schedule: "Every Saturday, 10:00 AM - 11:15 AM EST",
    participants: "6-8 participants",
    topics: ["Identifying stressors", "Relaxation techniques", "Time management", "Setting boundaries"],
  },
  {
    id: 5,
    title: "Mindfulness for Beginners",
    facilitator: "Dr. Emily Torres",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    description: "An introduction to mindfulness practices and their benefits for mental wellbeing.",
    schedule: "Every Tuesday, 7:00 PM - 8:15 PM EST",
    participants: "6-8 participants",
    topics: ["Basic mindfulness principles", "Body scan practice", "Mindful eating", "Integrating mindfulness into daily life"],
  },
  {
    id: 6,
    title: "Building Healthy Relationships",
    facilitator: "Thomas Klein, LCSW",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    description: "Explore patterns in relationships and develop skills for healthier connections.",
    schedule: "Every Friday, 6:00 PM - 7:15 PM EST",
    participants: "6-8 participants",
    topics: ["Communication skills", "Setting boundaries", "Conflict resolution", "Building trust"],
  },
];

const GroupCard = ({ group }: { group: typeof groups[0] }) => {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-3">
          <div className="bg-wellness-light p-6 md:rounded-l-lg">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-wellness-primary" />
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">{group.description}</p>
                <div className="space-y-2">
                  <div className="flex gap-2 items-center text-sm">
                    <Calendar className="h-4 w-4 text-wellness-primary" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex gap-2 items-center text-sm">
                    <Users className="h-4 w-4 text-wellness-primary" />
                    <span>{group.participants}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full bg-wellness-primary hover:bg-wellness-secondary">
                Join Group
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
              <img 
                src={group.image} 
                alt={group.facilitator}
                className="w-16 h-16 rounded-full object-cover border-2 border-wellness-light" 
              />
              <div>
                <h4 className="font-medium">Facilitated by</h4>
                <p className="text-wellness-primary font-medium">{group.facilitator}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Topics Covered</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.topics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-wellness-primary"></div>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" className="border-wellness-primary text-wellness-primary">
                View Details
              </Button>
              <Button variant="outline" className="border-wellness-primary text-wellness-primary">
                Share Group
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Groups = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-wellness-light py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
                Group Support Sessions
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with others who understand what you're going through in a safe, 
                supportive environment guided by mental health professionals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-wellness-primary hover:bg-wellness-secondary">
                  Browse All Groups
                </Button>
                <Button size="lg" variant="outline" className="border-wellness-primary text-wellness-primary">
                  How Groups Work
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 text-wellness-dark">
                Benefits of Group Support
              </h2>
              <p className="text-gray-600">
                Group therapy offers unique advantages that complement individual therapy and self-care.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-wellness-light rounded-full p-3 inline-flex mb-4">
                    <Users className="h-8 w-8 text-wellness-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Community Connection</h3>
                  <p className="text-gray-600">
                    Reduce feelings of isolation by connecting with others who share similar experiences.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-wellness-light rounded-full p-3 inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-primary">
                      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <circle cx="17.5" cy="17.5" r="3.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Diverse Perspectives</h3>
                  <p className="text-gray-600">
                    Gain new insights and coping strategies from different viewpoints and experiences.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-wellness-light rounded-full p-3 inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-primary">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Mutual Support</h3>
                  <p className="text-gray-600">
                    Experience the healing power of both giving and receiving support in a safe environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Available Groups */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-wellness-dark">Available Group Sessions</h2>
            <div className="grid gap-6">
              {groups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center text-wellness-dark">How Group Sessions Work</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Browse and Select</h3>
                    <p className="text-gray-600">
                      Explore our group offerings and select the one that addresses your specific needs or interests.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Register and Confirm</h3>
                    <p className="text-gray-600">
                      Sign up for your chosen group session and receive confirmation with joining details.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Attend Session</h3>
                    <p className="text-gray-600">
                      Join via secure video link at the scheduled time. Sessions typically last 60-75 minutes.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-wellness-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Participate Regularly</h3>
                    <p className="text-gray-600">
                      For maximum benefit, try to attend sessions regularly. Most groups run for 8-12 weeks.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-wellness-light rounded-lg p-6">
                <h3 className="text-lg font-medium mb-3">Group Session Guidelines</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-wellness-primary mt-2"></div>
                    <span>Respect confidentiality - what's shared in the group stays in the group</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-wellness-primary mt-2"></div>
                    <span>Participate at your comfort level - there's no pressure to share</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-wellness-primary mt-2"></div>
                    <span>Be respectful of others' experiences and perspectives</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-wellness-primary mt-2"></div>
                    <span>Join from a private, quiet space to ensure confidentiality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Groups;
