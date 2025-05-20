
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperadminLayout from "@/components/SuperadminLayout";
import { teamRankings } from "@/data";

const categories = Object.keys(teamRankings);

const TeamRankings = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <SuperadminLayout title="ترتيب الفرق">
      <Card className="shadow-md">
        <CardHeader className="bg-quattro-red text-white">
          <CardTitle className="text-center text-xl">ترتيب الفرق المشاركة</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} dir="rtl">
            <TabsList className="w-full mb-6 p-1 bg-gray-100">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-sm px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="pt-4">
                <div className="relative overflow-x-auto rounded-lg border">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-center">#</th>
                        <th scope="col" className="px-4 py-3">الفريق</th>
                        <th scope="col" className="px-4 py-3 text-center">لعب</th>
                        <th scope="col" className="px-4 py-3 text-center">فوز</th>
                        <th scope="col" className="px-4 py-3 text-center">تعادل</th>
                        <th scope="col" className="px-4 py-3 text-center">خسارة</th>
                        <th scope="col" className="px-4 py-3 text-center">له</th>
                        <th scope="col" className="px-4 py-3 text-center">عليه</th>
                        <th scope="col" className="px-4 py-3 text-center">+/-</th>
                        <th scope="col" className="px-4 py-3 text-center">نقاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamRankings[category].map((team) => (
                        <tr key={team.id} className="border-b bg-white hover:bg-gray-50">
                          <td className="px-4 py-3 text-center">{team.rank}</td>
                          <td className="px-4 py-3 font-medium">{team.teamName}</td>
                          <td className="px-4 py-3 text-center">{team.gamesPlayed}</td>
                          <td className="px-4 py-3 text-center">{team.wins}</td>
                          <td className="px-4 py-3 text-center">{team.draws}</td>
                          <td className="px-4 py-3 text-center">{team.losses}</td>
                          <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                          <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                          <td className="px-4 py-3 text-center">{team.goalDifference}</td>
                          <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </SuperadminLayout>
  );
};

export default TeamRankings;
