
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { matchResults } from "@/data";
import SuperadminLayout from "@/components/SuperadminLayout";

// Group matches by date
const groupedMatches = matchResults.reduce((acc, match) => {
  if (!acc[match.date]) {
    acc[match.date] = [];
  }
  acc[match.date].push(match);
  return acc;
}, {} as Record<string, typeof matchResults>);

// Get unique dates
const dates = Object.keys(groupedMatches).sort();

const MatchResults = () => {
  const [activeDate, setActiveDate] = useState(dates[0] || "");

  return (
    <SuperadminLayout title="نتائج المباريات">
      <Card className="shadow-md">
        <CardHeader className="bg-quattro-red text-white">
          <CardTitle className="text-center text-xl">جدول ونتائج المباريات</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue={activeDate} onValueChange={setActiveDate} dir="rtl">
            <TabsList className="w-full overflow-x-auto flex flex-nowrap mb-6 p-1 bg-gray-100">
              {dates.map((date) => (
                <TabsTrigger
                  key={date}
                  value={date}
                  className="text-sm px-4 py-2 whitespace-nowrap"
                >
                  {format(parseISO(date), 'EEEE d MMMM', { locale: ar })}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {dates.map((date) => (
              <TabsContent key={date} value={date} className="pt-4">
                <h2 className="text-lg font-bold text-center mb-6">
                  {format(parseISO(date), 'EEEE d MMMM yyyy', { locale: ar })}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {groupedMatches[date].map((match) => (
                    <Card key={match.id} className="overflow-hidden">
                      <div className="p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-quattro-red">{match.category}</Badge>
                          <div className="text-sm text-gray-500">{match.time}</div>
                        </div>
                        <div className="text-sm">{match.venue}</div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-right font-medium">{match.homeTeam}</div>
                          <div className="text-2xl font-bold mx-4">
                            {match.homeScore} - {match.awayScore}
                          </div>
                          <div className="text-left font-medium">{match.awayTeam}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </SuperadminLayout>
  );
};

export default MatchResults;
