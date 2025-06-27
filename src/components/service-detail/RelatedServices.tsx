
import React from 'react';
import { Service } from '@/types/service';
import { Link } from 'react-router-dom';

interface RelatedServicesProps {
  services: Service[];
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({ services }) => {
  console.log('RelatedServices component rendered with:', services?.length || 0, 'services');
  
  // Always render the section, even if no services to debug
  if (!services || services.length === 0) {
    console.log('No related services to display');
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Similar Services</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No similar services found at the moment.</p>
        </div>
      </div>
    );
  }

  // Limit to 4 services as requested
  const limitedServices = services.slice(0, 4);

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Similar Services</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {limitedServices.map((service, index) => (
          <Link 
            key={service.id} 
            to={`/services/${service.id}`}
            className="group block"
          >
            <div className="relative w-full h-64 [perspective:1000px]">
              {/* Card Container with 3D flip effect - maintains exact position */}
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side - Title without background pattern */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center p-6">
                  <h3 className="text-white text-xl font-bold text-center leading-tight">
                    {service.title}
                  </h3>
                </div>
                
                {/* Back Side - Features without background pattern */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-indigo-500 to-purple-700 rounded-lg p-6 flex flex-col justify-center">
                  <div>
                    {service.features && Array.isArray(service.features) && service.features.length > 0 ? (
                      <ul className="space-y-3">
                        {service.features.slice(0, 5).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-white text-sm">
                            <span className="text-yellow-300 mt-1 text-xs flex-shrink-0">●</span>
                            <span className="line-clamp-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      // Fallback to description if no features
                      <div className="text-white text-sm space-y-2">
                        <p className="line-clamp-6">
                          {service.description || 'Professional service with quality delivery and customer satisfaction.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
