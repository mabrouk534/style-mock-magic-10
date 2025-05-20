import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Match } from "@/types/tournament";
import { matches, academies, players, matchEvents, matchStats, matchLineups, matchReferees } from "@/data";
import { Separator } from "@/components/ui/separator";

const MatchReport = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch match details
    setTimeout(() => {
      if (matchId) {
        const foundMatch = matches.find(m => m.id === matchId);
        if (foundMatch) {
          setMatch(foundMatch);
        }
      }
      setLoading(false);
    }, 500);
  }, [matchId]);
  
  if (loading) {
    return (
      <SuperadminLayout title="تقرير المباراة">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">جاري تحميل بيانات المباراة...</div>
        </div>
      </SuperadminLayout>
    );
  }
  
  if (!match) {
    return (
      <SuperadminLayout title="تقرير المباراة">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-600">لم يتم العثور على المباراة</div>
        </div>
      </SuperadminLayout>
    );
  }
  
  const homeTeam = academies.find(a => a.id === match.homeTeam);
  const awayTeam = academies.find(a => a.id === match.awayTeam);
  const events = matchEvents[matchId as keyof typeof matchEvents] || [];
  const stats = matchStats[matchId as keyof typeof matchStats] || {
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 }
  };
  
  const lineups = matchLineups[matchId as keyof typeof matchLineups] || { home: [], away: [] };
  const referee = matchReferees[matchId as keyof typeof matchReferees];
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "scheduled": return "قادمة";
      case "inProgress": return "جارية";
      case "completed": return "منتهية";
      default: return status;
    }
  };
  
  const getPlayerName = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : "لاعب غير معروف";
  };

  return (
    <SuperadminLayout title="تقرير المباراة">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">تقرير المباراة</h1>
        <p className="text-gray-600">بيانات وإحصائيات المباراة</p>
      </div>
      
      {/* Match Overview Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>معلومات المباراة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-bold">{homeTeam?.name}</div>
              <div className="text-sm text-gray-500">المستضيف</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold">
                {match.homeScore !== null && match.awayScore !== null 
                  ? `${match.homeScore} - ${match.awayScore}` 
                  : "لم تبدأ"}
              </div>
              <div className="mt-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs inline-block">
                {formatStatus(match.status)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold">{awayTeam?.name}</div>
              <div className="text-sm text-gray-500">الضيف</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p><span className="font-semibold">التاريخ:</span> {match.date}</p>
              <p><span className="font-semibold">الوقت:</span> {match.time}</p>
            </div>
            <div>
              <p><span className="font-semibold">الملعب:</span> {match.venue}</p>
              <p><span className="font-semibold">الفئة:</span> {match.category}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Match Statistics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>إحصائيات المباراة</CardTitle>
        </CardHeader>
        <CardContent>
          {match.status !== "scheduled" ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.possession.home}%</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${stats.possession.home}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.possession.away}%</div>
                <div className="w-24 text-center">الاستحواذ</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.shots.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(stats.shots.home / (stats.shots.home + stats.shots.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.shots.away}</div>
                <div className="w-24 text-center">التسديدات</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.shotsOnTarget.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(stats.shotsOnTarget.home / (stats.shotsOnTarget.home + stats.shotsOnTarget.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.shotsOnTarget.away}</div>
                <div className="w-24 text-center">التسديدات على المرمى</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.corners.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(stats.corners.home / (stats.corners.home + stats.corners.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.corners.away}</div>
                <div className="w-24 text-center">الركنيات</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.fouls.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(stats.fouls.home / (stats.fouls.home + stats.fouls.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.fouls.away}</div>
                <div className="w-24 text-center">الأخطاء</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.yellowCards.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400" 
                      style={{ width: `${(stats.yellowCards.home / (stats.yellowCards.home + stats.yellowCards.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.yellowCards.away}</div>
                <div className="w-24 text-center">البطاقات الصفراء</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">{stats.redCards.home}</div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${(stats.redCards.home / (stats.redCards.home + stats.redCards.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">{stats.redCards.away}</div>
                <div className="w-24 text-center">البطاقات الحمراء</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              لم تبدأ المباراة بعد، لا توجد إحصائيات متاحة.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Match Events */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>أحداث المباراة</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الدقيقة</TableHead>
                  <TableHead>اللاعب</TableHead>
                  <TableHead>الفريق</TableHead>
                  <TableHead>الحدث</TableHead>
                  <TableHead>التفاصيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event, index) => {
                  const eventTeam = academies.find(a => a.id === event.team);
                  return (
                    <TableRow key={index}>
                      <TableCell>{event.time}'</TableCell>
                      <TableCell>{getPlayerName(event.player)}</TableCell>
                      <TableCell>{eventTeam?.name}</TableCell>
                      <TableCell>
                        {event.type === "goal" && "هدف"}
                        {event.type === "yellowCard" && "بطاقة صفراء"}
                        {event.type === "redCard" && "بطاقة حمراء"}
                      </TableCell>
                      <TableCell>{event.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              لا توجد أحداث مسجلة لهذه المباراة.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Lineups */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>تشكيلة الفريقين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team Lineup */}
            <div>
              <h3 className="text-lg font-bold mb-2">{homeTeam?.name}</h3>
              {lineups.home.length > 0 ? (
                <ul className="space-y-1">
                  {lineups.home.map(playerId => (
                    <li key={playerId} className="p-2 bg-gray-50 rounded">
                      {getPlayerName(playerId)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">لا توجد بيانات عن التشكيلة</div>
              )}
            </div>
            
            {/* Away Team Lineup */}
            <div>
              <h3 className="text-lg font-bold mb-2">{awayTeam?.name}</h3>
              {lineups.away.length > 0 ? (
                <ul className="space-y-1">
                  {lineups.away.map(playerId => (
                    <li key={playerId} className="p-2 bg-gray-50 rounded">
                      {getPlayerName(playerId)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">لا توجد بيانات عن التشكيلة</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Match Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>جدول تقرير المباراة الرسمي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">م</th>
                  <th className="border border-gray-300 p-2">اسم اللاعب</th>
                  <th className="border border-gray-300 p-2">الفريق</th>
                  <th className="border border-gray-300 p-2">الأهداف</th>
                  <th className="border border-gray-300 p-2">البطاقات الصفراء</th>
                  <th className="border border-gray-300 p-2">البطاقات الحمراء</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .filter(player => 
                    lineups.home.includes(player.id) || lineups.away.includes(player.id)
                  )
                  .map((player, index) => {
                    // Count goals and cards from events
                    const playerGoals = events.filter(e => e.player === player.id && e.type === "goal").length;
                    const playerYellowCards = events.filter(e => e.player === player.id && e.type === "yellowCard").length;
                    const playerRedCards = events.filter(e => e.player === player.id && e.type === "redCard").length;
                    
                    return (
                      <tr key={player.id}>
                        <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{player.name}</td>
                        <td className="border border-gray-300 p-2">
                          {academies.find(a => a.id === player.academy)?.name}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">{playerGoals}</td>
                        <td className="border border-gray-300 p-2 text-center">{playerYellowCards}</td>
                        <td className="border border-gray-300 p-2 text-center">{playerRedCards}</td>
                      </tr>
                    );
                  })}
                {(lineups.home.length === 0 && lineups.away.length === 0) && (
                  <tr>
                    <td colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                      لا توجد بيانات للاعبين في هذه المباراة
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={6} className="border border-gray-300 p-2 text-center font-bold">
                    تقرير حكم المباراة
                  </td>
                </tr>
              </tfoot>
            </table>
            
            {/* Referee Report Table */}
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/4 bg-gray-100 font-bold">الحكم</td>
                  <td className="border border-gray-300 p-2">{referee?.main || "غير محدد"}</td>
                  <td className="border border-gray-300 p-2 w-1/4 bg-gray-100 font-bold">التوقيع</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم المساعد الأول</td>
                  <td className="border border-gray-300 p-2">{referee?.assistant1 || "غير محدد"}</td>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم المساعد الثاني</td>
                  <td className="border border-gray-300 p-2">{referee?.assistant2 || "غير محدد"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم الرابع</td>
                  <td className="border border-gray-300 p-2">{referee?.fourth || "غير محدد"}</td>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">حكم الفار</td>
                  <td className="border border-gray-300 p-2">{referee?.var || "غير محدد"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/4 bg-gray-100 font-bold">الملاحظات</td>
                  <td className="border border-gray-300 p-2" colSpan={3}>
                    {match.status === "completed" ? referee?.comments || "لا توجد ملاحظات" : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </SuperadminLayout>
  );
};

export default MatchReport;
