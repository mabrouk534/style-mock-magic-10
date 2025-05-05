
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { StandingsTable } from '@/components/StandingsTable';
import { standings } from '@/data/mockData';
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Standings = () => {
  // Get unique categories from standings
  const categories = [...new Set(standings.map(team => team.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">جدول الترتيب</h1>
        
        <Tabs defaultValue={categories[0]} className="mb-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-quattro-blue data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader className="bg-quattro-blue text-white py-2 px-4">
                  <h2 className="text-xl font-bold text-center">{category}</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <StandingsTable standings={standings} category={category} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Standings;
