
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The AI chat support helped me through a difficult time when I needed someone to talk to at 2 AM. It felt like speaking with a compassionate friend.",
      name: "Sarah K.",
      title: "AI Chat User",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Booking counseling sessions online made therapy accessible for me as someone with a busy schedule. My counselor has been incredibly helpful.",
      name: "Michael T.",
      title: "Counseling Client",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "The guided meditation sessions have transformed my sleep quality and helped me manage my daily anxiety in ways I never thought possible.",
      name: "Jessica M.",
      title: "Meditation User",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "The mood tracker has helped me identify patterns in my emotional well-being, and the AI suggestions have been surprisingly insightful.",
      name: "David R.",
      title: "Mood Tracker User",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-wellness-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-wellness-primary font-medium mb-2">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from people who found support through SereneMinds
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-none shadow-sm">
              <CardContent className="p-6 flex flex-col">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#9b87f5"
                      className="inline-block mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-wellness-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
