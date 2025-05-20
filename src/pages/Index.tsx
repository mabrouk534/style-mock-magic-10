import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react";
import { academies, matches, players } from '@/data';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">بطولة كواترو للأكاديميات</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Teams Card */}
          <Card>
            <CardHeader>
              <CardTitle>الفرق المشاركة</CardTitle>
              <CardDescription>قائمة بجميع الفرق المشاركة في البطولة</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{academies.length} أكاديمية</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/teams">استعراض الفرق</a>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Matches Card */}
          <Card>
            <CardHeader>
              <CardTitle>جدول المباريات</CardTitle>
              <CardDescription>مواعيد المباريات ونتائجها</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{matches.length} مباراة</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/matches">استعراض المباريات</a>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Players Card */}
          <Card>
            <CardHeader>
              <CardTitle>اللاعبون</CardTitle>
              <CardDescription>قائمة بجميع اللاعبين المشاركين في البطولة</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{players.length} لاعب</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="#">استعراض اللاعبين</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">عن البطولة</h2>
          <p className="text-gray-700 leading-relaxed">
            بطولة كواترو للأكاديميات الخليجية لكرة القدم هي بطولة سنوية تهدف إلى تطوير مستوى كرة القدم في منطقة الخليج. تجمع البطولة أفضل الأكاديميات من مختلف دول الخليج في منافسة تهدف إلى اكتشاف المواهب الشابة وتعزيز الروح الرياضية.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            تتميز البطولة بتنظيم عالي المستوى ومشاركة واسعة من الأكاديميات المرموقة، مما يجعلها فرصة مثالية للاعبين الشباب لإظهار مهاراتهم والتنافس مع أفضل اللاعبين في المنطقة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
