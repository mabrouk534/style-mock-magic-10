
import { useEffect, useState } from "react";
import { Building, Trophy, Users, UserCog } from "lucide-react";
import SuperadminLayout from "@/components/SuperadminLayout";
import { StatCard } from "@/components/StatCard";
import { Academy } from "@/types/tournament";
import { academies } from "@/data/mockData";

const SuperadminDashboard = () => {
  const [totalAcademies, setTotalAcademies] = useState<number>(0);
  
  useEffect(() => {
    // In a real app, this would be a fetch from the API
    setTotalAcademies(academies.length);
  }, []);

  return (
    <SuperadminLayout title="لوحة تحكم المشرف الرئيسي">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">مرحباً بك في لوحة تحكم المشرف الرئيسي</h2>
        <p className="text-gray-600">
          يمكنك إدارة الأكاديميات المشاركة والمباريات والإحصائيات من هنا
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="عدد الأكاديميات المشاركة"
          value={totalAcademies}
          icon={<Building size={24} />}
          color="bg-quattro-red"
        />
        
        <StatCard
          title="عدد الفرق"
          value={totalAcademies * 3}
          icon={<Trophy size={24} />}
          color="bg-green-500"
        />
        
        <StatCard
          title="مجموع اللاعبين"
          value={totalAcademies * 15}
          icon={<Users size={24} />}
          color="bg-purple-500"
        />
        
        <StatCard
          title="الموظفين والإداريين"
          value={totalAcademies * 5}
          icon={<UserCog size={24} />}
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
            <h4 className="font-medium mb-2">الإحصائيات العامة</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">عدد المباريات</p>
                <p className="text-lg font-medium">24 مباراة</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">عدد الأهداف</p>
                <p className="text-lg font-medium">78 هدف</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">عدد البطاقات</p>
                <p className="text-lg font-medium">45 بطاقة</p>
              </div>
            </div>
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
    </SuperadminLayout>
  );
};

export default SuperadminDashboard;
