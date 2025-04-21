
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AiChat from "./pages/AiChat";
import Counseling from "./pages/Counseling";
import Groups from "./pages/Groups";
import Meditation from "./pages/Meditation";
import NotFound from "./pages/NotFound";
import SelfHelp from "./pages/SelfHelp";
import Medication from "./pages/Medication";
import MedicationCart from "./pages/MedicationCart";
import MedicationPayment from "./pages/MedicationPayment";
import MoodTracker from "./pages/MoodTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CoreProtectedRoute from "@/components/CoreProtectedRoute";
import ChatSession from "./pages/ChatSession";
import VideoCall from "./pages/VideoCall";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes: wrap in CoreProtectedRoute */}
          <Route path="/" element={<CoreProtectedRoute><Index /></CoreProtectedRoute>} />
          <Route path="/ai-chat" element={<CoreProtectedRoute><AiChat /></CoreProtectedRoute>} />
          <Route path="/counseling" element={<CoreProtectedRoute><Counseling /></CoreProtectedRoute>} />
          <Route path="/groups" element={<CoreProtectedRoute><Groups /></CoreProtectedRoute>} />
          <Route path="/meditation" element={<CoreProtectedRoute><Meditation /></CoreProtectedRoute>} />
          <Route path="/self-help" element={<CoreProtectedRoute><SelfHelp /></CoreProtectedRoute>} />
          <Route path="/medication" element={<CoreProtectedRoute><Medication /></CoreProtectedRoute>} />
          <Route path="/medication-cart" element={<CoreProtectedRoute><MedicationCart /></CoreProtectedRoute>} />
          <Route path="/medication-payment" element={<CoreProtectedRoute><MedicationPayment /></CoreProtectedRoute>} />
          <Route path="/mood-tracker" element={<CoreProtectedRoute><MoodTracker /></CoreProtectedRoute>} />
          <Route path="/chat-session" element={<CoreProtectedRoute><ChatSession /></CoreProtectedRoute>} />
          <Route path="/video-call" element={<CoreProtectedRoute><VideoCall /></CoreProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
