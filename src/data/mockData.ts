
import { Academy, Match, Player, Team, TournamentRule, Schedule } from '../types/tournament';

// Generate academies
export const academies: Academy[] = [
  {
    id: '1',
    name: 'أكاديمية النجوم',
    logo: '/lovable-uploads/24bf5cc4-925e-4d1b-ae51-13c165db96ef.png',
    country: 'الإمارات',
    coordinator: 'أحمد محمد',
    contactNumber: '+971501234567',
    participatingCategories: ['تحت 14 سنة', 'تحت 16 سنة']
  },
  {
    id: '2',
    name: 'أكاديمية الصقور',
    logo: '/lovable-uploads/a1eaab8b-326a-4eb5-9d11-30e4a4b29115.png',
    country: 'السعودية',
    coordinator: 'خالد عبدالله',
    contactNumber: '+966512345678',
    participatingCategories: ['تحت 14 سنة', 'تحت 18 سنة']
  },
  {
    id: '3',
    name: 'أكاديمية كواترو',
    logo: '/lovable-uploads/0bba4204-75a2-4450-816b-bd2b6f469e00.png',
    country: 'قطر',
    coordinator: 'عبدالرحمن يوسف',
    contactNumber: '+97433445566',
    participatingCategories: ['تحت 14 سنة', 'تحت 16 سنة', 'تحت 18 سنة']
  },
  {
    id: '4',
    name: 'أكاديمية الأبطال',
    logo: '/lovable-uploads/24bf5cc4-925e-4d1b-ae51-13c165db96ef.png',
    country: 'البحرين',
    coordinator: 'جاسم علي',
    contactNumber: '+97366778899',
    participatingCategories: ['تحت 16 سنة', 'تحت 18 سنة']
  },
  {
    id: '5',
    name: 'أكاديمية المستقبل',
    logo: '/lovable-uploads/a1eaab8b-326a-4eb5-9d11-30e4a4b29115.png',
    country: 'الكويت',
    coordinator: 'فهد العنزي',
    contactNumber: '+96555667788',
    participatingCategories: ['تحت 14 سنة', 'تحت 18 سنة']
  }
];

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

// Generate players
export const players: Player[] = [
  {
    id: '1',
    name: 'محمد الهاشمي',
    academy: '1',
    category: 'تحت 14 سنة',
    dateOfBirth: '2011-03-15',
    goals: 3,
    yellowCards: 1,
    redCards: 0,
    position: 'مهاجم',
    jerseyNumber: 10
  },
  {
    id: '2',
    name: 'عبدالله العمري',
    academy: '2',
    category: 'تحت 14 سنة',
    dateOfBirth: '2011-05-20',
    goals: 1,
    yellowCards: 0,
    redCards: 0,
    position: 'وسط',
    jerseyNumber: 8
  },
  {
    id: '3',
    name: 'جاسم المهندي',
    academy: '3',
    category: 'تحت 16 سنة',
    dateOfBirth: '2009-07-10',
    goals: 2,
    yellowCards: 1,
    redCards: 0,
    position: 'مهاجم',
    jerseyNumber: 9
  },
  {
    id: '4',
    name: 'فهد المطيري',
    academy: '5',
    category: 'تحت 16 سنة',
    dateOfBirth: '2009-11-05',
    goals: 2,
    yellowCards: 0,
    redCards: 0,
    position: 'وسط',
    jerseyNumber: 7
  },
  {
    id: '5',
    name: 'حمد البوعينين',
    academy: '4',
    category: 'تحت 18 سنة',
    dateOfBirth: '2007-02-25',
    goals: 0,
    yellowCards: 1,
    redCards: 1,
    position: 'مدافع',
    jerseyNumber: 4
  },
  {
    id: '6',
    name: 'سعود القحطاني',
    academy: '2',
    category: 'تحت 18 سنة',
    dateOfBirth: '2007-06-12',
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    position: 'حارس مرمى',
    jerseyNumber: 1
  }
];

