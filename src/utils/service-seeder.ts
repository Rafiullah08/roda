
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { faker } from '@faker-js/faker';

/**
 * Seed the database with fake services
 * @param count Number of services to create
 */
export async function seedServices(count: number = 10) {
  console.log(`Seeding ${count} services...`);
  
  const services: Array<Omit<Service, "id" | "created_at" | "updated_at">> = [];
  
  // Generate services
  for (let i = 0; i < count; i++) {
    const service = generateFakeService();
    services.push(service);
  }
  
  // Insert services into the database
  const { data, error } = await supabase
    .from('services')
    .insert(services)
    .select();
  
  if (error) {
    console.error('Error seeding services:', error);
    throw error;
  }
  
  console.log(`Successfully seeded ${data.length} services`);
  return data;
}

/**
 * Generate a fake service
 */
function generateFakeService(): Omit<Service, "id" | "created_at" | "updated_at"> {
  const categories = [
    "Design",
    "Development",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Business",
    "Data",
    "Consulting"
  ];
  
  const subcategories: Record<string, string[]> = {
    "Design": [
      "Logo Design",
      "Brand Style Guides",
      "Website Design",
      "App Design",
      "UX Design",
      "Landing Page Design",
      "Icon Design"
    ],
    "Development": [
      "Web Development",
      "Mobile App Development",
      "E-commerce Development",
      "WordPress Development",
      "Game Development",
      "Desktop Applications"
    ],
    "Digital Marketing": [
      "Social Media Marketing",
      "SEO",
      "Content Marketing",
      "Video Marketing",
      "Email Marketing",
      "SEM"
    ],
    "Writing & Translation": [
      "Articles & Blog Posts",
      "Translation",
      "Proofreading & Editing",
      "Resume Writing",
      "Technical Writing",
      "Creative Writing"
    ],
    "Video & Animation": [
      "Video Editing",
      "Short Video Ads",
      "Animation",
      "Logo Animation",
      "3D Product Animation",
      "Character Animation"
    ],
    "Music & Audio": [
      "Voice Over",
      "Mixing & Mastering",
      "Producers & Composers",
      "Sound Design",
      "Podcast Editing",
      "Audio Ads"
    ],
    "Business": [
      "Business Plans",
      "Market Research",
      "Business Consulting",
      "Legal Consulting",
      "Financial Consulting",
      "Project Management"
    ],
    "Data": [
      "Data Analysis",
      "Data Visualization",
      "Databases",
      "Data Mining & Scraping",
      "Data Entry",
      "Data Processing"
    ],
    "Consulting": [
      "Business Consulting",
      "Career Consulting",
      "E-commerce Consulting",
      "SEO Consulting",
      "Marketing Consulting"
    ]
  };
  
  // Select random category
  const category = faker.helpers.arrayElement(categories);
  
  // Select random subcategory from the selected category
  const subcategory = faker.helpers.arrayElement(subcategories[category] || []);
  
  // Generate 2-5 features
  const featureCount = faker.number.int({ min: 2, max: 5 });
  const features = Array.from({ length: featureCount }, () => 
    faker.lorem.sentence({ min: 3, max: 8 })
  );
  
  // Generate 0-3 FAQs
  const faqCount = faker.number.int({ min: 0, max: 3 });
  const faqs = Array.from({ length: faqCount }, () => ({
    question: faker.lorem.sentence({ min: 5, max: 10 }) + "?",
    answer: faker.lorem.paragraph({ min: 2, max: 5 })
  }));
  
  // Service type options
  const serviceTypes: Array<"Project" | "Task"> = ["Project", "Task"];
  
  // Generate a service
  return {
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    description: faker.lorem.paragraphs({ min: 2, max: 5 }),
    price: parseFloat(faker.commerce.price({ min: 50, max: 5000 })),
    features,
    status: "active",
    delivery_time: faker.helpers.arrayElement(["1 day", "3 days", "1 week", "2 weeks", "1 month"]),
    category,
    subcategory,
    service_type: faker.helpers.arrayElement(serviceTypes),
    rating: 0,
    reviews_count: 0,
    faqs,
    featured: faker.datatype.boolean(),
    service_location: faker.helpers.arrayElement(["online", "onsite", "hybrid"]),
    is_free: false,
    image_url: null,
    created_by: null  // Added this to fix the type error
  };
}
