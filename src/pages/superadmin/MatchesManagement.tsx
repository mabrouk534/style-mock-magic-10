
import { useState } from "react";
import { Calendar, Plus, Search } from "lucide-react";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { matches, academies } from "@/data/mockData";

const MatchesManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get unique categories
  const categories = [...new Set(matches.map(match => match.category))];
  
  // Filter matches based on selected category and search query
  const filteredMatches = matches
    .filter(match => selectedCategory === 'all' || match.category === selectedCategory)
    .filter(match => 
      match.team1.name.includes(searchQuery) || 
      match.team2.name.includes(searchQuery) ||
      match.stadium.includes(searchQuery)
    );

  // Group matches by date
  const groupedMatches: Record<string, typeof matches> = {};
  
  filteredMatches.forEach(match => {
    if (!groupedMatches[match.date]) {
      groupedMatches[match.date] = [];
    }
    groupedMatches[match.date].push(match);
  });

  // Sort dates
  const sortedDates = Object.keys(groupedMatches).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SuperadminLayout title="إدارة جدول المباريات">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="text-quattro-red" size={28} />
            <h2 className="text-2xl font-bold">إدارة جدول المباريات</h2>
          </div>
          <Button className="bg-quattro-red hover:bg-red-700">
            <Plus className="ml-2" size={18} />
            إضافة مباراة جديدة
          </Button>
        </div>
        <p className="text-gray-600 mt-2">
          قم بإدارة وتنظيم جدول مباريات البطولة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث عن مباراة..."
            className="pl-3 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر الفئة العمرية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفئات</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="حالة المباراة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المباريات</SelectItem>
            <SelectItem value="upcoming">المباريات القادمة</SelectItem>
            <SelectItem value="completed">المباريات المنتهية</SelectItem>
            <SelectItem value="live">المباريات الجارية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Matches Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="data-[state=active]:bg-quattro-red data-[state=active]:text-white">عرض القائمة</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-quattro-red data-[state=active]:text-white">عرض التقويم</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {sortedDates.length > 0 ? (
              sortedDates.map(date => (
                <div key={date} className="mb-6">
                  <h3 className="text-xl font-bold mb-4 bg-gray-50 p-2 rounded-md">
                    {formatDate(date)}
                  </h3>
                  <div className="space-y-4">
                    {groupedMatches[date].map(match => (
                      <Card key={match.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-medium">{match.team1.name}</div>
                              <div className="text-center px-4">
                                <div className="text-xl font-bold">
                                  {match.score ? `${match.score.team1} - ${match.score.team2}` : "VS"}
                                </div>
                                <div className="text-sm text-gray-500">{match.time}</div>
                              </div>
                              <div className="text-lg font-medium">{match.team2.name}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mr-4">
                            <Button variant="outline" size="sm">تعديل</Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-white hover:bg-red-600">حذف</Button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="ml-3">{match.category}</span>
                          <span>{match.stadium}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">لا توجد مباريات متطابقة مع معايير البحث</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-500">سيتم تطوير عرض التقويم قريباً</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperadminLayout>
  );
};

export default MatchesManagement;
