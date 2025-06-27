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
  Factory,
  ShoppingBag,
  Heart,
  HardHat,
  Users,
  GraduationCap,
  Monitor,
  Megaphone,
  Truck,
  TrendingUp,
  FileCheck,
  Zap,
  UserCheck,
  FileText,
  BarChart3,
  Lightbulb,
  Target,
  DollarSign,
  Globe,
  Calculator,
  PieChart,
  UserPlus,
  ClipboardCheck,
  Gauge,
  ShieldCheck,
  Star,
  ChevronDown,
} from 'lucide-react';

interface InsightsMegaMenuProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const InsightsMegaMenu = ({ isMobile = false, onLinkClick }: InsightsMegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
    setIsOpen(false);
  };

  const industries = [
    { name: 'Manufacturing', icon: Factory, href: '/insights/manufacturing' },
    { name: 'Retail', icon: ShoppingBag, href: '/insights/retail' },
    { name: 'Construction', icon: HardHat, href: '/insights/construction' },
    { name: 'Consulting', icon: Users, href: '/insights/consulting' },
    { name: 'Education', icon: GraduationCap, href: '/insights/education' },
    { name: 'Technology', icon: Monitor, href: '/insights/technology' },
    { name: 'Marketing & Advertising', icon: Megaphone, href: '/insights/marketing' },
    { name: 'Logistics & Supply Chain', icon: Truck, href: '/insights/logistics' },
  ];

  const articleCategories = [
    { name: 'Business Optimization', icon: TrendingUp, href: '/blog?category=business-optimization' },
    { name: 'Compliance & Regulations', icon: FileCheck, href: '/blog?category=compliance' },
    { name: 'Digital Transformation', icon: Zap, href: '/blog?category=digital-transformation' },
    { name: 'Talent & Workforce', icon: UserCheck, href: '/blog?category=talent' },
    { name: 'SOPs & Documentation', icon: FileText, href: '/blog?category=sops' },
    { name: 'Performance Metrics', icon: BarChart3, href: '/blog?category=metrics' },
    { name: 'Innovation & Product Development', icon: Lightbulb, href: '/blog?category=innovation' },
    { name: 'Marketing & Branding', icon: Target, href: '/blog?category=marketing' },
  ];

  const tools = [
    { name: 'Sales Performance Calculator', icon: Calculator, href: '/tools/sales-performance' },
    { name: 'Customer Retention Calculator', icon: Star, href: '/tools/customer-retention' },
    { name: 'Lead Conversion Calculator', icon: Target, href: '/tools/lead-conversion' },
    { name: 'Skill Gap Analysis', icon: UserCheck, href: '/tools/skill-gap' },
    { name: 'Project Completion Tracker', icon: ClipboardCheck, href: '/tools/project-tracker' },
    { name: 'Operational Efficiency Score', icon: Gauge, href: '/tools/efficiency-score' },
    { name: 'Compliance Gap Checker', icon: ShieldCheck, href: '/tools/compliance-gap' },
    { name: 'Customer Satisfaction Calculator', icon: Star, href: '/tools/satisfaction-calculator' },
  ];

  // Mobile version using Collapsible
  if (isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-gray-50 rounded-md">
          <span>Insights</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-6 p-4 bg-gray-50 rounded-md">
              {/* Industries */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Industries</h3>
                <div className="space-y-2">
                  {industries.map((industry) => (
                    <Link
                      key={industry.name}
                      to={industry.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-white transition-colors"
                    >
                      <industry.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{industry.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Article Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Article Categories</h3>
                <div className="space-y-2">
                  {articleCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-white transition-colors"
                    >
                      <category.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">KPI & Gap Analysis Tools</h3>
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      to={tool.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-white transition-colors"
                    >
                      <tool.icon className="h-4 w-4 text-roda-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tool.name}</span>
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
            Insights
          </NavigationMenuTrigger>
          <NavigationMenuContent className="left-0 w-[900px] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-[900px]">
            <div className="w-full p-6 bg-white shadow-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: Industries */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    Industries
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Industry-specific insights</p>
                  <ul className="space-y-3">
                    {industries.map((industry) => (
                      <li key={industry.name}>
                        <Link
                          to={industry.href}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                        >
                          <industry.icon className="h-4 w-4 text-roda-500 group-hover:text-roda-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                            {industry.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Article Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    Article Categories
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Expert content & guides</p>
                  <ul className="space-y-3">
                    {articleCategories.map((category) => (
                      <li key={category.name}>
                        <Link
                          to={category.href}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                        >
                          <category.icon className="h-4 w-4 text-roda-500 group-hover:text-roda-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: KPI & Gap Analysis Tools */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    KPI & Gap Analysis Tools
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Free business calculators</p>
                  <ul className="space-y-3">
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <Link
                          to={tool.href}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                        >
                          <tool.icon className="h-4 w-4 text-roda-500 group-hover:text-roda-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                            {tool.name}
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

export default InsightsMegaMenu;
