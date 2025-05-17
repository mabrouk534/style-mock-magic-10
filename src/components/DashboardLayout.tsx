
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, Users, UserCog, Building, Settings, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; academyId: string | null } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      // Create a mock user for development purposes
      const mockUser = {
        email: "user@example.com",
        role: "academy",
        academyId: "1"  // Using the first academy ID from mock data
      };
      localStorage.setItem("currentUser", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    } catch (e) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "تم تسجيل الخروج بنجاح",
    });
    navigate("/");
  };
  
  if (!currentUser) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen && <h2 className="text-xl font-semibold text-quattro-red">لوحة التحكم</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Building className="ml-3" />
              {sidebarOpen && <span>معلومات الأكاديمية</span>}
            </Link>
            
            <Link to="/dashboard/players" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Users className="ml-3" />
              {sidebarOpen && <span>تسجيل اللاعبين</span>}
            </Link>
            
            <Link to="/dashboard/staff" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <UserCog className="ml-3" />
              {sidebarOpen && <span>الجهاز الفني والإداري</span>}
            </Link>
            
            <Link to="/dashboard/matches" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-quattro-red hover:text-white">
              <Calendar className="ml-3" />
              {sidebarOpen && <span>جدول المباريات</span>}
            </Link>
            
            <Link to="/dashboard/settings" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Settings className="ml-3" />
              {sidebarOpen && <span>الإعدادات</span>}
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center"
            onClick={handleLogout}
          >
            <LogOut className="ml-2" size={18} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {title || "لوحة التحكم"}
            </h2>
            <div className="text-sm text-gray-500">
              {currentUser.email}
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
