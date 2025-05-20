
export interface Academy {
  id: string;
  name: string;
  logo: string;
  country: string;
  coordinator: string;
  contactNumber: string;
  participatingCategories: string[];
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  venue: string;
  category: string;
  status: 'scheduled' | 'inProgress' | 'completed';
}

export interface Player {
  id: string;
  name: string;
  academy: string;
  category: string;
  dateOfBirth: string;
  goals: number;
  yellowCards: number;
  redCards: number;
  position: string;
  jerseyNumber: number;
  nationality?: string;
  photo?: string;
  passportPhoto?: string;
}

export interface Staff {
  id: string;
  name: string;
  academy: string;
  role: string;
  photo?: string;
  passportPhoto?: string;
  nationality?: string;
}

export interface Team {
  academyId: string;
  category: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface TournamentRule {
  id: number;
  title: string;
  description: string;
}

export interface Schedule {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  type: 'match' | 'event' | 'training';
}

export interface User {
  id: string;
  email: string;
  academyId: string | null;
  role: 'admin' | 'academy' | 'viewer';
}

export interface TournamentActivity {
  time: string;
  description: string;
}

export interface TournamentProgram {
  id: string;
  date: string;
  title: string;
  activities: TournamentActivity[];
}
