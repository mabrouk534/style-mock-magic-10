
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, Eye, CalendarIcon } from "lucide-react";
import { matches, academies, tournamentProgram } from "@/data";
import { matchResults } from "@/data/tournamentResults";

const MatchSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Get unique categories
  const categories = [...new Set(matches.map((match) => match.category))];
  
  // Get unique dates for tournament program
  const programDates = [...new Set(tournamentProgram.map(day => day.date))];

  // Apply filters
  const handleFilters = () => {
    // Apply filters
    let filtered = matches;

    if (searchTerm) {
      filtered = filtered.filter((match) => {
        const homeTeam = academies.find((academy) => academy.id === match.homeTeam);
        const awayTeam = academies.find((academy) => academy.id === match.awayTeam);
        return (
          homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((match) => match.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((match) => match.status === selectedStatus);
    }

    setFilteredMatches(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setFilteredMatches(matches);
  };

  // Find tournament program for the selected date
  const selectedProgram = selectedDate 
    ? tournamentProgram.find(day => day.date === selectedDate)
    : null;
  
  return (
    <DashboardLayout title="جدول المباريات">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">قائمة المباريات</h2>
      </div>

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="matches">المباريات</TabsTrigger>
          <TabsTrigger value="program">برنامج المعسكر</TabsTrigger>
          <TabsTrigger value="results">نتائج المباريات</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <Input
                  className="pl-3 pr-10"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilters();
                  }}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                handleFilters();
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={`category-${index}`} value={String(category)}>
                      {String(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={(value) => {
                setSelectedStatus(value);
                handleFilters();
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="scheduled">قادمة</SelectItem>
                  <SelectItem value="inProgress">جارية</SelectItem>
                  <SelectItem value="completed">منتهية</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-quattro-gray hover:bg-quattro-gray/90 text-black" onClick={resetFilters}>
                إعادة تعيين التصفية
              </Button>
            </div>
          </div>
          
          {/* Matches Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الوقت</TableHead>
                  <TableHead>الفريق المستضيف</TableHead>
                  <TableHead>الفريق الضيف</TableHead>
                  <TableHead>النتيجة</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.length > 0 ? (
                  filteredMatches.map(match => {
                    const homeTeam = academies.find(academy => academy.id === match.homeTeam);
                    const awayTeam = academies.find(academy => academy.id === match.awayTeam);
                    return (
                      <TableRow key={match.id}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.time}</TableCell>
                        <TableCell>{homeTeam?.name}</TableCell>
                        <TableCell>{awayTeam?.name}</TableCell>
                        <TableCell>
                          {match.status === "completed" ? 
                            `${match.homeScore} - ${match.awayScore}` : 
                            "—"
                          }
                        </TableCell>
                        <TableCell>{match.category}</TableCell>
                        <TableCell>
                          <div className={`px-2 py-1 rounded-full text-center text-xs ${
                            match.status === "completed" ? "bg-green-100 text-green-800" : 
                            match.status === "inProgress" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {match.status === "completed" ? "منتهية" : 
                             match.status === "inProgress" ? "جارية" : "قادمة"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-s-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-5 w-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      لا توجد مباريات مطابقة للمعايير المحددة
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="program">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="ml-2" />
                  برنامج معسكر أكاديمية أويله لكرة القدم - مملكة البحرين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="programDate">اختر اليوم</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر تاريخ البرنامج" />
                    </SelectTrigger>
                    <SelectContent>
                      {programDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {format(parseISO(date), 'EEEE d MMMM', { locale: ar })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProgram ? (
                  <div>
                    <h3 className="text-xl font-bold mb-4">{selectedProgram.title}</h3>
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الوقت</TableHead>
                            <TableHead>النشاط</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProgram.activities.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{activity.time}</TableCell>
                              <TableCell>{activity.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    يرجى اختيار تاريخ لعرض برنامج البطولة
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  نتائج المباريات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الفريق المستضيف</TableHead>
                        <TableHead>النتيجة</TableHead>
                        <TableHead>الفريق الضيف</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>الملعب</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matchResults.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>{match.homeTeam}</TableCell>
                          <TableCell className="font-bold">
                            {match.homeScore} - {match.awayScore}
                          </TableCell>
                          <TableCell>{match.awayTeam}</TableCell>
                          <TableCell>{match.category}</TableCell>
                          <TableCell>{match.venue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MatchSchedule;
