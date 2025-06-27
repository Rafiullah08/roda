
import { useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const About = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      {/* Hero Section - Cleaner Design (Logo Removed) */}
      <section className="min-h-[80vh] relative flex flex-col items-center justify-center bg-gradient-to-br from-roda-600 to-roda-800 text-white py-16 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-roda-500/20 mix-blend-overlay animate-float"></div>
          <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-roda-400/10 mix-blend-overlay animate-spin-slow"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            >
              Empowering Business Services
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              Roda Service Hub connects businesses with verified professionals for essential services, 
              streamlining the way you find, book, and manage business services.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                className="bg-white text-roda-600 hover:bg-white/90 text-base"
                asChild
              >
                <Link to="/services">Explore Services</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base"
                asChild
              >
                <Link to="/become-partner">Become a Partner</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div onClick={scrollToFeatures} className="absolute bottom-8 cursor-pointer animate-bounce">
          <ChevronDown className="h-10 w-10 text-white" />
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-roda-600 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-roda-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              To simplify and streamline the process of finding reliable, high-quality 
              services for businesses of all sizes through a trusted platform that connects clients 
              with verified partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-roda-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-roda-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Efficiency</h3>
              <p className="text-gray-600">Streamlining service discovery and booking to save businesses valuable time and resources.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-roda-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-roda-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600">Ensuring all partners meet our high standards through a rigorous verification process.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-roda-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-roda-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Community</h3>
              <p className="text-gray-600">Building a thriving ecosystem of businesses and partners that grow together.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Platform Features Section - With All Four Feature Cards */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-roda-600 mb-4">Platform Features</h2>
            <div className="w-20 h-1 bg-roda-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the powerful tools and features that make Roda Service Hub the ultimate platform for business services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Client Dashboard Feature Card */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-roda-600 to-roda-500 text-white p-6">
                <CardTitle className="text-2xl">Client Dashboard</CardTitle>
                <CardDescription className="text-white/80">Track all your services in one place</CardDescription>
              </CardHeader>
              <div className="relative h-52 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white">
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-inner p-4">
                    <div className="h-8 bg-roda-100 rounded-md w-2/3 mb-4"></div>
                    <div className="flex gap-4 mb-4">
                      <div className="h-20 bg-roda-50 rounded-md flex-1"></div>
                      <div className="h-20 bg-roda-50 rounded-md flex-1"></div>
                      <div className="h-20 bg-roda-50 rounded-md flex-1"></div>
                    </div>
                    <div className="h-10 bg-roda-50 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Track all your service purchases, monitor spending, and manage your business needs from a single intuitive dashboard.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Spending analytics and budget tracking
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Order history and status tracking
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Personalized service recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Service Marketplace Feature Card */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-roda-500 to-roda-400 text-white p-6">
                <CardTitle className="text-2xl">Service Marketplace</CardTitle>
                <CardDescription className="text-white/80">Discover verified business services</CardDescription>
              </CardHeader>
              <div className="relative h-52 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white">
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-inner p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-roda-50 rounded-md"></div>
                      <div className="h-32 bg-roda-50 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Browse through hundreds of services with transparent pricing, detailed descriptions, and verified reviews.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Detailed service descriptions and portfolios
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Transparent pricing and service comparison
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Verified customer reviews and ratings
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Provider Portal Feature Card (Hidden first text line) */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-roda-600 to-roda-500 text-white p-6">
                <CardTitle className="text-2xl">Partner Portal</CardTitle>
                <CardDescription className="text-white/80">Manage your service business</CardDescription>
              </CardHeader>
              <div className="relative h-52 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white">
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-inner p-4">
                    <div className="h-8 bg-roda-100 rounded-md w-1/2 mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="h-5 bg-roda-50 rounded-md w-3/4 mb-2"></div>
                        <div className="h-8 bg-roda-100 rounded-md"></div>
                      </div>
                      <div>
                        <div className="h-5 bg-roda-50 rounded-md w-3/4 mb-2"></div>
                        <div className="h-8 bg-roda-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="h-24 bg-roda-50 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Order management and client communication
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Performance analytics and insights
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Portfolio and service promotion tools
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Communication System Feature Card */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-roda-500 to-roda-400 text-white p-6">
                <CardTitle className="text-2xl">Communication System</CardTitle>
                <CardDescription className="text-white/80">Seamless client-partner messaging</CardDescription>
              </CardHeader>
              <div className="relative h-52 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white">
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-inner p-4">
                    <div className="flex flex-col h-full">
                      <div className="h-8 bg-roda-100 rounded-t-md"></div>
                      <div className="flex-grow p-2 bg-gray-50">
                        <div className="h-6 bg-roda-50 rounded-full w-3/4 mb-2 ml-auto"></div>
                        <div className="h-6 bg-blue-50 rounded-full w-2/3 mb-2"></div>
                        <div className="h-6 bg-roda-50 rounded-full w-1/2 mb-2 ml-auto"></div>
                      </div>
                      <div className="h-10 bg-roda-50 rounded-b-md flex items-center p-2">
                        <div className="h-6 bg-white rounded-md flex-grow"></div>
                        <div className="h-6 w-6 bg-roda-200 rounded-md ml-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Integrated messaging system for clear, efficient communication between clients and partners.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Real-time messaging with file sharing
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Project discussion and requirement clarification
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Notification system for timely updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-14">
            <Link to="/services">
              <Button size="lg" className="bg-roda-600 hover:bg-roda-700">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Platform Benefits Section - Completely Redesigned */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Modern Background with SVG Wave */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] to-[#283593] -z-10">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillOpacity="0.1" fill="#ffffff" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,192C672,203,768,213,864,208C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fillOpacity="0.15" fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Benefits</h2>
            <div className="w-20 h-1 bg-white/40 mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Discover how Roda Service Hub creates value for both partners and clients.
            </p>
          </div>
          
          {/* Modern Cards with Floating Effects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Client Benefits Card */}
            <div className="relative group">
              {/* Background Elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-4 mb-6 flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Clients</h3>
                </div>
                
                {/* Card Content */}
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Access Vetted Professionals</h4>
                      <p className="text-gray-200">Every partner undergoes rigorous verification to ensure you receive only top-quality service.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Save Time and Resources</h4>
                      <p className="text-gray-200">Our streamlined platform saves you valuable time with quick service discovery and efficient booking processes.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Service Guarantees</h4>
                      <p className="text-gray-200">Our satisfaction guarantee ensures you always receive the quality service your business deserves.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 w-full sm:w-auto shadow-lg"
                    asChild
                  >
                    <Link to="/auth/register">Register as Client</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Partner Benefits Card */}
            <div className="relative group">
              {/* Background Elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 mb-6 flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Partners</h3>
                </div>
                
                {/* Card Content */}
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Expand Your Reach</h4>
                      <p className="text-gray-200">Connect with new clients and grow your business through our marketplace and advanced matching algorithms.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Professional Tools</h4>
                      <p className="text-gray-200">Access powerful business tools to manage orders, track performance, and streamline your service operations.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Build Your Reputation</h4>
                      <p className="text-gray-200">Showcase your expertise and collect verified reviews to build a strong online presence and client trust.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 w-full sm:w-auto shadow-lg"
                    asChild
                  >
                    <Link to="/become-partner">Become a Partner</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Business Services?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join thousands of businesses and partners who are already benefiting from the Roda Service Hub platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-roda-600 hover:bg-roda-700"
              asChild
            >
              <Link to="/services">Explore Services</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-roda-600 text-roda-600 hover:bg-roda-50"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
