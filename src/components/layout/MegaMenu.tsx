import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Settings,
  CheckCircle,
  FileText,
  Users,
  Code,
  BarChart3,
  Building2,
  User,
  Megaphone,
  Globe,
  Palette,
  PenTool,
  Search,
  Briefcase,
  UserPlus,
  Monitor,
  ChevronDown,
} from 'lucide-react';

interface MegaMenuProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const MegaMenu = ({ isMobile = false, onLinkClick }: MegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
    setIsOpen(false);
  };

  const serviceTypes = [
    { name: 'Consulting & Advisory', icon: Settings, href: '/consulting-advisory' },
    { name: 'Quality Control', icon: CheckCircle, href: '/quality-control' },
    { name: 'Compliance & Documentation', icon: FileText, href: '/compliance-documentation' },
    { name: 'Talent Integration', icon: Users, href: '/talent-integration' },
    { name: 'Product Development', icon: Code, href: '/product-development' },
    { name: 'Digital Project Management', icon: BarChart3, href: '/digital-project-management' },
  ];

  const useCases = [
    { 
      category: 'For Businesses',
      icon: Building2,
      items: [
        { name: 'Operations Support', href: '/business-services' },
        { name: 'Quality & Regulatory Setup', href: '/business-services' },
        { name: 'Talent & Resource Management', href: '/business-services' },
      ]
    },
    {
      category: 'For Individuals', 
      icon: User,
      items: [
        { name: 'Freelance Opportunities', href: '/individual-services' },
        { name: 'Skill Development & Training', href: '/individual-services' },
        { name: 'Remote Project Matching', href: '/individual-services' },
      ]
    }
  ];

  const departments = [
    { name: 'Marketing & Advertising', icon: Megaphone, href: '/services?department=marketing' },
    { name: 'Web Development', icon: Globe, href: '/services?department=web-dev' },
    { name: 'Graphic Design', icon: Palette, href: '/services?department=design' },
    { name: 'Content & Copywriting', icon: PenTool, href: '/services?department=content' },
    { name: 'Digital Marketing & SEO', icon: Search, href: '/services?department=seo' },
    { name: 'Business Consulting', icon: Briefcase, href: '/services?department=business' },
    { name: 'HR & Recruitment', icon: UserPlus, href: '/services?department=hr' },
    { name: 'IT & Technical Support', icon: Monitor, href: '/services?department=it' },
  ];

  // Mobile version using Collapsible
  if (isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-gray-50 rounded-md">
          <span>Solutions</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-6 p-4 bg-gray-50 rounded-md">
              {/* Service Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">By Service Type</h3>
                <div className="space-y-2">
                  {serviceTypes.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-white transition-colors"
                    >
                      <service.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">By Use Case</h3>
                <div className="space-y-4">
                  {useCases.map((useCase) => (
                    <div key={useCase.category}>
                      <div className="flex items-center space-x-2 mb-2">
                        <useCase.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                        <h4 className="font-medium text-gray-800">{useCase.category}</h4>
                      </div>
                      <div className="space-y-1 ml-6">
                        {useCase.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={handleLinkClick}
                            className="block text-sm text-gray-600 hover:text-roda-500 transition-colors p-1 rounded hover:bg-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Departments</h3>
                <div className="space-y-2">
                  {departments.map((department) => (
                    <Link
                      key={department.name}
                      to={department.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-white transition-colors"
                    >
                      <department.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{department.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Desktop version using NavigationMenu
  return (
    <NavigationMenu className="relative">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium hover:text-roda-500 transition-colors">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent className="left-0 w-[900px] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-[900px]">
            <div className="w-full p-6 bg-white shadow-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: By Service Type */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    By Service Type
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">How you're helping</p>
                  <ul className="space-y-3">
                    {serviceTypes.map((service) => (
                      <li key={service.name}>
                        <Link
                          to={service.href}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                        >
                          <service.icon className="h-4 w-4 text-roda-500 group-hover:text-roda-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                            {service.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: By Use Case */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    By Use Case
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Individuals vs businesses</p>
                  <div className="space-y-6">
                    {useCases.map((useCase) => (
                      <div key={useCase.category}>
                        <div className="flex items-center space-x-2 mb-3">
                          <useCase.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                          <h4 className="font-medium text-gray-800 whitespace-nowrap">{useCase.category}</h4>
                        </div>
                        <ul className="space-y-2 ml-6">
                          {useCase.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="text-sm text-gray-600 hover:text-roda-500 transition-colors block p-1 rounded hover:bg-gray-50 whitespace-nowrap"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Departments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    Departments
                  </h3>
                  <ul className="space-y-3">
                    {departments.map((department) => (
                      <li key={department.name}>
                        <Link
                          to={department.href}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                        >
                          <department.icon className="h-4 w-4 text-roda-500 group-hover:text-roda-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                            {department.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
