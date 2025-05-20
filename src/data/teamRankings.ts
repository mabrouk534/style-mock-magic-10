
export interface TeamRanking {
  id: string;
  rank: number;
  teamName: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  category: string;
}

// Team rankings data grouped by category
export const teamRankings: { [key: string]: TeamRanking[] } = {
  'تحت 12 سنة': [
    {
      id: '1',
      rank: 1,
      teamName: 'أكاديمية النصر',
      gamesPlayed: 4,
      wins: 3,
      draws: 1,
      losses: 0,
      goalsFor: 10,
      goalsAgainst: 3,
      goalDifference: 7,
      points: 10,
      category: 'تحت 12 سنة'
    },
    {
      id: '2',
      rank: 2,
      teamName: 'أكاديمية الهلال',
      gamesPlayed: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsFor: 8,
      goalsAgainst: 5,
      goalDifference: 3,
      points: 9,
      category: 'تحت 12 سنة'
    },
    {
      id: '3',
      rank: 3,
      teamName: 'أكاديمية الأهلي',
      gamesPlayed: 4,
      wins: 2,
      draws: 1,
      losses: 1,
      goalsFor: 7,
      goalsAgainst: 5,
      goalDifference: 2,
      points: 7,
      category: 'تحت 12 سنة'
    },
    {
      id: '4',
      rank: 4,
      teamName: 'أكاديمية الاتحاد',
      gamesPlayed: 4,
      wins: 1,
      draws: 2,
      losses: 1,
      goalsFor: 5,
      goalsAgainst: 6,
      goalDifference: -1,
      points: 5,
      category: 'تحت 12 سنة'
    },
    {
      id: '5',
      rank: 5,
      teamName: 'أكاديمية الفتح',
      gamesPlayed: 4,
      wins: 1,
      draws: 1,
      losses: 2,
      goalsFor: 6,
      goalsAgainst: 7,
      goalDifference: -1,
      points: 4,
      category: 'تحت 12 سنة'
    }
  ],
  'تحت 14 سنة': [
    {
      id: '6',
      rank: 1,
      teamName: 'أكاديمية الشباب',
      gamesPlayed: 4,
      wins: 4,
      draws: 0,
      losses: 0,
      goalsFor: 12,
      goalsAgainst: 2,
      goalDifference: 10,
      points: 12,
      category: 'تحت 14 سنة'
    },
    {
      id: '7',
      rank: 2,
      teamName: 'أكاديمية الفيصلي',
      gamesPlayed: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsFor: 7,
      goalsAgainst: 4,
      goalDifference: 3,
      points: 9,
      category: 'تحت 14 سنة'
    },
    {
      id: '8',
      rank: 3,
      teamName: 'أكاديمية النصر',
      gamesPlayed: 4,
      wins: 2,
      draws: 1,
      losses: 1,
      goalsFor: 8,
      goalsAgainst: 6,
      goalDifference: 2,
      points: 7,
      category: 'تحت 14 سنة'
    },
    {
      id: '9',
      rank: 4,
      teamName: 'أكاديمية الهلال',
      gamesPlayed: 4,
      wins: 1,
      draws: 1,
      losses: 2,
      goalsFor: 5,
      goalsAgainst: 7,
      goalDifference: -2,
      points: 4,
      category: 'تحت 14 سنة'
    },
    {
      id: '10',
      rank: 5,
      teamName: 'أكاديمية الاتفاق',
      gamesPlayed: 4,
      wins: 0,
      draws: 0,
      losses: 4,
      goalsFor: 2,
      goalsAgainst: 12,
      goalDifference: -10,
      points: 0,
      category: 'تحت 14 سنة'
    }
  ],
  'تحت 16 سنة': [
    {
      id: '11',
      rank: 1,
      teamName: 'أكاديمية الاتحاد',
      gamesPlayed: 4,
      wins: 3,
      draws: 1,
      losses: 0,
      goalsFor: 9,
      goalsAgainst: 2,
      goalDifference: 7,
      points: 10,
      category: 'تحت 16 سنة'
    },
    {
      id: '12',
      rank: 2,
      teamName: 'أكاديمية الأهلي',
      gamesPlayed: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsFor: 8,
      goalsAgainst: 4,
      goalDifference: 4,
      points: 9,
      category: 'تحت 16 سنة'
    },
    {
      id: '13',
      rank: 3,
      teamName: 'أكاديمية النصر',
      gamesPlayed: 4,
      wins: 2,
      draws: 1,
      losses: 1,
      goalsFor: 6,
      goalsAgainst: 5,
      goalDifference: 1,
      points: 7,
      category: 'تحت 16 سنة'
    },
    {
      id: '14',
      rank: 4,
      teamName: 'أكاديمية التعاون',
      gamesPlayed: 4,
      wins: 1,
      draws: 0,
      losses: 3,
      goalsFor: 4,
      goalsAgainst: 7,
      goalDifference: -3,
      points: 3,
      category: 'تحت 16 سنة'
    },
    {
      id: '15',
      rank: 5,
      teamName: 'أكاديمية الوحدة',
      gamesPlayed: 4,
      wins: 0,
      draws: 0,
      losses: 4,
      goalsFor: 2,
      goalsAgainst: 11,
      goalDifference: -9,
      points: 0,
      category: 'تحت 16 سنة'
    }
  ]
};
