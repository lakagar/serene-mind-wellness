
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, VideoOff, Mic, MicOff, Phone, Settings, User, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const VideoCall = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const { toast } = useToast();

  const handleStartSession = () => {
    setIsSessionActive(true);
    toast({
      title: "Video Session Started",
      description: `Your ${sessionTime} minute session with Dr. David Miller has begun.`,
    });
    
    // In a real app, we would connect to a real session here
    setTimeLeft(sessionTime * 60);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const endCall = () => {
    setIsSessionActive(false);
    toast({
      title: "Video Session Ended",
      description: "Your session with Dr. David Miller has ended.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Video className="text-wellness-primary h-8 w-8" />
            <h1 className="text-3xl font-bold text-wellness-dark">Video Therapy Session</h1>
          </div>
          
          {!isSessionActive ? (
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Video Session</CardTitle>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="video" checked={videoEnabled} onCheckedChange={setVideoEnabled} />
                    <Label htmlFor="video">Enable Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
                    <Label htmlFor="audio">Enable Audio</Label>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarFallback className="bg-wellness-secondary text-white">DM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. David Miller</p>
                      <p className="text-sm text-gray-500">Clinical Psychologist</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Dr. Miller specializes in cognitive behavioral therapy and trauma-informed care. 
                    He has extensive experience helping clients with PTSD, anxiety disorders, and depression.
                  </p>
                </div>
                
                <Button onClick={handleStartSession} className="w-full bg-wellness-primary hover:bg-wellness-secondary">
                  Start Video Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="border-gray-200 shadow-sm overflow-hidden">
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  {/* Doctor's video */}
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    {videoEnabled ? (
                      <img 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Dr. David Miller" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarFallback className="bg-wellness-secondary text-white text-4xl">DM</AvatarFallback>
                        </Avatar>
                        <p className="text-white">Dr. David Miller</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Patient's video (small overlay) */}
                  <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-700 rounded-lg border-2 border-white shadow-lg overflow-hidden">
                    {videoEnabled ? (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <User className="h-12 w-12 text-white opacity-60" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                  
                  {/* Session timer */}
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                {/* Control bar */}
                <div className="p-4 bg-gray-100 flex items-center justify-center gap-4">
                  <Button 
                    variant={videoEnabled ? "outline" : "secondary"} 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant={audioEnabled ? "outline" : "secondary"} 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={endCall}
                  >
                    <Phone className="h-5 w-5 rotate-135" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoCall;
