import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PlusCircle, FileEdit, Eye } from "lucide-react";
import { matches, academies } from "@/data";

const MatchesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredMatches, setFilteredMatches] = useState(matches);

  // Get unique categories
  const categories = [...new Set(matches.map((match) => match.category))];

  useEffect(() => {
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
  }, [searchTerm, selectedCategory, selectedStatus]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  return (
    <SuperadminLayout title="إدارة المباريات">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">قائمة المباريات</h2>
        <Button variant="default" className="bg-quattro-blue hover:bg-quattro-blue/90">
          <PlusCircle className="ml-2 h-5 w-5" />
          إضافة مباراة جديدة
        </Button>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <Input
              className="pl-3 pr-10"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
                        <Link to={`/superadmin/match-report/${match.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-5 w-5" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-5 w-5" />
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
    </SuperadminLayout>
  );
};

export default MatchesManagement;
