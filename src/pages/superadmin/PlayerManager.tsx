
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
import { Player } from "@/types/tournament";
import { Plus, Pencil, Trash2, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { players, academies } from "@/data";

// Mock initial data for players
const initialPlayers: Player[] = [
  {
    id: "player-1",
    name: "أحمد محمد",
    academy: "academy-1",
    category: "تحت 14 سنة",
    dateOfBirth: "2010-05-15",
    goals: 3,
    yellowCards: 1,
    redCards: 0,
    position: "مهاجم",
    jerseyNumber: 10
  },
  {
    id: "player-2",
    name: "سعيد خالد",
    academy: "academy-2",
    category: "تحت 16 سنة",
    dateOfBirth: "2008-11-20",
    goals: 1,
    yellowCards: 0,
    redCards: 0,
    position: "وسط",
    jerseyNumber: 8
  },
  {
    id: "player-3",
    name: "فهد العامري",
    academy: "academy-1",
    category: "تحت 18 سنة",
    dateOfBirth: "2007-03-10",
    goals: 0,
    yellowCards: 2,
    redCards: 0,
    position: "مدافع",
    jerseyNumber: 4
  }
];

const positions = [
  "حارس مرمى",
  "مدافع",
  "ظهير أيمن",
  "ظهير أيسر",
  "وسط",
  "جناح",
  "مهاجم"
];

// Card types for player
const cardTypes = [
  "هوية",
  "جواز سفر",
  "بطاقة اللعب",
  "تصريح إقامة"
];

const PlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [academyFilter, setAcademyFilter] = useState<string>("");
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);

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
    nationality: "",
    photo: ""
  });
  
  // Card form data
  const [cardFormData, setCardFormData] = useState({
    cardType: "هوية",
    cardNumber: "",
    cardExpiry: "",
    cardImage: ""
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Load players from mock data
    setPlayers([...initialPlayers]);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardSelectChange = (value: string) => {
    setCardFormData(prev => ({ ...prev, cardType: value }));
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
      nationality: "",
      photo: ""
    });
    setIsEditMode(false);
    setCurrentPlayer(null);
  };

  const resetCardForm = () => {
    setCardFormData({
      cardType: "هوية",
      cardNumber: "",
      cardExpiry: "",
      cardImage: ""
    });
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
      nationality: player.nationality || "",
      photo: player.photo || ""
    });
  };
  
  const handleDeletePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
    toast({
      title: "تم حذف اللاعب",
      description: "تم حذف اللاعب بنجاح"
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentPlayer) {
      // Update existing player
      const updatedPlayers = players.map(player => 
        player.id === currentPlayer.id ? { ...player, ...formData } : player
      );
      setPlayers(updatedPlayers);
      toast({
        title: "تم تحديث معلومات اللاعب",
        description: "تم تحديث معلومات اللاعب بنجاح"
      });
    } else {
      // Create new player
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        ...formData
      };
      setPlayers(prev => [...prev, newPlayer]);
      toast({
        title: "تمت إضافة اللاعب",
        description: "تمت إضافة اللاعب بنجاح"
      });
    }
    
    resetForm();
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPlayer) {
      // Update player with card information
      const updatedPlayers = players.map(player => 
        player.id === currentPlayer.id 
          ? { 
              ...player, 
              cardType: cardFormData.cardType,
              cardNumber: cardFormData.cardNumber,
              cardExpiry: cardFormData.cardExpiry,
              cardImage: cardFormData.cardImage
            } 
          : player
      );
      
      setPlayers(updatedPlayers);
      setIsCardDialogOpen(false);
      resetCardForm();
      
      toast({
        title: "تم تحديث بطاقة اللاعب",
        description: "تم تحديث معلومات بطاقة اللاعب بنجاح"
      });
    }
  };

  const openCardDialog = (player: Player) => {
    setCurrentPlayer(player);
    // Pre-populate form if card data exists
    setCardFormData({
      cardType: player.cardType || "هوية",
      cardNumber: player.cardNumber || "",
      cardExpiry: player.cardExpiry || "",
      cardImage: player.cardImage || ""
    });
    setIsCardDialogOpen(true);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? player.category === categoryFilter : true;
    const matchesAcademy = academyFilter ? player.academy === academyFilter : true;
    return matchesSearch && matchesCategory && matchesAcademy;
  });

  const getAcademyName = (academyId: string) => {
    const academy = academies.find(a => a.id === academyId);
    return academy ? academy.name : academyId;
  };

  return (
    <SuperadminLayout title="إدارة اللاعبين">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة اللاعبين</h2>
          <p className="text-gray-600">
            إدارة اللاعبين المشاركين في البطولة
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
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
                  <Label htmlFor="nationality" className="text-right">الجنسية</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo" className="text-right">صورة اللاعب (URL)</Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="url"
                    value={formData.photo}
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
                <SelectItem value="">جميع الفئات</SelectItem>
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
                <SelectItem value="">جميع الأكاديميات</SelectItem>
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
              <TableHead>البطاقات</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  لا يوجد لاعبين متطابقين مع معايير البحث
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
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {player.yellowCards}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                        {player.redCards}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditPlayer(player)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeletePlayer(player.id)}>
                        <Trash2 size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => openCardDialog(player)} 
                        className="text-purple-500 hover:text-purple-700"
                      >
                        <CreditCard size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Card Management Dialog */}
      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إدارة بطاقات اللاعب</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCardSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardType" className="text-right">نوع البطاقة</Label>
                <Select 
                  value={cardFormData.cardType} 
                  onValueChange={handleCardSelectChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر نوع البطاقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">رقم البطاقة</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={cardFormData.cardNumber}
                  onChange={handleCardInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardExpiry" className="text-right">تاريخ الانتهاء</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="date"
                  value={cardFormData.cardExpiry}
                  onChange={handleCardInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardImage" className="text-right">صورة البطاقة (URL)</Label>
                <Input
                  id="cardImage"
                  name="cardImage"
                  type="url"
                  value={cardFormData.cardImage}
                  onChange={handleCardInputChange}
                  className="col-span-3"
                />
              </div>

              {cardFormData.cardImage && (
                <div className="mt-2">
                  <Label className="block mb-2">معاينة الصورة</Label>
                  <img 
                    src={cardFormData.cardImage} 
                    alt="صورة البطاقة" 
                    className="max-h-40 border rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=صورة+غير+متوفرة';
                    }}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsCardDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">
                حفظ البطاقة
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SuperadminLayout>
  );
};

export default PlayerManager;
