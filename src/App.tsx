
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";
import Rules from "./pages/Rules";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AcademyInfo from "./pages/dashboard/AcademyInfo";
import PlayerRegistration from "./pages/dashboard/PlayerRegistration";
import StaffRegistration from "./pages/dashboard/StaffRegistration";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Auth protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    setIsAuthenticated(!!userStr);
  }, []);
  
  if (isAuthenticated === null) {
    return <div>جاري التحميل...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/academy" element={<ProtectedRoute><AcademyInfo /></ProtectedRoute>} />
            <Route path="/dashboard/players" element={<ProtectedRoute><PlayerRegistration /></ProtectedRoute>} />
            <Route path="/dashboard/staff" element={<ProtectedRoute><StaffRegistration /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
