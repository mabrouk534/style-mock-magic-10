
// This file re-exports all data from individual files for backward compatibility
// This helps prevent breaking changes in components that still import from mockData
import { academies } from './academies';
import { matches } from './matches';
import { players } from './players';
import { standings } from './standings';
import { schedule, tournamentRules } from './tournament';
import { matchEvents, matchLineups, matchReferees, matchStats } from './matchDetails';

export {
  academies,
  matches,
  players,
  standings,
  schedule,
  tournamentRules,
  matchEvents,
  matchLineups,
  matchReferees,
  matchStats
};
