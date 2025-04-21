
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PrescriptionDialog = () => {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        setPrescriptionFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescriptionFile) {
      toast({
        title: "Missing prescription",
        description: "Please upload your prescription",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically upload the prescription and process the order
    toast({
      title: "Prescription submitted",
      description: "We will review your prescription and contact you shortly",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto mb-6">
          <Upload className="mr-2 h-4 w-4" />
          Upload Prescription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Prescription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Prescription File (PDF or Image)
            </label>
            <Input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Notes
            </label>
            <Textarea
              placeholder="Any specific instructions or notes for your order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-24"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Prescription
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;
