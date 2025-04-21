
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, MessageSquare, Users, Clock, Calendar } from "lucide-react";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    specialty: "Depression & Anxiety",
    experience: "10+ years",
    education: "Ph.D. Clinical Psychology",
    rating: 4.9,
    availability: "Mon, Wed, Fri",
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    specialty: "Trauma & PTSD",
    experience: "12+ years",
    education: "Ph.D. Psychology",
    rating: 4.8,
    availability: "Tue, Thu, Sat",
  },
  {
    id: 3,
    name: "Rebecca Chen, LMFT",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    specialty: "Relationships & Family",
    experience: "8+ years",
    education: "M.A. Marriage & Family Therapy",
    rating: 4.7,
    availability: "Mon, Tue, Thu",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    specialty: "Stress & Burnout",
    experience: "9+ years",
    education: "Psy.D. Clinical Psychology",
    rating: 4.9,
    availability: "Wed, Fri, Sat",
  },
];

const SessionCard = ({ name, type, icon }: { name: string; type: string; icon: React.ReactNode }) => (
  <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <CardContent className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="bg-wellness-light rounded-full p-3 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        <p className="text-sm text-gray-600">{type}</p>
      </div>
    </CardContent>
  </Card>
);

const TherapistCard = ({ therapist }: { therapist: typeof therapists[0] }) => (
  <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="flex-shrink-0">
          <img 
            src={therapist.image} 
            alt={therapist.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-wellness-light" 
          />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-lg font-medium mb-1">{therapist.name}</h3>
          <p className="text-wellness-primary font-medium mb-2">{therapist.specialty}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
            <span className="bg-wellness-light text-wellness-secondary text-xs px-2 py-1 rounded-full">
              {therapist.experience}
            </span>
            <span className="bg-wellness-light text-wellness-secondary text-xs px-2 py-1 rounded-full">
              {therapist.education}
            </span>
          </div>
          <div className="flex items-center gap-1 justify-center sm:justify-start mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < Math.round(therapist.rating) ? "#9b87f5" : "#e2e8f0"}
                className="inline-block"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">{therapist.rating}</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start text-sm text-gray-600 mb-4">
            <Calendar size={14} />
            <span>Available: {therapist.availability}</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Button className="bg-wellness-primary hover:bg-wellness-secondary">
              Book Video Session
            </Button>
            <Button variant="outline" className="border-wellness-primary text-wellness-primary">
              Book Chat Session
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Counseling = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-wellness-light py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
                Professional Counseling & Support
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with licensed mental health professionals through video calls or chat sessions for personalized care and guidance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-wellness-primary hover:bg-wellness-secondary">
                  Book a Session Now
                </Button>
                <Button size="lg" variant="outline" className="border-wellness-primary text-wellness-primary">
                  View Available Therapists
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Session Types */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-wellness-dark">Choose Your Session Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SessionCard 
                name="Video Counseling" 
                type="Face-to-face virtual sessions" 
                icon={<Video className="h-8 w-8 text-wellness-primary" />} 
              />
              <SessionCard 
                name="Chat Counseling" 
                type="Text-based therapy sessions" 
                icon={<MessageSquare className="h-8 w-8 text-wellness-primary" />} 
              />
              <SessionCard 
                name="Group Sessions" 
                type="Supportive community therapy" 
                icon={<Users className="h-8 w-8 text-wellness-primary" />} 
              />
            </div>
          </div>
        </section>

        {/* Session Information */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-wellness-dark">Session Information</h2>
              
              <Tabs defaultValue="individual">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="individual">Individual Sessions</TabsTrigger>
                  <TabsTrigger value="group">Group Sessions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="individual">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-wellness-dark">Individual Therapy Sessions</h3>
                      
                      <div className="grid gap-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Clock className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Session Duration</h4>
                            <p className="text-gray-600">45-50 minutes per session</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Calendar className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Session Frequency</h4>
                            <p className="text-gray-600">Weekly or bi-weekly, based on your needs and therapist recommendation</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Video className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Video Sessions</h4>
                            <p className="text-gray-600">Secure, private video calls with your therapist. You'll need a quiet, private space and a stable internet connection.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <MessageSquare className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Chat Sessions</h4>
                            <p className="text-gray-600">Text-based therapy sessions where you can communicate with your therapist through our secure messaging platform.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 mt-6 pt-6">
                        <h4 className="font-medium text-wellness-dark mb-3">Pricing</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Video Session (45-50 min)</span>
                            <span className="font-medium">$85</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Chat Session (45-50 min)</span>
                            <span className="font-medium">$70</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Monthly Subscription (4 sessions)</span>
                            <span className="font-medium">$299 <span className="text-sm text-green-600">Save 12%</span></span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="group">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-wellness-dark">Group Therapy Sessions</h3>
                      
                      <div className="grid gap-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Users className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Group Size</h4>
                            <p className="text-gray-600">Small groups of 6-8 participants for optimal interaction</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Clock className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Session Duration</h4>
                            <p className="text-gray-600">60-75 minutes per group session</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="bg-wellness-light rounded-full p-2 mt-1">
                            <Calendar className="h-5 w-5 text-wellness-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-wellness-dark">Frequency</h4>
                            <p className="text-gray-600">Weekly sessions on a fixed schedule</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <h4 className="font-medium text-wellness-dark">Available Group Types</h4>
                        <ul className="grid gap-3">
                          <li className="bg-wellness-light/50 p-3 rounded-md">
                            <h5 className="font-medium">Anxiety Support Group</h5>
                            <p className="text-sm text-gray-600">Every Monday, 6:00 PM - 7:15 PM</p>
                          </li>
                          <li className="bg-wellness-light/50 p-3 rounded-md">
                            <h5 className="font-medium">Depression Management</h5>
                            <p className="text-sm text-gray-600">Every Wednesday, 5:30 PM - 6:45 PM</p>
                          </li>
                          <li className="bg-wellness-light/50 p-3 rounded-md">
                            <h5 className="font-medium">Grief & Loss Support</h5>
                            <p className="text-sm text-gray-600">Every Thursday, 7:00 PM - 8:15 PM</p>
                          </li>
                          <li className="bg-wellness-light/50 p-3 rounded-md">
                            <h5 className="font-medium">Stress Management</h5>
                            <p className="text-sm text-gray-600">Every Saturday, 10:00 AM - 11:15 AM</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border-t border-gray-200 mt-6 pt-6">
                        <h4 className="font-medium text-wellness-dark mb-3">Pricing</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Single Group Session</span>
                            <span className="font-medium">$35</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Monthly Group Pass (4 sessions)</span>
                            <span className="font-medium">$120 <span className="text-sm text-green-600">Save 14%</span></span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Available Therapists */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-wellness-dark">Our Certified Therapists</h2>
            <div className="grid gap-6">
              {therapists.map(therapist => (
                <TherapistCard key={therapist.id} therapist={therapist} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-wellness-primary hover:bg-wellness-secondary">
                View All Therapists
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Counseling;
