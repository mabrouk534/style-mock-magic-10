
import { Match } from '../types/tournament';

// Generate matches
export const matches: Match[] = [
  {
    id: '1',
    homeTeam: '1',
    awayTeam: '2',
    homeScore: 3,
    awayScore: 1,
    date: '2025-06-01',
    time: '16:00',
    venue: 'ملعب زايد الرياضي',
    category: 'تحت 14 سنة',
    status: 'completed'
  },
  {
    id: '2',
    homeTeam: '3',
    awayTeam: '5',
    homeScore: 2,
    awayScore: 2,
    date: '2025-06-01',
    time: '18:30',
    venue: 'ملعب جاسم بن حمد',
    category: 'تحت 16 سنة',
    status: 'completed'
  },
  {
    id: '3',
    homeTeam: '4',
    awayTeam: '1',
    homeScore: 0,
    awayScore: 2,
    date: '2025-06-02',
    time: '17:00',
    venue: 'ملعب البحرين الوطني',
    category: 'تحت 16 سنة',
    status: 'completed'
  },
  {
    id: '4',
    homeTeam: '2',
    awayTeam: '3',
    homeScore: null,
    awayScore: null,
    date: '2025-06-05',
    time: '16:30',
    venue: 'ملعب الملك فهد الدولي',
    category: 'تحت 18 سنة',
    status: 'scheduled'
  },
  {
    id: '5',
    homeTeam: '5',
    awayTeam: '4',
    homeScore: null,
    awayScore: null,
    date: '2025-06-05',
    time: '19:00',
    venue: 'ملعب جابر الأحمد الدولي',
    category: 'تحت 18 سنة',
    status: 'scheduled'
  }
];
