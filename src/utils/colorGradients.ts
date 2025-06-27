
/**
 * Utility function to generate a gradient based on category or subcategory
 */
export const getGradient = (category: string | null, subcategory: string | null): string => {
  // Use subcategory for more specific gradients if available
  const key = subcategory || category || "default";
  
  // Map of gradients by category/subcategory
  const gradientMap: {[key: string]: string} = {
    "Website Design": "from-blue-600 to-blue-800",
    "Logo Design": "from-blue-500 to-indigo-700",
    "Branding": "from-indigo-500 to-purple-700",
    "Design": "from-blue-400 to-blue-700",
    "Development": "from-blue-600 to-indigo-800",
    "Marketing": "from-indigo-500 to-blue-700",
    "Digital Marketing": "from-blue-700 to-indigo-900",
    "Content Writing": "from-blue-400 to-blue-600",
    "default": "from-blue-500 to-blue-700"
  };

  return gradientMap[key] || gradientMap.default;
};

/**
 * Returns abstract background patterns for the service detail color section
 * These are only used on the service detail page
 */
export const getAbstractBackground = (subcategory: string | null, category: string | null): string => {
  // Use subcategory for more specific abstract backgrounds if available
  const key = subcategory || category || "default";
  
  // Map abstract background patterns by subcategory/category
  const abstractMap: {[key: string]: string} = {
    // Design subcategories
    "Website Design": "before:absolute before:top-10 before:left-10 before:w-32 before:h-32 before:rounded-full before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-10 after:right-10 after:w-24 after:h-24 after:rounded-full after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Logo Design": "before:absolute before:top-8 before:left-8 before:w-40 before:h-16 before:rounded-3xl before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-8 after:right-12 after:w-20 after:h-20 after:rounded-full after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Branding": "before:absolute before:top-4 before:left-20 before:w-28 before:h-28 before:rounded-full before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-6 after:right-24 after:w-36 after:h-12 after:rounded-3xl after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    
    // Development subcategories
    "Web Development": "before:absolute before:top-8 before:left-12 before:w-32 before:h-16 before:rotate-45 before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-12 after:right-8 after:w-24 after:h-24 after:rotate-12 after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Mobile Development": "before:absolute before:top-10 before:left-16 before:w-24 before:h-24 before:rounded-3xl before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-8 after:right-12 after:w-32 after:h-16 after:rounded-3xl after:bg-white/10 after:transition-all before:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    
    // Marketing subcategories
    "Digital Marketing": "before:absolute before:top-6 before:left-20 before:w-48 before:h-12 before:rounded-full before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-16 after:right-8 after:w-20 after:h-20 after:rounded-full after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Content Writing": "before:absolute before:top-12 before:left-8 before:w-40 before:h-8 before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-10 after:right-16 after:w-32 after:h-12 after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    
    // Default categories
    "Design": "before:absolute before:top-4 before:left-12 before:w-40 before:h-16 before:rounded-full before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-16 after:right-20 after:w-24 after:h-24 after:rounded-full after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Development": "before:absolute before:top-8 before:left-16 before:w-28 before:h-28 before:rotate-45 before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-8 after:right-20 after:w-32 after:h-12 after:rotate-12 after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    "Marketing": "before:absolute before:top-12 before:left-8 before:w-36 before:h-16 before:rounded-3xl before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-6 after:right-12 after:w-20 after:h-20 after:rounded-3xl after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15",
    
    // Default
    "default": "before:absolute before:top-8 before:left-12 before:w-36 before:h-20 before:rounded-full before:bg-white/10 before:transition-all before:duration-500 hover:before:scale-110 hover:before:bg-white/15 after:absolute after:bottom-12 after:right-16 after:w-28 after:h-16 before:rounded-full after:bg-white/10 after:transition-all after:duration-500 hover:after:scale-110 hover:after:bg-white/15"
  };
  
  return abstractMap[key] || abstractMap.default;
};

// Function kept for backward compatibility with ServiceCard component
export const getBackgroundElement = getAbstractBackground;
