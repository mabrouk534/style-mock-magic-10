
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, Users, Building, LayoutDashboard, Trophy, Calendar, List, Table, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SuperadminLayoutProps {
  children: ReactNode;
  title?: string;
}

const SuperadminLayout = ({ children, title }: SuperadminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      navigate("/");
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    } catch (e) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  }, [navigate, toast]);
  
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
          {sidebarOpen && <h2 className="text-xl font-semibold text-quattro-red">لوحة المشرف</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            <Link to="/superadmin" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <LayoutDashboard className="ml-3" />
              {sidebarOpen && <span>الرئيسية</span>}
            </Link>
            
            <Link to="/superadmin/academies" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Building className="ml-3" />
              {sidebarOpen && <span>إدارة الأكاديميات</span>}
            </Link>
            
            <Link to="/superadmin/players" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Users className="ml-3" />
              {sidebarOpen && <span>إدارة اللاعبين</span>}
            </Link>
            
            <Link to="/superadmin/matches" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Trophy className="ml-3" />
              {sidebarOpen && <span>إدارة المباريات</span>}
            </Link>
            
            <Link to="/superadmin/matches-management" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Calendar className="ml-3" />
              {sidebarOpen && <span>إدارة جدول المباريات</span>}
            </Link>

            <Link to="/superadmin/tournament-program" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <List className="ml-3" />
              {sidebarOpen && <span>برنامج المعسكر</span>}
            </Link>

            <Link to="/superadmin/match-results" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Trophy className="ml-3" />
              {sidebarOpen && <span>نتائج المباريات</span>}
            </Link>

            <Link to="/superadmin/team-rankings" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <Table className="ml-3" />
              {sidebarOpen && <span>ترتيب الفرق</span>}
            </Link>

            <Link to="/superadmin/regulations" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100">
              <FileText className="ml-3" />
              {sidebarOpen && <span>اللوائح التنظيمية</span>}
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
              {title || "لوحة تحكم المشرف الرئيسي"}
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

export default SuperadminLayout;
