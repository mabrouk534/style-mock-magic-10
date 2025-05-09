
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { MatchCard } from '@/components/MatchCard';
import { matches, academies } from '@/data/mockData';
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Matches = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">جدول المباريات</h1>
        
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
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="data-[state=active]:bg-quattro-red data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Matches by Date */}
        {sortedDates.length > 0 ? (
          sortedDates.map(date => (
            <div key={date} className="mb-8">
              <h2 className="text-xl font-bold mb-4 bg-quattro-gray p-2 rounded-md">
                {formatDate(date)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMatches[date].map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">لا توجد مباريات للفئة المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
