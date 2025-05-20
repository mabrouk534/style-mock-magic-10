import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Match } from "@/types/tournament";
import { matches, academies, players, matchEvents, matchStats, matchLineups, matchReferees } from "@/data";
import { Separator } from "@/components/ui/separator";
import { Edit, Plus, Save, Trash2 } from "lucide-react";

const MatchReport = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvents, setEditedEvents] = useState<any[]>([]);
  const [editedStats, setEditedStats] = useState<any>({});
  const [editedLineups, setEditedLineups] = useState<any>({});
  const [editedReferee, setEditedReferee] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    time: "",
    player: "",
    team: "",
    type: "goal",
    description: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to fetch match details
    setTimeout(() => {
      if (matchId) {
        const foundMatch = matches.find(m => m.id === matchId);
        if (foundMatch) {
          setMatch(foundMatch);
          
          // Initialize edited states with original data
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
          const referee = matchReferees[matchId as keyof typeof matchReferees] || {};
          
          setEditedEvents([...events]);
          setEditedStats({...stats});
          setEditedLineups({...lineups});
          setEditedReferee({...referee});
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
  
  const handleEditMode = () => {
    setIsEditing(true);
  };
  
  const handleSaveChanges = () => {
    // In a real app, this would send data to the server
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث بيانات المباراة بنجاح"
    });
    setIsEditing(false);
  };
  
  const handleStatChange = (statName: string, team: 'home' | 'away', value: string) => {
    const numValue = parseInt(value) || 0;
    setEditedStats((prev: any) => ({
      ...prev,
      [statName]: {
        ...prev[statName],
        [team]: numValue
      }
    }));
  };
  
  const handleEventChange = (index: number, field: string, value: string) => {
    setEditedEvents((prev: any) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };
  
  const handleDeleteEvent = (index: number) => {
    setEditedEvents((prev: any) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };
  
  const handleAddEvent = () => {
    if (newEvent.time && newEvent.player && newEvent.team && newEvent.type) {
      setEditedEvents((prev: any) => [...prev, { ...newEvent }]);
      setNewEvent({
        time: "",
        player: "",
        team: "",
        type: "goal",
        description: ""
      });
      setDialogOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة"
      });
    }
  };
  
  const handleRefereeChange = (field: string, value: string) => {
    setEditedReferee((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SuperadminLayout title="تقرير المباراة">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">تقرير المباراة</h1>
          <p className="text-gray-600">بيانات وإحصائيات المباراة</p>
        </div>
        
        {!isEditing ? (
          <Button onClick={handleEditMode} className="flex items-center gap-2">
            <Edit size={16} />
            <span>تحرير التقرير</span>
          </Button>
        ) : (
          <Button onClick={handleSaveChanges} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Save size={16} />
            <span>حفظ التغييرات</span>
          </Button>
        )}
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
              {/* Possession */}
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      className="w-16" 
                      value={editedStats.possession?.home || "0"} 
                      onChange={(e) => handleStatChange('possession', 'home', e.target.value)} 
                    />
                  ) : (
                    `${editedStats.possession?.home || 0}%`
                  )}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${editedStats.possession?.home || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      className="w-16" 
                      value={editedStats.possession?.away || "0"} 
                      onChange={(e) => handleStatChange('possession', 'away', e.target.value)} 
                    />
                  ) : (
                    `${editedStats.possession?.away || 0}%`
                  )}
                </div>
                <div className="w-24 text-center">الاستحواذ</div>
              </div>
              
              {/* Shots */}
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.shots?.home || "0"} 
                      onChange={(e) => handleStatChange('shots', 'home', e.target.value)} 
                    />
                  ) : editedStats.shots?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(editedStats.shots?.home / (editedStats.shots?.home + editedStats.shots?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.shots?.away || "0"} 
                      onChange={(e) => handleStatChange('shots', 'away', e.target.value)} 
                    />
                  ) : editedStats.shots?.away || 0}
                </div>
                <div className="w-24 text-center">التسديدات</div>
              </div>
              
              {/* Shots on Target */}
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.shotsOnTarget?.home || "0"} 
                      onChange={(e) => handleStatChange('shotsOnTarget', 'home', e.target.value)} 
                    />
                  ) : editedStats.shotsOnTarget?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(editedStats.shotsOnTarget?.home / (editedStats.shotsOnTarget?.home + editedStats.shotsOnTarget?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.shotsOnTarget?.away || "0"} 
                      onChange={(e) => handleStatChange('shotsOnTarget', 'away', e.target.value)} 
                    />
                  ) : editedStats.shotsOnTarget?.away || 0}
                </div>
                <div className="w-24 text-center">التسديدات على المرمى</div>
              </div>
              
              {/* Other stats follow same pattern */}
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.corners?.home || "0"} 
                      onChange={(e) => handleStatChange('corners', 'home', e.target.value)} 
                    />
                  ) : editedStats.corners?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(editedStats.corners?.home / (editedStats.corners?.home + editedStats.corners?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.corners?.away || "0"} 
                      onChange={(e) => handleStatChange('corners', 'away', e.target.value)} 
                    />
                  ) : editedStats.corners?.away || 0}
                </div>
                <div className="w-24 text-center">الركنيات</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.fouls?.home || "0"} 
                      onChange={(e) => handleStatChange('fouls', 'home', e.target.value)} 
                    />
                  ) : editedStats.fouls?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quattro-red" 
                      style={{ width: `${(editedStats.fouls?.home / (editedStats.fouls?.home + editedStats.fouls?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.fouls?.away || "0"} 
                      onChange={(e) => handleStatChange('fouls', 'away', e.target.value)} 
                    />
                  ) : editedStats.fouls?.away || 0}
                </div>
                <div className="w-24 text-center">الأخطاء</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.yellowCards?.home || "0"} 
                      onChange={(e) => handleStatChange('yellowCards', 'home', e.target.value)} 
                    />
                  ) : editedStats.yellowCards?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400" 
                      style={{ width: `${(editedStats.yellowCards?.home / (editedStats.yellowCards?.home + editedStats.yellowCards?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.yellowCards?.away || "0"} 
                      onChange={(e) => handleStatChange('yellowCards', 'away', e.target.value)} 
                    />
                  ) : editedStats.yellowCards?.away || 0}
                </div>
                <div className="w-24 text-center">البطاقات الصفراء</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 text-right">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.redCards?.home || "0"} 
                      onChange={(e) => handleStatChange('redCards', 'home', e.target.value)} 
                    />
                  ) : editedStats.redCards?.home || 0}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${(editedStats.redCards?.home / (editedStats.redCards?.home + editedStats.redCards?.away || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16">
                  {isEditing ? (
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-16" 
                      value={editedStats.redCards?.away || "0"} 
                      onChange={(e) => handleStatChange('redCards', 'away', e.target.value)} 
                    />
                  ) : editedStats.redCards?.away || 0}
                </div>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>أحداث المباراة</CardTitle>
          {isEditing && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus size={16} /> إضافة حدث
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة حدث جديد</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-3">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="eventTime">الدقيقة</Label>
                    <Input
                      id="eventTime"
                      type="number"
                      min="0"
                      max="120"
                      className="col-span-2"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="eventType">نوع الحدث</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="goal">هدف</SelectItem>
                        <SelectItem value="yellowCard">بطاقة صفراء</SelectItem>
                        <SelectItem value="redCard">بطاقة حمراء</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="eventTeam">الفريق</Label>
                    <Select
                      value={newEvent.team}
                      onValueChange={(value) => setNewEvent({...newEvent, team: value})}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="اختر الفريق" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={match.homeTeam}>{homeTeam?.name}</SelectItem>
                        <SelectItem value={match.awayTeam}>{awayTeam?.name}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="eventPlayer">اللاعب</Label>
                    <Select
                      value={newEvent.player}
                      onValueChange={(value) => setNewEvent({...newEvent, player: value})}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="اختر اللاعب" />
                      </SelectTrigger>
                      <SelectContent>
                        {players
                          .filter(p => p.academy === newEvent.team)
                          .map(player => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="eventDescription">تفاصيل</Label>
                    <Input
                      id="eventDescription"
                      className="col-span-2"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEvent}>إضافة</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          {editedEvents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الدقيقة</TableHead>
                  <TableHead>اللاعب</TableHead>
                  <TableHead>الفريق</TableHead>
                  <TableHead>الحدث</TableHead>
                  <TableHead>التفاصيل</TableHead>
                  {isEditing && <TableHead>إجراءات</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {editedEvents.map((event, index) => {
                  const eventTeam = academies.find(a => a.id === event.team);
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {isEditing ? (
                          <Input 
                            type="number" 
                            min="0" 
                            max="120" 
                            className="w-16" 
                            value={event.time} 
                            onChange={(e) => handleEventChange(index, 'time', e.target.value)} 
                          />
                        ) : `${event.time}'`}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={event.player}
                            onValueChange={(value) => handleEventChange(index, 'player', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue>{getPlayerName(event.player)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {players
                                .filter(p => p.academy === event.team)
                                .map(player => (
                                  <SelectItem key={player.id} value={player.id}>
                                    {player.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        ) : getPlayerName(event.player)}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={event.team}
                            onValueChange={(value) => handleEventChange(index, 'team', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue>{eventTeam?.name}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={match.homeTeam}>{homeTeam?.name}</SelectItem>
                              <SelectItem value={match.awayTeam}>{awayTeam?.name}</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : eventTeam?.name}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={event.type}
                            onValueChange={(value) => handleEventChange(index, 'type', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {event.type === "goal" && "هدف"}
                                {event.type === "yellowCard" && "بطاقة صفراء"}
                                {event.type === "redCard" && "بطاقة حمراء"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="goal">هدف</SelectItem>
                              <SelectItem value="yellowCard">بطاقة صفراء</SelectItem>
                              <SelectItem value="redCard">بطاقة حمراء</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <>
                            {event.type === "goal" && "هدف"}
                            {event.type === "yellowCard" && "بطاقة صفراء"}
                            {event.type === "redCard" && "بطاقة حمراء"}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input 
                            value={event.description} 
                            onChange={(e) => handleEventChange(index, 'description', e.target.value)} 
                          />
                        ) : event.description}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      )}
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

      {/* Team Lineups - Kept simple for readability */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>تشكيلة الفريقين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team Lineup */}
            <div>
              <h3 className="text-lg font-bold mb-2">{homeTeam?.name}</h3>
              {/* Lineups editing would be here, keeping it simpler for now */}
              <ul className="space-y-1">
                {editedLineups.home?.length > 0 ? (
                  editedLineups.home.map((playerId: string) => (
                    <li key={playerId} className="p-2 bg-gray-50 rounded">
                      {getPlayerName(playerId)}
                    </li>
                  ))
                ) : (
                  <div className="text-gray-500">لا توجد بيانات عن التشكيلة</div>
                )}
              </ul>
            </div>
            
            {/* Away Team Lineup */}
            <div>
              <h3 className="text-lg font-bold mb-2">{awayTeam?.name}</h3>
              <ul className="space-y-1">
                {editedLineups.away?.length > 0 ? (
                  editedLineups.away.map((playerId: string) => (
                    <li key={playerId} className="p-2 bg-gray-50 rounded">
                      {getPlayerName(playerId)}
                    </li>
                  ))
                ) : (
                  <div className="text-gray-500">لا توجد بيانات عن التشكيلة</div>
                )}
              </ul>
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
                  <td className="border border-gray-300 p-2">
                    {isEditing ? (
                      <Input value={editedReferee.main || ""} onChange={(e) => handleRefereeChange('main', e.target.value)} />
                    ) : (editedReferee.main || "غير محدد")}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/4 bg-gray-100 font-bold">التوقيع</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم المساعد الأول</td>
                  <td className="border border-gray-300 p-2">
                    {isEditing ? (
                      <Input value={editedReferee.assistant1 || ""} onChange={(e) => handleRefereeChange('assistant1', e.target.value)} />
                    ) : (editedReferee.assistant1 || "غير محدد")}
                  </td>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم المساعد الثاني</td>
                  <td className="border border-gray-300 p-2">
                    {isEditing ? (
                      <Input value={editedReferee.assistant2 || ""} onChange={(e) => handleRefereeChange('assistant2', e.target.value)} />
                    ) : (editedReferee.assistant2 || "غير محدد")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">الحكم الرابع</td>
                  <td className="border border-gray-300 p-2">
                    {isEditing ? (
                      <Input value={editedReferee.fourth || ""} onChange={(e) => handleRefereeChange('fourth', e.target.value)} />
                    ) : (editedReferee.fourth || "غير محدد")}
                  </td>
                  <td className="border border-gray-300 p-2 bg-gray-100 font-bold">حكم الفار</td>
                  <td className="border border-gray-300 p-2">
                    {isEditing ? (
                      <Input value={editedReferee.var || ""} onChange={(e) => handleRefereeChange('var', e.target.value)} />
                    ) : (editedReferee.var || "غير محدد")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/4 bg-gray-100 font-bold">الملاحظات</td>
                  <td className="border border-gray-300 p-2" colSpan={3}>
                    {isEditing ? (
                      <Textarea 
                        value={editedReferee.comments || ""} 
                        onChange={(e) => handleRefereeChange('comments', e.target.value)} 
                        className="min-h-[100px]"
                      />
                    ) : (match.status === "completed" ? editedReferee.comments || "لا توجد ملاحظات" : "")}
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
