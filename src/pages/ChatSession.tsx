import { useState, useEffect } from "react";
import { getContextualResponse } from "@/utils/therapistResponses";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User, ArrowUp, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: 'user' | 'therapist';
  content: string;
  timestamp: Date;
}

const ChatSession = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'therapist',
      content: "Hello! I'm Dr. Sarah Johnson. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [sessionTime, setSessionTime] = useState(30);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const { toast } = useToast();

  useEffect(() => {
    if (isSessionActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsSessionActive(false);
            toast({
              title: "Session Ended",
              description: "Your therapy session has ended.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSessionActive, toast]);

  const handleStartSession = () => {
    setIsSessionActive(true);
    toast({
      title: "Chat Session Started",
      description: `Your ${sessionTime} minute session with Dr. Sarah Johnson has begun.`,
    });
    setTimeLeft(sessionTime * 60);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Get contextual therapist response
    setTimeout(() => {
      const response = getContextualResponse(userMessage.content);
      const therapistMessage: Message = {
        id: messages.length + 2,
        sender: 'therapist',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, therapistMessage]);
    }, 1000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
                  
                  {/* Chat messages */}
                  <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3 bg-gray-50">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex justify-${msg.sender === 'user' ? 'end' : 'start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user' 
                            ? 'bg-wellness-primary text-white' 
                            : 'bg-white border border-gray-100 shadow-sm'
                        }`}>
                          <p>{msg.content}</p>
                        </div>
                      </div>
                    ))}
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
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message here..."
                          className="pr-12 resize-none min-h-[80px]"
                          rows={2}
                        />
                        <Button
                          size="icon"
                          className="absolute right-2 bottom-2 bg-wellness-primary hover:bg-wellness-secondary h-8 w-8"
                          onClick={handleSendMessage}
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
