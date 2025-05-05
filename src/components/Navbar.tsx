
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
            <Button className="bg-quattro-blue hover:bg-quattro-blue/90">تسجيل الدخول</Button>
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
              <Button className="bg-quattro-blue hover:bg-quattro-blue/90 w-full">تسجيل الدخول</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
