
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
import { Player, Academy } from "@/types/tournament";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPlayer, updatePlayer, deletePlayer, getPlayers } from "@/services/playerService";
import { getAcademies } from "@/services/academyService";

const positions = [
  "حارس مرمى",
  "مدافع",
  "ظهير أيمن",
  "ظهير أيسر",
  "وسط",
  "جناح",
  "مهاجم"
];

const PlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [academyFilter, setAcademyFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    academy: "",
    category: "",
    dateOfBirth: "",
    position: "",
    jerseyNumber: 0,
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    nationality: ""
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [playersData, academiesData] = await Promise.all([
        getPlayers(),
        getAcademies()
      ]);
      setPlayers(playersData);
      setAcademies(academiesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل البيانات",
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      academy: "",
      category: "",
      dateOfBirth: "",
      position: "",
      jerseyNumber: 0,
      goals: 0,
      yellowCards: 0,
      redCards: 0,
      nationality: ""
    });
    setIsEditMode(false);
    setCurrentPlayer(null);
    setIsDialogOpen(false);
  };
  
  const handleEditPlayer = (player: Player) => {
    setIsEditMode(true);
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      academy: player.academy,
      category: player.category,
      dateOfBirth: player.dateOfBirth,
      position: player.position,
      jerseyNumber: player.jerseyNumber,
      goals: player.goals,
      yellowCards: player.yellowCards,
      redCards: player.redCards,
      nationality: player.nationality || ""
    });
    setIsDialogOpen(true);
  };
  
  const handleDeletePlayer = async (id: string) => {
    try {
      await deletePlayer(id);
      setPlayers(prev => prev.filter(player => player.id !== id));
      toast({
        title: "تم حذف اللاعب",
        description: "تم حذف اللاعب بنجاح"
      });
    } catch (error) {
      console.error('Error deleting player:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف اللاعب",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && currentPlayer) {
        await updatePlayer(currentPlayer.id, formData);
        setPlayers(prev => prev.map(player => 
          player.id === currentPlayer.id ? { ...player, ...formData } : player
        ));
        toast({
          title: "تم تحديث معلومات اللاعب",
          description: "تم تحديث معلومات اللاعب بنجاح"
        });
      } else {
        const newPlayerId = await createPlayer(formData);
        const newPlayer: Player = {
          id: newPlayerId,
          ...formData
        };
        setPlayers(prev => [...prev, newPlayer]);
        toast({
          title: "تمت إضافة اللاعب",
          description: "تمت إضافة اللاعب بنجاح"
        });
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving player:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حفظ البيانات",
        variant: "destructive"
      });
    }
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : player.category === categoryFilter;
    const matchesAcademy = academyFilter === "all" ? true : player.academy === academyFilter;
    return matchesSearch && matchesCategory && matchesAcademy;
  });

  const getAcademyName = (academyId: string) => {
    const academy = academies.find(a => a.id === academyId);
    return academy ? academy.name : academyId;
  };

  if (loading) {
    return (
      <SuperadminLayout title="إدارة اللاعبين">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">جاري التحميل...</div>
        </div>
      </SuperadminLayout>
    );
  }

  return (
    <SuperadminLayout title="إدارة اللاعبين">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة اللاعبين</h2>
          <p className="text-gray-600">
            إدارة اللاعبين المشاركين في البطولة
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}>
              <Plus size={16} />
              <span>إضافة لاعب</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "تعديل بيانات لاعب" : "إضافة لاعب جديد"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">اسم اللاعب</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="academy" className="text-right">الأكاديمية</Label>
                  <Select 
                    value={formData.academy} 
                    onValueChange={(value) => handleSelectChange("academy", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الأكاديمية" />
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
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateOfBirth" className="text-right">تاريخ الميلاد</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">المركز</Label>
                  <Select 
                    value={formData.position} 
                    onValueChange={(value) => handleSelectChange("position", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر المركز" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="jerseyNumber" className="text-right">رقم القميص</Label>
                  <Input
                    id="jerseyNumber"
                    name="jerseyNumber"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.jerseyNumber}
                    onChange={handleNumberChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goals" className="text-right">الأهداف</Label>
                  <Input
                    id="goals"
                    name="goals"
                    type="number"
                    min="0"
                    value={formData.goals}
                    onChange={handleNumberChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="yellowCards" className="text-right">البطاقات الصفراء</Label>
                  <Input
                    id="yellowCards"
                    name="yellowCards"
                    type="number"
                    min="0"
                    value={formData.yellowCards}
                    onChange={handleNumberChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="redCards" className="text-right">البطاقات الحمراء</Label>
                  <Input
                    id="redCards"
                    name="redCards"
                    type="number"
                    min="0"
                    value={formData.redCards}
                    onChange={handleNumberChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nationality" className="text-right">الجنسية</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">{isEditMode ? "تحديث" : "إضافة"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="searchTerm">بحث</Label>
            <Input
              id="searchTerm"
              placeholder="ابحث باسم اللاعب"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="academyFilter">تصفية حسب الأكاديمية</Label>
            <Select 
              value={academyFilter} 
              onValueChange={setAcademyFilter}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="جميع الأكاديميات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأكاديميات</SelectItem>
                {academies.map((academy) => (
                  <SelectItem key={academy.id} value={academy.id}>
                    {academy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم اللاعب</TableHead>
              <TableHead>الأكاديمية</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead>المركز</TableHead>
              <TableHead>رقم القميص</TableHead>
              <TableHead>الأهداف</TableHead>
              <TableHead>البطاقات الصفراء</TableHead>
              <TableHead>البطاقات الحمراء</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  {loading ? "جاري التحميل..." : "لا يوجد لاعبين متطابقين مع معايير البحث"}
                </TableCell>
              </TableRow>
            ) : (
              filteredPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{getAcademyName(player.academy)}</TableCell>
                  <TableCell>{player.category}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.jerseyNumber}</TableCell>
                  <TableCell>{player.goals}</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {player.yellowCards}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      {player.redCards}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditPlayer(player)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeletePlayer(player.id)}>
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

export default PlayerManager;
