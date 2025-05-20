
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
import MatchSchedule from "./pages/dashboard/MatchSchedule";
import TournamentProgram from "./pages/dashboard/TournamentProgram";
import MatchResults from "./pages/dashboard/MatchResults";
import TeamRankings from "./pages/dashboard/TeamRankings";
import Settings from "./pages/dashboard/Settings";
import SuperadminDashboard from "./pages/superadmin/Dashboard";
import AcademyManager from "./pages/superadmin/AcademyManager";
import PlayerManager from "./pages/superadmin/PlayerManager";
import MatchManager from "./pages/superadmin/MatchManager";
import MatchesManagement from "./pages/superadmin/MatchesManagement";
import MatchReport from "./pages/superadmin/MatchReport";
import SuperadminTournamentProgram from "./pages/superadmin/TournamentProgram";
import SuperadminMatchResults from "./pages/superadmin/MatchResults";
import SuperadminTeamRankings from "./pages/superadmin/TeamRankings";
import NotFound from "./pages/NotFound";
import RegisterAcademy from "./pages/RegisterAcademy";

const queryClient = new QueryClient();

// Auth protected route component
const ProtectedRoute = ({ children, requiredRole = null }: { children: React.ReactNode, requiredRole?: string | null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean>(true);
  
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      setIsAuthenticated(false);
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setIsAuthenticated(true);
      
      // Check for role requirement if specified
      if (requiredRole && user.role !== requiredRole) {
        setHasRequiredRole(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, [requiredRole]);
  
  if (isAuthenticated === null) {
    return <div>جاري التحميل...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register-academy" element={<RegisterAcademy />} />
            <Route path="/home" element={<Index />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/schedule" element={<Schedule />} />
            
            {/* Academy Dashboard routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/academy" element={<ProtectedRoute><AcademyInfo /></ProtectedRoute>} />
            <Route path="/dashboard/players" element={<ProtectedRoute><PlayerRegistration /></ProtectedRoute>} />
            <Route path="/dashboard/staff" element={<ProtectedRoute><StaffRegistration /></ProtectedRoute>} />
            <Route path="/dashboard/matches" element={<ProtectedRoute><MatchSchedule /></ProtectedRoute>} />
            <Route path="/dashboard/tournament-program" element={<ProtectedRoute><TournamentProgram /></ProtectedRoute>} />
            <Route path="/dashboard/match-results" element={<ProtectedRoute><MatchResults /></ProtectedRoute>} />
            <Route path="/dashboard/team-rankings" element={<ProtectedRoute><TeamRankings /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Superadmin routes */}
            <Route path="/superadmin" element={<ProtectedRoute requiredRole="admin"><SuperadminDashboard /></ProtectedRoute>} />
            <Route path="/superadmin/academies" element={<ProtectedRoute requiredRole="admin"><AcademyManager /></ProtectedRoute>} />
            <Route path="/superadmin/players" element={<ProtectedRoute requiredRole="admin"><PlayerManager /></ProtectedRoute>} />
            <Route path="/superadmin/matches" element={<ProtectedRoute requiredRole="admin"><MatchManager /></ProtectedRoute>} />
            <Route path="/superadmin/matches-management" element={<ProtectedRoute requiredRole="admin"><MatchesManagement /></ProtectedRoute>} />
            <Route path="/superadmin/match-report/:matchId" element={<ProtectedRoute requiredRole="admin"><MatchReport /></ProtectedRoute>} />
            <Route path="/superadmin/tournament-program" element={<ProtectedRoute requiredRole="admin"><SuperadminTournamentProgram /></ProtectedRoute>} />
            <Route path="/superadmin/match-results" element={<ProtectedRoute requiredRole="admin"><SuperadminMatchResults /></ProtectedRoute>} />
            <Route path="/superadmin/team-rankings" element={<ProtectedRoute requiredRole="admin"><SuperadminTeamRankings /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
