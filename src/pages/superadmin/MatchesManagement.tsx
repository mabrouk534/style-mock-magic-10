
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Search, PlusCircle, FileEdit, Eye, CalendarIcon } from "lucide-react";
import { matches, academies, tournamentProgram } from "@/data";
import { Match } from "@/types/tournament";

const MatchesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [matchesList, setMatchesList] = useState(matches);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state for new match
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

  // Get unique categories
  const categories = [...new Set(matches.map((match) => match.category))];
  
  // Get unique dates for tournament program
  const programDates = [...new Set(tournamentProgram.map(day => day.date))];

  useEffect(() => {
    // Apply filters
    let filtered = matchesList;

    if (searchTerm) {
      filtered = filtered.filter((match) => {
        const homeTeam = academies.find((academy) => academy.id === match.homeTeam);
        const awayTeam = academies.find((academy) => academy.id === match.awayTeam);
        return (
          homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((match) => match.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((match) => match.status === selectedStatus);
    }

    setFilteredMatches(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, matchesList]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
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
  };
  
  const handleEditMatch = (match: Match) => {
    navigate(`/superadmin/match-report/${match.id}`);
  };
  
  const handleAddMatch = () => {
    // Validate form
    if (
      !formData.homeTeam || 
      !formData.awayTeam || 
      !formData.date || 
      !formData.time || 
      !formData.venue || 
      !formData.category
    ) {
      toast({
        variant: "destructive",
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة"
      });
      return;
    }
    
    // Create new match object
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      ...formData
    };
    
    // Add to matches list
    const updatedMatches = [...matchesList, newMatch];
    setMatchesList(updatedMatches);
    
    toast({
      title: "تمت إضافة المباراة",
      description: "تمت إضافة المباراة بنجاح"
    });
    
    // Close dialog and reset form
    setDialogOpen(false);
    resetForm();
  };
  
  // Find tournament program for the selected date
  const selectedProgram = selectedDate 
    ? tournamentProgram.find(day => day.date === selectedDate)
    : null;
  
  return (
    <SuperadminLayout title="إدارة المباريات">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">قائمة المباريات</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="bg-quattro-blue hover:bg-quattro-blue/90"
              onClick={resetForm}
            >
              <PlusCircle className="ml-2 h-5 w-5" />
              إضافة مباراة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة مباراة جديدة</DialogTitle>
            </DialogHeader>
            
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
              <Button type="button" onClick={handleAddMatch}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="matches">المباريات</TabsTrigger>
          <TabsTrigger value="program">برنامج البطولة</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <Input
                  className="pl-3 pr-10"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={`category-${index}`} value={String(category)}>
                      {String(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="scheduled">قادمة</SelectItem>
                  <SelectItem value="inProgress">جارية</SelectItem>
                  <SelectItem value="completed">منتهية</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-quattro-gray hover:bg-quattro-gray/90 text-black" onClick={resetFilters}>
                إعادة تعيين التصفية
              </Button>
            </div>
          </div>
          
          {/* Matches Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الوقت</TableHead>
                  <TableHead>الفريق المستضيف</TableHead>
                  <TableHead>الفريق الضيف</TableHead>
                  <TableHead>النتيجة</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.length > 0 ? (
                  filteredMatches.map(match => {
                    const homeTeam = academies.find(academy => academy.id === match.homeTeam);
                    const awayTeam = academies.find(academy => academy.id === match.awayTeam);
                    return (
                      <TableRow key={match.id}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.time}</TableCell>
                        <TableCell>{homeTeam?.name}</TableCell>
                        <TableCell>{awayTeam?.name}</TableCell>
                        <TableCell>
                          {match.status === "completed" ? 
                            `${match.homeScore} - ${match.awayScore}` : 
                            "—"
                          }
                        </TableCell>
                        <TableCell>{match.category}</TableCell>
                        <TableCell>
                          <div className={`px-2 py-1 rounded-full text-center text-xs ${
                            match.status === "completed" ? "bg-green-100 text-green-800" : 
                            match.status === "inProgress" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {match.status === "completed" ? "منتهية" : 
                             match.status === "inProgress" ? "جارية" : "قادمة"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-s-2">
                            <Link to={`/superadmin/match-report/${match.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-5 w-5" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={() => handleEditMatch(match)}>
                              <FileEdit className="h-5 w-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      لا توجد مباريات مطابقة للمعايير المحددة
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="program">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="ml-2" />
                  برنامج بطولة كوانرو للأكاديميات الخليجية 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="programDate">اختر اليوم</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر تاريخ البرنامج" />
                    </SelectTrigger>
                    <SelectContent>
                      {programDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProgram ? (
                  <div>
                    <h3 className="text-xl font-bold mb-4">{selectedProgram.title}</h3>
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الوقت</TableHead>
                            <TableHead>النشاط</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProgram.activities.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{activity.time}</TableCell>
                              <TableCell>{activity.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    يرجى اختيار تاريخ لعرض برنامج البطولة
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SuperadminLayout>
  );
};

export default MatchesManagement;
