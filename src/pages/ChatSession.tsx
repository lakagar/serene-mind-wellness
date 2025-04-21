
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User, ArrowUp, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const ChatSession = () => {
  const [message, setMessage] = useState("");
  const [sessionTime, setSessionTime] = useState(30);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // in seconds
  const { toast } = useToast();

  const handleStartSession = () => {
    setIsSessionActive(true);
    toast({
      title: "Chat Session Started",
      description: `Your ${sessionTime} minute session with Dr. Sarah Johnson has begun.`,
    });
    
    // In a real app, we would connect to a real session here
    setTimeLeft(sessionTime * 60);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-wellness-primary h-8 w-8" />
            <h1 className="text-3xl font-bold text-wellness-dark">Chat Therapy Session</h1>
          </div>
          
          {!isSessionActive ? (
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Chat Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Session Duration</h3>
                  <div className="flex items-center gap-4">
                    <Slider 
                      value={[sessionTime]} 
                      min={15} 
                      max={60} 
                      step={15} 
                      onValueChange={(values) => setSessionTime(values[0])}
                      className="w-full"
                    />
                    <span className="font-medium w-20 text-right">{sessionTime} mins</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarFallback className="bg-wellness-secondary text-white">SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Licensed Therapist</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Dr. Johnson specializes in anxiety, depression, and stress management. 
                    She has over 10 years of experience helping people navigate life's challenges.
                  </p>
                </div>
                
                <Button onClick={handleStartSession} className="w-full bg-wellness-primary hover:bg-wellness-secondary">
                  Start Chat Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-wellness-secondary text-white">SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. Sarah Johnson</p>
                        <p className="text-sm text-gray-500">Licensed Therapist</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-wellness-primary bg-opacity-10 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-wellness-primary" />
                      <span className="text-sm font-medium text-wellness-primary">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  
                  {/* Placeholder for chat messages */}
                  <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3 bg-gray-50">
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                        <p>Hello! I'm Dr. Johnson. How are you feeling today?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="max-w-[80%] p-3 rounded-lg bg-wellness-primary text-white">
                        <p>Hi Dr. Johnson. I've been struggling with anxiety lately, especially at work.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                        <p>I'm sorry to hear that. Can you tell me more about what situations at work trigger your anxiety?</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 bg-gray-200">
                        <User className="h-5 w-5" />
                      </Avatar>
                      <div className="flex-grow relative">
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here..."
                          className="pr-12 resize-none min-h-[80px]"
                          rows={2}
                        />
                        <Button
                          size="icon"
                          className="absolute right-2 bottom-2 bg-wellness-primary hover:bg-wellness-secondary h-8 w-8"
                          disabled={message.trim() === ""}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button 
                  variant="destructive" 
                  onClick={() => setIsSessionActive(false)}
                >
                  End Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatSession;
