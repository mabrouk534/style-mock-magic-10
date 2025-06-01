
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Player } from '@/types/tournament';

export const createPlayer = async (playerData: Omit<Player, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'players'), playerData);
  return docRef.id;
};

export const updatePlayer = async (id: string, playerData: Partial<Player>): Promise<void> => {
  const playerRef = doc(db, 'players', id);
  await updateDoc(playerRef, playerData);
};

export const deletePlayer = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'players', id));
};

export const getPlayers = async (): Promise<Player[]> => {
  const querySnapshot = await getDocs(collection(db, 'players'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Player[];
};

export const getPlayersByAcademy = async (academyId: string): Promise<Player[]> => {
  const q = query(collection(db, 'players'), where('academy', '==', academyId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Player[];
};
