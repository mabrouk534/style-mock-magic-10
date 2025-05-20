
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tournamentProgram } from "@/data";
import SuperadminLayout from "@/components/SuperadminLayout";

const TournamentProgram = () => {
  const [activeDay, setActiveDay] = useState(tournamentProgram[0]?.id || "1");

  return (
    <SuperadminLayout title="برنامج المعسكر">
      <Card className="shadow-md">
        <CardHeader className="bg-quattro-red text-white">
          <CardTitle className="text-center text-xl">برنامج معسكر أكاديمية أويله لكرة القدم - مملكة البحرين</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue={activeDay} onValueChange={setActiveDay} dir="rtl">
            <TabsList className="w-full overflow-x-auto flex flex-nowrap mb-6 p-1 bg-gray-100">
              {tournamentProgram.map((day) => (
                <TabsTrigger
                  key={day.id}
                  value={day.id}
                  className="text-sm px-4 py-2 whitespace-nowrap"
                >
                  {format(parseISO(day.date), 'EEEE d MMMM', { locale: ar })}
                </TabsTrigger>
              ))}
            </TabsList>

            {tournamentProgram.map((day) => (
              <TabsContent key={day.id} value={day.id} className="pt-4">
                <h2 className="text-lg font-bold text-center mb-6">
                  {format(parseISO(day.date), 'EEEE d MMMM yyyy', { locale: ar })}
                </h2>

                <div className="relative overflow-x-auto rounded-md shadow-sm">
                  <table className="w-full text-right text-gray-700">
                    <thead className="bg-gray-50 text-sm text-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">الوقت</th>
                        <th scope="col" className="px-6 py-3">النشاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.activities.map((activity, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium">{activity.time}</td>
                          <td className="px-6 py-4">{activity.description}</td>
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

export default TournamentProgram;
