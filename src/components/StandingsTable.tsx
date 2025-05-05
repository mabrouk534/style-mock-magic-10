
import { Team } from '@/types/tournament';
import { academies } from '@/data/mockData';

interface StandingsTableProps {
  standings: Team[];
  category: string;
}

export const StandingsTable = ({ standings, category }: StandingsTableProps) => {
  // Filter standings by category and sort by points, then goal difference
  const filteredStandings = standings
    .filter(team => team.category === category)
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      const aGoalDiff = a.goalsFor - a.goalsAgainst;
      const bGoalDiff = b.goalsFor - b.goalsAgainst;
      if (bGoalDiff !== aGoalDiff) {
        return bGoalDiff - aGoalDiff;
      }
      return b.goalsFor - a.goalsFor;
    });

  const getTeamName = (id: string) => {
    const academy = academies.find(a => a.id === id);
    return academy ? academy.name : 'غير معروف';
  };

  return (
    <div className="overflow-x-auto">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th className="text-right">الفريق</th>
            <th>لعب</th>
            <th>فاز</th>
            <th>تعادل</th>
            <th>خسر</th>
            <th>له</th>
            <th>عليه</th>
            <th>الفارق</th>
            <th>النقاط</th>
          </tr>
        </thead>
        <tbody>
          {filteredStandings.map((team, index) => (
            <tr key={team.academyId} className="hover:bg-gray-50">
              <td className="text-center font-bold">{index + 1}</td>
              <td className="text-right">{getTeamName(team.academyId)}</td>
              <td className="text-center">{team.gamesPlayed}</td>
              <td className="text-center">{team.wins}</td>
              <td className="text-center">{team.draws}</td>
              <td className="text-center">{team.losses}</td>
              <td className="text-center">{team.goalsFor}</td>
              <td className="text-center">{team.goalsAgainst}</td>
              <td className="text-center">{team.goalsFor - team.goalsAgainst}</td>
              <td className="text-center font-bold">{team.points}</td>
            </tr>
          ))}
          {filteredStandings.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center py-4">لا توجد بيانات متاحة لهذه الفئة</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
