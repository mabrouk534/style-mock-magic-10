
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award } from "lucide-react";
import { teamRankings } from "@/data";

const TeamRankings = () => {
  // Get categories from the teamRankings object keys
  const categories = Object.keys(teamRankings);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  
  // Get teams for the selected category
  const rankingsForCategory = teamRankings[selectedCategory] || [];

  return (
    <DashboardLayout title="ترتيب الفرق">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Award className="text-quattro-red" size={28} />
          <h2 className="text-2xl font-bold">ترتيب الفرق</h2>
        </div>
        <p className="text-gray-600 mt-2">
          عرض ترتيب الفرق في البطولة حسب الفئة العمرية
        </p>
      </div>
      
      <div className="mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 pb-3">
          <CardTitle className="text-lg">ترتيب فرق {selectedCategory}</CardTitle>
          <CardDescription>
            الترتيب حتى تاريخ {new Date().toLocaleDateString('ar-AE')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">الترتيب</TableHead>
                <TableHead>الفريق</TableHead>
                <TableHead className="text-center">لعب</TableHead>
                <TableHead className="text-center">فاز</TableHead>
                <TableHead className="text-center">تعادل</TableHead>
                <TableHead className="text-center">خسر</TableHead>
                <TableHead className="text-center">له</TableHead>
                <TableHead className="text-center">عليه</TableHead>
                <TableHead className="text-center">+/-</TableHead>
                <TableHead className="text-center">نقاط</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingsForCategory.map((team) => (
                <TableRow key={team.id} className={team.rank <= 3 ? "bg-green-50" : ""}>
                  <TableCell className={team.rank <= 3 ? "font-bold" : ""}>
                    {team.rank}
                  </TableCell>
                  <TableCell className="font-medium">{team.teamName}</TableCell>
                  <TableCell className="text-center">{team.gamesPlayed}</TableCell>
                  <TableCell className="text-center">{team.wins}</TableCell>
                  <TableCell className="text-center">{team.draws}</TableCell>
                  <TableCell className="text-center">{team.losses}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center">{team.goalDifference}</TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeamRankings;
