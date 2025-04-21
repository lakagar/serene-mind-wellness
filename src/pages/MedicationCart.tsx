
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const allMeds = [
  { id: 1, name: "Sertraline 50mg", desc: "A commonly used SSRI antidepressant to treat depression and anxiety.", price: 12, category: "Antidepressant" },
  { id: 2, name: "Alprazolam 0.5mg", desc: "A fast-acting benzodiazepine for managing anxiety and acute distress.", price: 10, category: "Anxiolytic" },
  { id: 3, name: "Propranolol 20mg", desc: "A beta-blocker for controlling physical anxiety symptoms, like rapid heartbeat.", price: 8, category: "Beta Blocker" },
  { id: 4, name: "Escitalopram 10mg", desc: "SSRI for depression and generalized anxiety disorder.", price: 14, category: "Antidepressant" },
  { id: 5, name: "Buspirone 5mg", desc: "Non-benzodiazepine anxiolytic for chronic anxiety.", price: 9, category: "Anxiolytic" },
];

const MedicationCart = () => {
  const location = useLocation();
  const cart: number[] = location.state?.cart || [];
  const navigate = useNavigate();

  const medsInCart = allMeds.filter((med) => cart.includes(med.id));
  const total = medsInCart.reduce((sum, med) => sum + med.price, 0);

  const handleCheckout = () => {
    navigate("/medication-payment", { state: { total } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-wellness-dark">Your Medication Cart</h1>
        {medsInCart.length === 0 ? (
          <div>
            <p>No medication in your cart.</p>
            <Button asChild className="mt-4">
              <Link to="/medication">Shop Medications</Link>
            </Button>
          </div>
        ) : (
          <div>
            <ul className="mb-6">
              {medsInCart.map((med) => (
                <li key={med.id} className="mb-4 p-4 bg-white rounded-lg shadow flex gap-4 flex-col sm:flex-row items-start sm:items-center border border-gray-100">
                  <div className="flex-1">
                    <div className="font-semibold text-md">{med.name}</div>
                    <div className="text-gray-600 text-xs mb-1">{med.desc}</div>
                    <span className="text-xs bg-wellness-primary/10 px-2 py-1 rounded font-medium text-wellness-primary mr-2">{med.category}</span>
                  </div>
                  <div className="font-bold text-wellness-primary">${med.price}</div>
                </li>
              ))}
            </ul>
            <div className="mb-4 font-semibold">Total: ${total}</div>
            <Button onClick={handleCheckout} className="mr-3">Proceed to Payment</Button>
            <Button asChild variant="outline">
              <Link to="/medication">Back to Medications</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MedicationCart;
