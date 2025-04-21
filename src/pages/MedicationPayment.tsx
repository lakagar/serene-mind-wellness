
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const MedicationPayment = () => {
  const location = useLocation();
  const total: number = location.state?.total ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-wellness-dark">Payment Gateway</h1>
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto flex flex-col gap-6">
          <div className="text-lg">
            <span>Your Total: </span>
            <span className="font-bold text-wellness-primary">${total}</span>
          </div>
          <Button disabled className="w-full">Pay Now (Coming Soon)</Button>
          <div className="text-sm text-gray-500">
            Payment integration will be provided in the next step.
          </div>
          <Button asChild variant="outline">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicationPayment;
