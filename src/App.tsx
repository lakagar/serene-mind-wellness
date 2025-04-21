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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/self-help" element={<SelfHelp />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/medication-cart" element={<MedicationCart />} />
          <Route path="/medication-payment" element={<MedicationPayment />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
