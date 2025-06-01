
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  setDoc 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Academy } from '@/types/tournament';

export const createAcademy = async (academyData: Omit<Academy, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'academies'), academyData);
  return docRef.id;
};

export const updateAcademy = async (id: string, academyData: Partial<Academy>): Promise<void> => {
  const academyRef = doc(db, 'academies', id);
  await updateDoc(academyRef, academyData);
};

export const deleteAcademy = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'academies', id));
};

export const getAcademies = async (): Promise<Academy[]> => {
  const querySnapshot = await getDocs(collection(db, 'academies'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Academy[];
};

export const approveAcademy = async (academyId: string, userId: string): Promise<void> => {
  // Update academy status
  const academyRef = doc(db, 'academies', academyId);
  await updateDoc(academyRef, { isApproved: true });
  
  // Update user status
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { isApproved: true });
};
