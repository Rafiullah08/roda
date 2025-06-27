
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { UserDropdown } from "@/components/dashboard/header/UserDropdown";
import MegaMenu from "./MegaMenu";
import InsightsMegaMenu from "./InsightsMegaMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png"
              alt="RODA Logo"
              className="h-8 w-auto"
              style={{ maxWidth: 120 }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <MegaMenu />
            <InsightsMegaMenu />
          </nav>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Search services..."
              className="pl-9 h-9 w-60 bg-gray-50"
            />
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
          </div>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn size={18} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-roda-500 hover:bg-roda-600">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="relative">
              <Input
                placeholder="Search services..."
                className="pl-9 h-9 w-full bg-gray-50"
              />
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
            </div>
            
            {/* Mobile Navigation with both MegaMenus */}
            <div className="space-y-2">
              <MegaMenu isMobile={true} onLinkClick={handleMobileMenuClose} />
              <InsightsMegaMenu isMobile={true} onLinkClick={handleMobileMenuClose} />
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              {isAuthenticated ? (
                <div className="flex justify-center">
                  <UserDropdown />
                </div>
              ) : (
                <>
                  <Link to="/auth/login" onClick={handleMobileMenuClose}>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <LogIn size={18} />
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/auth/register" onClick={handleMobileMenuClose}>
                    <Button className="w-full bg-roda-500 hover:bg-roda-600">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
