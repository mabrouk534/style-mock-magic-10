
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Match } from '@/types/tournament';

const MATCHES_COLLECTION = 'matches';

export const matchService = {
  // Get all matches
  async getAllMatches(): Promise<Match[]> {
    try {
      const matchesRef = collection(db, MATCHES_COLLECTION);
      const q = query(matchesRef, orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Match[];
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw new Error('Failed to fetch matches');
    }
  },

  // Get match by ID
  async getMatchById(matchId: string): Promise<Match | null> {
    try {
      const matchDoc = doc(db, MATCHES_COLLECTION, matchId);
      const docSnapshot = await getDoc(matchDoc);
      
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data()
        } as Match;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching match:', error);
      throw new Error('Failed to fetch match');
    }
  },

  // Add new match
  async addMatch(matchData: Omit<Match, 'id'>): Promise<string> {
    try {
      const matchesRef = collection(db, MATCHES_COLLECTION);
      const docRef = await addDoc(matchesRef, matchData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding match:', error);
      throw new Error('Failed to add match');
    }
  },

  // Update match
  async updateMatch(matchId: string, matchData: Partial<Match>): Promise<void> {
    try {
      const matchDoc = doc(db, MATCHES_COLLECTION, matchId);
      await updateDoc(matchDoc, matchData);
    } catch (error) {
      console.error('Error updating match:', error);
      throw new Error('Failed to update match');
    }
  },

  // Delete match
  async deleteMatch(matchId: string): Promise<void> {
    try {
      const matchDoc = doc(db, MATCHES_COLLECTION, matchId);
      await deleteDoc(matchDoc);
    } catch (error) {
      console.error('Error deleting match:', error);
      throw new Error('Failed to delete match');
    }
  },

  // Get matches by category
  async getMatchesByCategory(category: string): Promise<Match[]> {
    try {
      const matchesRef = collection(db, MATCHES_COLLECTION);
      const q = query(
        matchesRef, 
        where('category', '==', category),
        orderBy('date', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Match[];
    } catch (error) {
      console.error('Error fetching matches by category:', error);
      throw new Error('Failed to fetch matches by category');
    }
  },

  // Get matches by status
  async getMatchesByStatus(status: string): Promise<Match[]> {
    try {
      const matchesRef = collection(db, MATCHES_COLLECTION);
      const q = query(
        matchesRef, 
        where('status', '==', status),
        orderBy('date', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Match[];
    } catch (error) {
      console.error('Error fetching matches by status:', error);
      throw new Error('Failed to fetch matches by status');
    }
  }
};
