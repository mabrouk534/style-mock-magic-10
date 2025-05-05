
import Navbar from '@/components/Navbar';
import { tournamentRules } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const Rules = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">لوائح وأنظمة البطولة</h1>
        
        <Card>
          <CardHeader className="bg-quattro-blue text-white py-2 px-4">
            <div className="flex items-center justify-center">
              <FileText className="ml-2" size={20} />
              <h2 className="text-xl font-bold">القواعد والأنظمة</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <p>
                تُقام بطولة كواترو للأكاديميات الخليجية لكرة القدم تحت إشراف لجنة تنظيمية متخصصة تضمن سير البطولة وفق أعلى المعايير التنظيمية والفنية. تتبع البطولة مجموعة من القوانين واللوائح التي تضمن المنافسة العادلة وتنظيم احترافي للمباريات.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 text-right">النظام</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournamentRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-bold">{rule.title}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">شروط المشاركة</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>يحق لكل أكاديمية المشاركة بثلاث فئات كحد أقصى</li>
                  <li>يجب أن تقدم كل أكاديمية قائمة باللاعبين قبل أسبوع من بدء البطولة</li>
                  <li>يجب أن تلتزم الأكاديميات بالفئات العمرية المحددة للبطولة</li>
                  <li>يحق للجنة التنظيمية مراجعة أوراق اللاعبين والتأكد من أعمارهم</li>
                  <li>يجب على جميع اللاعبين ارتداء الزي الرسمي للأكاديمية خلال المباريات</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">الجوائز</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>كأس البطولة للفريق الفائز في كل فئة</li>
                  <li>ميداليات ذهبية للفريق الفائز وفضية للوصيف</li>
                  <li>جائزة أفضل لاعب في البطولة لكل فئة</li>
                  <li>جائزة هداف البطولة لكل فئة</li>
                  <li>جائزة أفضل حارس مرمى لكل فئة</li>
                  <li>جائزة الروح الرياضية للفريق المثالي</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rules;