// Generate standings
export const standings: Team[] = [
  {
    academyId: '1',
    category: 'تحت 14 سنة',
    points: 6,
    gamesPlayed: 2,
    wins: 2,
    draws: 0,
    losses: 0,
    goalsFor: 5,
    goalsAgainst: 1
  },
  {
    academyId: '2',
    category: 'تحت 14 سنة',
    points: 3,
    gamesPlayed: 2,
    wins: 1,
    draws: 0,
    losses: 1,
    goalsFor: 3,
    goalsAgainst: 3
  },
  {
    academyId: '3',
    category: 'تحت 16 سنة',
    points: 4,
    gamesPlayed: 2,
    wins: 1,
    draws: 1,
    losses: 0,
    goalsFor: 4,
    goalsAgainst: 2
  },
  {
    academyId: '4',
    category: 'تحت 16 سنة',
    points: 0,
    gamesPlayed: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    goalsFor: 0,
    goalsAgainst: 2
  },
  {
    academyId: '5',
    category: 'تحت 16 سنة',
    points: 1,
    gamesPlayed: 1,
    wins: 0,
    draws: 1,
    losses: 0,
    goalsFor: 2,
    goalsAgainst: 2
  }
];

// Tournament rules
export const tournamentRules: TournamentRule[] = [
  {
    id: 1,
    title: 'نظام البطولة',
    description: 'تقام البطولة بنظام المجموعات ثم الأدوار الإقصائية'
  },
  {
    id: 2,
    title: 'مدة المباراة',
    description: 'تحت 14 سنة: 30 دقيقة لكل شوط، تحت 16 و18 سنة: 40 دقيقة لكل شوط'
  },
  {
    id: 3,
    title: 'نظام النقاط',
    description: 'الفوز: 3 نقاط، التعادل: 1 نقطة، الخسارة: 0 نقطة'
  },
  {
    id: 4,
    title: 'التبديلات',
    description: 'يسمح بإجراء 5 تبديلات لكل فريق خلال المباراة'
  },
  {
    id: 5,
    title: 'البطاقات الملونة',
    description: 'اللاعب الذي يحصل على بطاقتين صفراء أو بطاقة حمراء يغيب عن المباراة التالية'
  }
];

// Tournament schedule
export const schedule: Schedule[] = [
  {
    id: 1,
    title: 'حفل الافتتاح',
    date: '2025-05-31',
    startTime: '19:00',
    endTime: '21:00',
    location: 'قاعة المؤتمرات الكبرى',
    description: 'حفل افتتاح البطولة مع عرض للفرق المشاركة',
    type: 'event'
  },
  {
    id: 2,
    title: 'الجولة الأولى - مباريات المجموعة الأولى',
    date: '2025-06-01',
    startTime: '16:00',
    endTime: '20:00',
    location: 'المجمع الرياضي الرئيسي',
    description: 'مباريات الجولة الأولى للمجموعة الأولى لجميع الفئات',
    type: 'match'
  },
  {
    id: 3,
    title: 'تدريبات الفرق',
    date: '2025-06-03',
    startTime: '09:00',
    endTime: '12:00',
    location: 'ملاعب التدريب',
    description: 'حصص تدريبية للفرق المشاركة',
    type: 'training'
  },
  {
    id: 4,
    title: 'الجولة الثانية - مباريات المجموعة الثانية',
    date: '2025-06-05',
    startTime: '16:00',
    endTime: '20:00',
    location: 'المجمع الرياضي الرئيسي',
    description: 'مباريات الجولة الثانية للمجموعة الثانية لجميع الفئات',
    type: 'match'
  },
  {
    id: 5,
    title: 'حفل الختام وتوزيع الجوائز',
    date: '2025-06-10',
    startTime: '20:00',
    endTime: '22:00',
    location: 'المسرح الرئيسي',
    description: 'حفل ختام البطولة وتوزيع الجوائز على الفائزين',
    type: 'event'
  }
];
