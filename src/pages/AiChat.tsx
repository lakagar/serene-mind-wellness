import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, User, Bot, ArrowUp } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your mental wellness assistant. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample AI responses for demo purposes
  const aiResponses = [
    "I understand that can be challenging. Could you tell me more about what's troubling you?",
    "It sounds like you're going through a difficult time. Remember, it's okay to feel this way, and there are ways to cope.",
    "Thank you for sharing that with me. Have you tried any relaxation techniques that have helped you in the past?",
    "I hear you. Sometimes life can feel overwhelming. What's one small thing you could do today to take care of yourself?",
    "That's a common feeling many people experience. Would you like to learn some strategies that might help?",
    "It takes courage to talk about these feelings. How long have you been experiencing this?",
    "I'm here to listen and support you. Would it help to explore some grounding exercises together?",
    // Expanded customer query support:
    "For medicine orders: You can check your order status in the Medication section. Would you like help finding your order?",
    "Our counseling sessions can be booked online or via phone. Do you want guidance on booking?",
    "Group sessions are available weekly. Would you like to see the upcoming schedule?",
    "If you're having trouble logging in or signing up, please let me know. I can offer troubleshooting steps.",
    "For refunds or payments, please make sure your information is up to date in your profile.",
    "Do you have questions about our wellness product categories or which might be best for you?",
    "If you need urgent assistance, please reach out via the Contact section or call our helpline.",
  ];

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
            <h1 className="text-3xl font-bold text-wellness-dark">AI Mental Wellness Chat</h1>
          </div>
          
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-wellness-primary">
                    <Bot className="h-5 w-5" />
                  </Avatar>
                  <div>
                    <p className="font-medium">SereneMinds AI</p>
                    <p className="text-sm text-gray-500">Mental wellness assistant</p>
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="p-4 h-[500px] overflow-y-auto flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? "bg-wellness-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 bg-gray-200">
                    <User className="h-5 w-5" />
                  </Avatar>
                  <div className="flex-grow relative">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message here..."
                      className="pr-12 resize-none min-h-[80px]"
                      rows={2}
                    />
                    <Button
                      size="icon"
                      className="absolute right-2 bottom-2 bg-wellness-primary hover:bg-wellness-secondary h-8 w-8"
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === ""}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This AI assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-wellness-dark">Need more support?</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="border-wellness-primary text-wellness-primary">
                <a href="/counseling">Book a Professional Session</a>
              </Button>
              <Button asChild variant="outline" className="border-wellness-primary text-wellness-primary">
                <a href="/self-help">Explore Self-Help Tools</a>
              </Button>
              <Button asChild variant="outline" className="border-wellness-primary text-wellness-primary">
                <a href="/groups">Join a Support Group</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiChat;
