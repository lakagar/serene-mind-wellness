
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const allMeds = [
  { id: 1, name: "Sertraline 50mg", price: 12 },
  { id: 2, name: "Alprazolam 0.5mg", price: 10 },
  { id: 3, name: "Propranolol 20mg", price: 8 },
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
                <li key={med.id} className="mb-2">
                  <span>{med.name} - </span>
                  <span className="text-wellness-primary font-bold">${med.price}</span>
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
