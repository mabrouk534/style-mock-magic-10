
import Navbar from '@/components/Navbar';
import { schedule } from '@/data/mockData';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Clock } from 'lucide-react';

const Schedule = () => {
  // Sort schedule by date
  const sortedSchedule = [...schedule].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group events by date
  const groupedSchedule: Record<string, typeof schedule> = {};
  
  sortedSchedule.forEach(event => {
    if (!groupedSchedule[event.date]) {
      groupedSchedule[event.date] = [];
    }
    groupedSchedule[event.date].push(event);
  });

  // Sort dates
  const sortedDates = Object.keys(groupedSchedule).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'match':
        return 'border-r-quattro-blue';
      case 'training':
        return 'border-r-quattro-green';
      case 'event':
        return 'border-r-quattro-red';
      default:
        return 'border-r-quattro-darkgray';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'match':
        return 'مباراة';
      case 'training':
        return 'تدريب';
      case 'event':
        return 'فعالية';
      default:
        return 'آخر';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">جدول البطولة</h1>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-4 space-x-reverse">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-quattro-blue ml-2"></div>
              <span>مباريات</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-quattro-green ml-2"></div>
              <span>تدريبات</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-quattro-red ml-2"></div>
              <span>فعاليات</span>
            </div>
          </div>
        </div>
        
        {sortedDates.map(date => (
          <div key={date} className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="ml-2" size={20} />
              <h2 className="text-xl font-bold">{formatDate(date)}</h2>
            </div>
            
            <div className="space-y-4">
              {groupedSchedule[date].map(event => (
                <Card key={event.id} className={`border-r-4 ${getEventTypeStyle(event.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock size={16} className="ml-1" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-bold ml-1">المكان:</span>
                      <span>{event.location}</span>
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-600">{event.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
