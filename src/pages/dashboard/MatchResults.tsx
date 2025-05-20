
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { matchResults } from "@/data/tournamentResults";
import { Trophy } from "lucide-react";

const MatchResults = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Get unique categories
  const categories = [...new Set(matchResults.map(match => match.category))];

  // Filter results by category
  const filteredResults = selectedCategory === 'all' 
    ? matchResults 
    : matchResults.filter(match => match.category === selectedCategory);

  return (
    <DashboardLayout title="نتائج المباريات">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-quattro-red" size={28} />
          <h2 className="text-2xl font-bold">نتائج المباريات</h2>
        </div>
        <p className="text-gray-600 mt-2">
          عرض نتائج مباريات البطولة المكتملة
        </p>
      </div>
      
      <div className="mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="تصفية حسب الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفئات</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={index} value={String(category)}>
                {String(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 pb-3">
          <CardTitle className="text-lg">نتائج المباريات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
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
              {filteredResults.length > 0 ? (
                filteredResults.map((match) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    لا توجد نتائج للفئة المحددة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MatchResults;
