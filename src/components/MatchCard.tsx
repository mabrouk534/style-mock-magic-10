
import { Match } from '@/types/tournament';
import { academies } from '@/data';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const homeTeam = academies.find(academy => academy.id === match.homeTeam);
  const awayTeam = academies.find(academy => academy.id === match.awayTeam);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-quattro-blue text-white py-2 px-4 text-center">
        <h3 className="text-lg font-bold">{match.category}</h3>
        <p className="text-sm">{formatDate(match.date)} - {match.time}</p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-center w-1/3">
            <img 
              src={homeTeam?.logo} 
              alt={homeTeam?.name} 
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="font-bold">{homeTeam?.name}</p>
          </div>

          <div className="w-1/3 text-center">
            {match.status === 'completed' ? (
              <div className="bg-gray-100 rounded-lg py-2 px-4">
                <div className="text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-sm text-gray-500">انتهت</div>
              </div>
            ) : match.status === 'inProgress' ? (
              <div className="bg-quattro-red text-white rounded-lg py-2 px-4">
                <div className="text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-sm">جارية</div>
              </div>
            ) : (
              <div className="bg-quattro-green text-white rounded-lg py-2 px-4">
                <div className="text-lg font-bold">
                  {match.time}
                </div>
                <div className="text-sm">قادمة</div>
              </div>
            )}
          </div>

          <div className="text-center w-1/3">
            <img 
              src={awayTeam?.logo} 
              alt={awayTeam?.name} 
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="font-bold">{awayTeam?.name}</p>
          </div>
        </div>
        
        <div className="mt-3 text-center text-sm text-gray-500">
          {match.venue}
        </div>
      </CardContent>
    </Card>
  );
};
