
import React, { useState, useEffect, useRef } from "react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Academy } from "@/types/tournament";
import { Plus, Pencil, Trash2, Building, Upload } from "lucide-react"; 
import { academies } from "@/data";

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
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Load academies from mock data
    setAcademiesList([...academies]);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewLogo(base64String);
        setFormData(prev => ({ ...prev, logo: base64String }));
      };
      
      reader.readAsDataURL(file);
    }
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
    setPreviewLogo(null);
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
    setPreviewLogo(academy.logo);
    setDialogOpen(true);
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
    setDialogOpen(false);
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOpenDialog = () => {
    resetForm();
    setDialogOpen(true);
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
        
        <Button className="flex items-center gap-2" onClick={handleOpenDialog}>
          <Plus size={16} />
          <span>إضافة أكاديمية</span>
        </Button>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="logo" className="text-right mt-2">شعار الأكاديمية</Label>
                <div className="col-span-3">
                  <div className="flex flex-col items-center space-y-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {previewLogo ? (
                      <div className="relative">
                        <img 
                          src={previewLogo} 
                          alt="Preview" 
                          className="w-32 h-32 object-contain border rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute bottom-0 right-0 bg-white"
                          onClick={handleTriggerFileInput}
                        >
                          <Pencil size={14} />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleTriggerFileInput}
                        className="w-32 h-32 flex flex-col items-center justify-center border-dashed border-2"
                      >
                        <Upload size={24} className="mb-2" />
                        <span className="text-sm">رفع شعار</span>
                      </Button>
                    )}
                  </div>
                </div>
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
                    <img src={academy.logo} alt={academy.name} className="w-16 h-16 object-contain mr-4 rounded-md" />
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
