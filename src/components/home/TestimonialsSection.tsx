
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    company: "Karachi Tech Solutions",
    comment: "The logo design service exceeded our expectations. Our partner understood our vision perfectly and delivered a brand identity that truly represents our company.",
    rating: 5
  },
  {
    id: 2,
    name: "Fatima Khan",
    company: "Digital Marketing Hub Karachi",
    comment: "Working with their web development partner was seamless. Our e-commerce site was completed ahead of schedule and has increased our online sales significantly.",
    rating: 5
  },
  {
    id: 3,
    name: "Muhammad Ali",
    company: "Lahore Export House",
    comment: "The SEO optimization service transformed our online presence. Our organic traffic increased by 180% within two months, bringing in new customers from across Pakistan.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Client Success Stories</h2>
          <p className="text-gray-600">What businesses across Pakistan say about our services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
