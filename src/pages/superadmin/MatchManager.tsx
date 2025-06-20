
import { useState, useEffect } from "react";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Match } from "@/types/tournament";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academies } from "@/data";
import { useNavigate } from "react-router-dom";
import { matchService } from "@/services/matchService";

const MatchManager = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    date: string;
    time: string;
    venue: string;
    category: string;
    status: "scheduled" | "inProgress" | "completed";
  }>({
    homeTeam: "",
    awayTeam: "",
    homeScore: null,
    awayScore: null,
    date: "",
    time: "",
    venue: "",
    category: "",
    status: "scheduled"
  });
  
  useEffect(() => {
    loadMatches();
  }, []);
  
  const loadMatches = async () => {
    try {
      setLoading(true);
      const matchesData = await matchService.getAllMatches();
      setMatches(matchesData);
    } catch (error) {
      console.error('Error loading matches:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المباريات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const score = value === "" ? null : parseInt(value);
    setFormData(prev => ({ ...prev, [name]: score }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "status") {
      setFormData(prev => ({ ...prev, [name]: value as "scheduled" | "inProgress" | "completed" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      homeTeam: "",
      awayTeam: "",
      homeScore: null,
      awayScore: null,
      date: "",
      time: "",
      venue: "",
      category: "",
      status: "scheduled"
    });
    setIsEditMode(false);
    setCurrentMatch(null);
  };
  
  const handleEditMatch = (match: Match) => {
    setIsEditMode(true);
    setCurrentMatch(match);
    setFormData({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      date: match.date,
      time: match.time,
      venue: match.venue,
      category: match.category,
      status: match.status
    });
    setDialogOpen(true);
  };

  const handleViewMatchReport = (matchId: string) => {
    navigate(`/superadmin/match-report/${matchId}`);
  };
  
  const handleDeleteMatch = async (id: string) => {
    try {
      await matchService.deleteMatch(id);
      setMatches(prev => prev.filter(match => match.id !== id));
      toast({
        title: "تم حذف المباراة",
        description: "تم حذف المباراة بنجاح"
      });
    } catch (error) {
      console.error('Error deleting match:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المباراة",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.homeTeam === formData.awayTeam) {
      toast({
        title: "خطأ",
        description: "لا يمكن أن يكون الفريق المستضيف والفريق الضيف نفس الفريق",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      if (isEditMode && currentMatch) {
        // Update existing match
        await matchService.updateMatch(currentMatch.id, formData);
        setMatches(prev => prev.map(match => 
          match.id === currentMatch.id ? { ...match, ...formData } : match
        ));
        toast({
          title: "تم تحديث المباراة",
          description: "تم تحديث معلومات المباراة بنجاح"
        });
      } else {
        // Create new match
        const newMatchId = await matchService.addMatch(formData);
        const newMatch: Match = {
          id: newMatchId,
          ...formData
        };
        setMatches(prev => [...prev, newMatch]);
        toast({
          title: "تمت إضافة المباراة",
          description: "تمت إضافة المباراة بنجاح"
        });
      }
      
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving match:', error);
      toast({
        title: "خطأ",
        description: isEditMode ? "فشل في تحديث المباراة" : "فشل في إضافة المباراة",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesCategory = categoryFilter === "all" || match.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || match.status === statusFilter;
    const matchesDate = dateFilter ? match.date === dateFilter : true;
    return matchesCategory && matchesStatus && matchesDate;
  });

  const getTeamName = (teamId: string) => {
    const academy = academies.find(a => a.id === teamId);
    return academy ? academy.name : teamId;
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "scheduled":
        return "قادمة";
      case "inProgress":
        return "جارية";
      case "completed":
        return "منتهية";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <SuperadminLayout title="إدارة المباريات">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">جاري تحميل المباريات...</div>
        </div>
      </SuperadminLayout>
    );
  }

  return (
    <SuperadminLayout title="إدارة المباريات">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة المباريات</h2>
          <p className="text-gray-600">
            إدارة مباريات البطولة والنتائج
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <Plus size={16} />
              <span>إضافة مباراة</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "تعديل مباراة" : "إضافة مباراة جديدة"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">الفئة</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تحت 14 سنة">تحت 14 سنة</SelectItem>
                      <SelectItem value="تحت 16 سنة">تحت 16 سنة</SelectItem>
                      <SelectItem value="تحت 18 سنة">تحت 18 سنة</SelectItem>
                      <SelectItem value="تحت 12 سنة">تحت 12 سنة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="homeTeam" className="text-right">الفريق المستضيف</Label>
                  <Select 
                    value={formData.homeTeam} 
                    onValueChange={(value) => handleSelectChange("homeTeam", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفريق المستضيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {academies.map((academy) => (
                        <SelectItem key={academy.id} value={academy.id}>
                          {academy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="awayTeam" className="text-right">الفريق الضيف</Label>
                  <Select 
                    value={formData.awayTeam} 
                    onValueChange={(value) => handleSelectChange("awayTeam", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفريق الضيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {academies.map((academy) => (
                        <SelectItem key={academy.id} value={academy.id}>
                          {academy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">التاريخ</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">الوقت</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="venue" className="text-right">الملعب</Label>
                  <Input
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">حالة المباراة</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">قادمة</SelectItem>
                      <SelectItem value="inProgress">جارية</SelectItem>
                      <SelectItem value="completed">منتهية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(formData.status === "inProgress" || formData.status === "completed") && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="homeScore" className="text-right">نتيجة الفريق المستضيف</Label>
                      <Input
                        id="homeScore"
                        name="homeScore"
                        type="number"
                        min="0"
                        value={formData.homeScore === null ? "" : formData.homeScore}
                        onChange={handleScoreChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="awayScore" className="text-right">نتيجة الفريق الضيف</Label>
                      <Input
                        id="awayScore"
                        name="awayScore"
                        type="number"
                        min="0"
                        value={formData.awayScore === null ? "" : formData.awayScore}
                        onChange={handleScoreChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </>
                )}
              </div>
              
              <DialogFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "جاري الحفظ..." : (isEditMode ? "تحديث" : "إضافة")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="dateFilter">تصفية حسب التاريخ</Label>
            <Input
              id="dateFilter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="categoryFilter">تصفية حسب الفئة</Label>
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="جميع الفئات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="تحت 14 سنة">تحت 14 سنة</SelectItem>
                <SelectItem value="تحت 16 سنة">تحت 16 سنة</SelectItem>
                <SelectItem value="تحت 18 سنة">تحت 18 سنة</SelectItem>
                <SelectItem value="تحت 12 سنة">تحت 12 سنة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="statusFilter">تصفية حسب الحالة</Label>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="scheduled">قادمة</SelectItem>
                <SelectItem value="inProgress">جارية</SelectItem>
                <SelectItem value="completed">منتهية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setCategoryFilter("all");
                setStatusFilter("all");
                setDateFilter("");
              }}
              className="w-full"
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الفئة</TableHead>
              <TableHead>الفريق المستضيف</TableHead>
              <TableHead>النتيجة</TableHead>
              <TableHead>الفريق الضيف</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الوقت</TableHead>
              <TableHead>الملعب</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  لا توجد مباريات متطابقة مع معايير البحث
                </TableCell>
              </TableRow>
            ) : (
              filteredMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{match.category}</TableCell>
                  <TableCell>{getTeamName(match.homeTeam)}</TableCell>
                  <TableCell>
                    {match.homeScore !== null && match.awayScore !== null ? 
                      `${match.homeScore} - ${match.awayScore}` : 
                      "-"
                    }
                  </TableCell>
                  <TableCell>{getTeamName(match.awayTeam)}</TableCell>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.time}</TableCell>
                  <TableCell>{match.venue}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      match.status === "completed" ? "bg-green-100 text-green-800" : 
                      match.status === "inProgress" ? "bg-blue-100 text-blue-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {formatStatus(match.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleViewMatchReport(match.id)}
                        title="عرض تقرير المباراة"
                      >
                        <FileText size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleEditMatch(match)}
                        title="تعديل المباراة"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleDeleteMatch(match.id)}
                        title="حذف المباراة"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </SuperadminLayout>
  );
};

export default MatchManager;
