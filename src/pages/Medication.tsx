import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PrescriptionDialog from "@/components/medication/PrescriptionDialog";
import { IndianRupee } from "lucide-react";

const medications = [
  { id: 1, name: "Sertraline 50mg", desc: "A commonly used SSRI antidepressant to treat depression and anxiety.", price: 900, category: "Antidepressant" },
  { id: 2, name: "Alprazolam 0.5mg", desc: "A fast-acting benzodiazepine for managing anxiety and acute distress.", price: 750, category: "Anxiolytic" },
  { id: 3, name: "Propranolol 20mg", desc: "A beta-blocker for controlling physical anxiety symptoms, like rapid heartbeat.", price: 600, category: "Beta Blocker" },
  { id: 4, name: "Escitalopram 10mg", desc: "SSRI for depression and generalized anxiety disorder.", price: 1050, category: "Antidepressant" },
  { id: 5, name: "Buspirone 5mg", desc: "Non-benzodiazepine anxiolytic for chronic anxiety.", price: 680, category: "Anxiolytic" },
];

const categories = ["All", ...Array.from(new Set(medications.map(m => m.category)))];

const Medication = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const addToCart = (id: number) => setCart((prev) => prev.includes(id) ? prev : [...prev, id]);

  const viewCart = () => navigate("/medication-cart", { state: { cart } });

  const filteredMeds =
    selectedCategory === "All"
      ? medications
      : medications.filter((med) => med.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Medication Delivery</h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <label htmlFor="category" className="text-md font-medium">
              Filter by Category:
            </label>
            <select
              id="category"
              className="border rounded px-3 py-2 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <PrescriptionDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMeds.map((med) => (
            <div key={med.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col border border-gray-100">
              <h2 className="text-lg font-semibold">{med.name}</h2>
              <p className="text-gray-600 mb-2">{med.desc}</p>
              <div className="text-xs bg-wellness-primary/10 px-2 py-1 rounded self-start mb-2 font-medium text-wellness-primary">{med.category}</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-wellness-primary font-bold mr-4 flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {med.price}
                </span>
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
