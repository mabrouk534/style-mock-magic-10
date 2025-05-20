
import { TournamentRule, Schedule } from '../types/tournament';

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
