
import { useLocation } from "react-router-dom";

interface PageTitleProps {
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
}

export const PageTitle = ({ navigation }: PageTitleProps) => {
  const location = useLocation();
  
  return (
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 line-clamp-1">
      {navigation.find((item) => item.href === location.pathname)?.name || "Dashboard"}
    </h1>
  );
};
