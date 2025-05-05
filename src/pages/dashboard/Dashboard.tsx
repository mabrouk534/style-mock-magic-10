
import { useEffect, useState } from "react";
import { Building, Trophy, Users, UserCog } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Academy } from "@/types/tournament";
import { academies } from "@/data/mockData";

const Dashboard = () => {
  const [academy, setAcademy] = useState<Academy | null>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.academyId) {
        // Find academy from mock data
        const foundAcademy = academies.find(a => a.id === user.academyId);
        if (foundAcademy) {
          setAcademy(foundAcademy);
        }
      }
    }
  }, []);
  
  if (!academy) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">جاري التحميل...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">مرحباً بكم في لوحة تحكم {academy.name}</h2>
        <p className="text-gray-600">
          يمكنكم من هنا إدارة معلومات الأكاديمية وتسجيل اللاعبين والجهاز الفني
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="عدد الفئات المشاركة"
          value={academy.participatingCategories.length}
          icon={<Trophy size={24} />}
          color="bg-quattro-blue"
        />
        
        <StatCard
          title="اللاعبون المسجلون"
          value={15}
          icon={<Users size={24} />}
          color="bg-green-500"
        />
        
        <StatCard
          title="الجهاز الفني"
          value={5}
          icon={<UserCog size={24} />}
          color="bg-purple-500"
        />
        
        <StatCard
          title="بلد الأكاديمية"
          value={academy.country}
          icon={<Building size={24} />}
          color="bg-amber-500"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">معلومات البطولة</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">مواعيد البطولة</h4>
            <p className="text-gray-700">15 - 30 يونيو 2025</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">الفئات العمرية</h4>
            <div className="flex flex-wrap gap-2">
              {["تحت 14 سنة", "تحت 16 سنة", "تحت 18 سنة"].map((category) => (
                <span 
                  key={category} 
                  className={`px-3 py-1 rounded-full text-sm ${
                    academy.participatingCategories.includes(category)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">منسق الأكاديمية</h4>
            <p className="text-gray-700">{academy.coordinator}</p>
            <p className="text-gray-500 text-sm">رقم التواصل: {academy.contactNumber}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">تواريخ مهمة</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-gray-700">آخر موعد لتسجيل اللاعبين: 10 يونيو 2025</li>
              <li className="text-gray-700">اجتماع المنسقين: 14 يونيو 2025</li>
              <li className="text-gray-700">حفل افتتاح البطولة: 15 يونيو 2025</li>
              <li className="text-gray-700">نهائي البطولة: 30 يونيو 2025</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
