
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { MatchCard } from '@/components/MatchCard';
import { StatCard } from '@/components/StatCard';
import { TeamCard } from '@/components/TeamCard';
import { matches, academies, tournamentRules, schedule } from '@/data/mockData';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Trophy, Calendar, FileText, User } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.title = "بطولة كواترو للأكاديميات الخليجية لكرة القدم 2025";
  }, []);

  // Get latest matches (next 3 upcoming or recently completed)
  const latestMatches = matches.slice(0, 3);

  // Get featured teams (first 4)
  const featuredTeams = academies.slice(0, 4);

  // Get next event
  const currentDate = new Date();
  const nextEvent = schedule
    .filter(event => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-quattro-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            بطولة كواترو للأكاديميات الخليجية لكرة القدم
          </h1>
          <p className="text-xl mb-6">النسخة الثامنة - 2025</p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Link to="/teams">
              <Button className="bg-white text-quattro-blue hover:bg-gray-100">الفرق المشاركة</Button>
            </Link>
            <Link to="/matches">
              <Button className="bg-quattro-red hover:bg-quattro-red/90">جدول المباريات</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="عدد الأكاديميات" 
            value={academies.length} 
            icon={<Users size={24} />} 
            color="bg-quattro-blue"
          />
          <StatCard 
            title="عدد اللاعبين" 
            value="120" 
            icon={<User size={24} />} 
            color="bg-quattro-green"
          />
          <StatCard 
            title="عدد المباريات" 
            value={matches.length} 
            icon={<Calendar size={24} />} 
            color="bg-quattro-red"
          />
          <StatCard 
            title="البطولات السابقة" 
            value="7" 
            icon={<Trophy size={24} />} 
            color="bg-quattro-darkgray"
          />
        </div>
      </div>
      
      {/* Latest Matches Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">أحدث المباريات</h2>
          <Link to="/matches">
            <Button variant="outline">عرض الكل</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
      
      {/* Teams Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">الفرق المشاركة</h2>
          <Link to="/teams">
            <Button variant="outline">عرض الكل</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTeams.map(academy => (
            <TeamCard key={academy.id} academy={academy} />
          ))}
        </div>
      </div>
      
      {/* Rules & Schedule Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tournament Rules */}
          <Card>
            <CardHeader className="bg-quattro-blue text-white py-2 px-4">
              <div className="flex items-center">
                <FileText className="ml-2" size={20} />
                <h2 className="text-xl font-bold">لوائح وأنظمة البطولة</h2>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Table>
                <TableBody>
                  {tournamentRules.slice(0, 4).map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-bold w-1/3">{rule.title}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Link to="/rules">
                  <Button variant="outline">عرض كل اللوائح</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Next Event */}
          {nextEvent && (
            <Card>
              <CardHeader className="bg-quattro-blue text-white py-2 px-4">
                <div className="flex items-center">
                  <Calendar className="ml-2" size={20} />
                  <h2 className="text-xl font-bold">الحدث القادم</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{nextEvent.title}</h3>
                <div className="flex items-center mb-3">
                  <div className="bg-gray-100 rounded-lg p-3 ml-3 text-center">
                    <div className="text-sm text-gray-500">التاريخ</div>
                    <div className="font-bold">
                      {new Date(nextEvent.date).toLocaleDateString('ar-AE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">الوقت</div>
                    <div className="font-bold">{nextEvent.startTime} - {nextEvent.endTime}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-sm text-gray-500">المكان</div>
                  <div className="font-bold">{nextEvent.location}</div>
                </div>
                <p className="text-gray-600 mb-4">{nextEvent.description}</p>
                <Link to="/schedule">
                  <Button className="w-full bg-quattro-blue hover:bg-quattro-blue/90">
                    عرض الجدول الكامل
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-right">
              <img 
                src="/lovable-uploads/0bba4204-75a2-4450-816b-bd2b6f469e00.png" 
                alt="Quattro Logo" 
                className="h-12 w-12 mx-auto md:mx-0 mb-2"
              />
              <p>بطولة كواترو للأكاديميات الخليجية لكرة القدم</p>
              <p className="text-gray-400">النسخة الثامنة - 2025</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-right">
              <div>
                <h3 className="font-bold mb-2">روابط سريعة</h3>
                <ul>
                  <li><Link to="/" className="text-gray-400 hover:text-white">الرئيسية</Link></li>
                  <li><Link to="/teams" className="text-gray-400 hover:text-white">الفرق</Link></li>
                  <li><Link to="/matches" className="text-gray-400 hover:text-white">المباريات</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">البطولة</h3>
                <ul>
                  <li><Link to="/standings" className="text-gray-400 hover:text-white">الترتيب</Link></li>
                  <li><Link to="/rules" className="text-gray-400 hover:text-white">اللوائح</Link></li>
                  <li><Link to="/schedule" className="text-gray-400 hover:text-white">الجدول</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">تواصل معنا</h3>
                <ul>
                  <li className="text-gray-400">info@quattro.com</li>
                  <li className="text-gray-400">+971 4 123 4567</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-gray-700 pt-4">
            <p className="text-gray-400">جميع الحقوق محفوظة &copy; بطولة كواترو للأكاديميات 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
