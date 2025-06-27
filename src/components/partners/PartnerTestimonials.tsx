
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Zainab Malik",
    title: "Graphic Designer",
    comment: "Joining as a partner was the best career decision I made. I'm now working with prestigious clients across Karachi and building my professional reputation.",
    rating: 5
  },
  {
    id: 2,
    name: "Usman Sheikh",
    title: "Web Developer", 
    comment: "This platform made it easy to showcase my coding skills. Within weeks I had consistent projects from businesses in Lahore and Islamabad.",
    rating: 5
  },
  {
    id: 3,
    name: "Ayesha Rahman",
    title: "Digital Marketing Specialist",
    comment: "I appreciate how this platform values quality work over credentials. It's refreshing to be judged on my results and client satisfaction.",
    rating: 5
  }
];

const PartnerTestimonials = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Partner Success Stories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardContent className="p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnerTestimonials;
