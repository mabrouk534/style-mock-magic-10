
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } catch (e) {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 ml-2">
              <img 
                src="/lovable-uploads/0bba4204-75a2-4450-816b-bd2b6f469e00.png" 
                alt="Quattro Logo" 
                className="h-10 w-10 ml-2"
              />
              <span className="font-bold text-lg">بطولة كواترو للأكاديميات الخليجية لكرة القدم</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors">الرئيسية</Link>
            <Link to="/teams" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors">الفرق</Link>
            <Link to="/matches" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors">المباريات</Link>
            <Link to="/standings" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors">الترتيب</Link>
            <Link to="/rules" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors">اللوائح</Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => navigate("/dashboard")}
                >
                  <User size={18} />
                  <span>{userEmail.split('@')[0]}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                >
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-quattro-blue hover:bg-quattro-blue/90"
                onClick={() => navigate("/login")}
              >
                <LogIn className="ml-2" size={18} />
                تسجيل الدخول
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button onClick={toggleNavbar} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg">
              <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors" onClick={toggleNavbar}>الرئيسية</Link>
              <Link to="/teams" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors" onClick={toggleNavbar}>الفرق</Link>
              <Link to="/matches" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors" onClick={toggleNavbar}>المباريات</Link>
              <Link to="/standings" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors" onClick={toggleNavbar}>الترتيب</Link>
              <Link to="/rules" className="px-3 py-2 rounded hover:bg-gray-100 transition-colors" onClick={toggleNavbar}>اللوائح</Link>
              
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={() => {
                      navigate("/dashboard");
                      toggleNavbar();
                    }}
                  >
                    <User size={18} className="ml-2" />
                    لوحة التحكم
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      toggleNavbar();
                    }}
                  >
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <Button 
                  className="bg-quattro-blue hover:bg-quattro-blue/90 w-full"
                  onClick={() => {
                    navigate("/login");
                    toggleNavbar();
                  }}
                >
                  <LogIn className="ml-2" size={18} />
                  تسجيل الدخول
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
