
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const medications = [
  { id: 1, name: "Sertraline 50mg", desc: "Commonly used antidepressant.", price: 12 },
  { id: 2, name: "Alprazolam 0.5mg", desc: "For anxiety management.", price: 10 },
  { id: 3, name: "Propranolol 20mg", desc: "Helps with physical anxiety symptoms.", price: 8 },
];

const Medication = () => {
  const [cart, setCart] = useState<number[]>([]);
  const navigate = useNavigate();

  const addToCart = (id: number) => setCart((prev) => prev.includes(id) ? prev : [...prev, id]);

  const viewCart = () => navigate("/medication-cart", { state: { cart } });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Medication Delivery</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {medications.map((med) => (
            <div key={med.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col">
              <h2 className="text-lg font-semibold">{med.name}</h2>
              <p className="text-gray-600 mb-2">{med.desc}</p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-wellness-primary font-bold mr-4">${med.price}</span>
                <Button onClick={() => addToCart(med.id)} disabled={cart.includes(med.id)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button onClick={viewCart} disabled={cart.length === 0}>
            View Cart ({cart.length})
          </Button>
          <Button asChild variant="outline" className="ml-4">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Medication;
