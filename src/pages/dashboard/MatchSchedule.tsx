
import { useState } from "react";
import { Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { MatchCard } from "@/components/MatchCard";
import { matches } from "@/data";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchSchedule = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get unique categories
  const categories = [...new Set(matches.map(match => match.category))];
  
  // Filter matches based on selected category
  const filteredMatches = selectedCategory === 'all' 
    ? matches 
    : matches.filter(match => match.category === selectedCategory);

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
    <DashboardLayout title="جدول المباريات">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-quattro-red" size={28} />
          <h2 className="text-2xl font-bold">جدول المباريات</h2>
        </div>
        <p className="text-gray-600 mt-2">
          تابع جميع مباريات الأكاديمية المقبلة والسابقة
        </p>
      </div>
      
      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger 
            value="all"
            onClick={() => setSelectedCategory('all')}
            className="data-[state=active]:bg-quattro-red data-[state=active]:text-white"
          >
            جميع الفئات
          </TabsTrigger>
          {categories.map((category, index) => (
            <TabsTrigger 
              key={`category-${index}`} 
              value={String(category)}
              onClick={() => setSelectedCategory(String(category))}
              className="data-[state=active]:bg-quattro-red data-[state=active]:text-white"
            >
              {String(category)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {/* Matches by Date */}
      {sortedDates.length > 0 ? (
        sortedDates.map((date, dateIndex) => (
          <div key={`date-${dateIndex}`} className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-quattro-gray p-2 rounded-md">
              {formatDate(date)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {groupedMatches[date].map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">لا توجد مباريات للفئة المحددة</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MatchSchedule;
