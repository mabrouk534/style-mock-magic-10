
import { useState, useEffect } from "react";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Academy } from "@/types/tournament";
import { academies } from "@/data/mockData";
import { Plus, Pencil, Trash2 } from "lucide-react";

const AcademyManager = () => {
  const [academiesList, setAcademiesList] = useState<Academy[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAcademy, setCurrentAcademy] = useState<Academy | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    coordinator: "",
    contactNumber: "",
    logo: "",
    participatingCategories: [] as string[]
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Load academies from mock data
    setAcademiesList([...academies]);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      if (prev.participatingCategories.includes(category)) {
        return {
          ...prev,
          participatingCategories: prev.participatingCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          participatingCategories: [...prev.participatingCategories, category]
        };
      }
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      country: "",
      coordinator: "",
      contactNumber: "",
      logo: "",
      participatingCategories: []
    });
    setIsEditMode(false);
    setCurrentAcademy(null);
  };
  
  const handleEditAcademy = (academy: Academy) => {
    setIsEditMode(true);
    setCurrentAcademy(academy);
    setFormData({
      name: academy.name,
      country: academy.country,
      coordinator: academy.coordinator,
      contactNumber: academy.contactNumber,
      logo: academy.logo,
      participatingCategories: [...academy.participatingCategories]
    });
  };
  
  const handleDeleteAcademy = (id: string) => {
    setAcademiesList(prev => prev.filter(academy => academy.id !== id));
    toast({
      title: "تم حذف الأكاديمية",
      description: "تم حذف الأكاديمية بنجاح"
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentAcademy) {
      // Update existing academy
      const updatedAcademies = academiesList.map(academy => 
        academy.id === currentAcademy.id ? { ...academy, ...formData } : academy
      );
      setAcademiesList(updatedAcademies);
      toast({
        title: "تم تحديث الأكاديمية",
        description: "تم تحديث معلومات الأكاديمية بنجاح"
      });
    } else {
      // Create new academy
      const newAcademy: Academy = {
        id: `academy-${Date.now()}`,
        ...formData
      };
      setAcademiesList(prev => [...prev, newAcademy]);
      toast({
        title: "تمت إضافة الأكاديمية",
        description: "تمت إضافة الأكاديمية بنجاح"
      });
    }
    
    resetForm();
  };

  return (
    <SuperadminLayout title="إدارة الأكاديميات">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة الأكاديميات</h2>
          <p className="text-gray-600">
            إدارة الأكاديميات المشاركة في البطولة
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <Plus size={16} />
              <span>إضافة أكاديمية</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "تعديل أكاديمية" : "إضافة أكاديمية جديدة"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">اسم الأكاديمية</Label>
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
                  <Label htmlFor="country" className="text-right">البلد</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coordinator" className="text-right">المنسق</Label>
                  <Input
                    id="coordinator"
                    name="coordinator"
                    value={formData.coordinator}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactNumber" className="text-right">رقم التواصل</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="logo" className="text-right">شعار الأكاديمية (URL)</Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right mt-2">الفئات المشاركة</Label>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {["تحت 14 سنة", "تحت 16 سنة", "تحت 18 سنة"].map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={formData.participatingCategories.includes(category) ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">{isEditMode ? "تحديث" : "إضافة"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academiesList.map((academy) => (
          <Card key={academy.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{academy.name}</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEditAcademy(academy)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteAcademy(academy.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  {academy.logo ? (
                    <img src={academy.logo} alt={academy.name} className="w-16 h-16 object-contain mr-4" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mr-4 rounded-md">
                      <Building size={24} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">البلد</p>
                    <p className="font-medium">{academy.country}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">المنسق</p>
                  <p className="font-medium">{academy.coordinator}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">رقم التواصل</p>
                  <p className="font-medium">{academy.contactNumber}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-2">الفئات المشاركة</p>
                <div className="flex flex-wrap gap-2">
                  {academy.participatingCategories.map((category) => (
                    <span 
                      key={category} 
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SuperadminLayout>
  );
};

export default AcademyManager;
