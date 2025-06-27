
import { Search, Users, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600">Connect with skilled professionals for your business needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-roda-100 text-roda-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Find Your Service</h3>
            <p className="text-gray-600">
              Browse our marketplace of professional services or search for specific skills you need for your project.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-roda-100 text-roda-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Connect with Partners</h3>
            <p className="text-gray-600">
              Get matched with verified professionals who have proven their expertise through real project work.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-roda-100 text-roda-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Get Results Delivered</h3>
            <p className="text-gray-600">
              Work directly with skilled partners who deliver quality results on time, with transparent communication throughout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
