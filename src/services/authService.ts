
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface UserData {
  uid: string;
  email: string;
  role: 'admin' | 'academy';
  academyId?: string;
  academyName?: string;
  isApproved?: boolean;
}

export const registerUser = async (
  email: string, 
  password: string, 
  userData: Partial<UserData>
): Promise<UserData> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  const newUserData: UserData = {
    uid: user.uid,
    email: user.email!,
    role: userData.role || 'academy',
    academyId: userData.academyId,
    academyName: userData.academyName,
    isApproved: userData.role === 'admin' ? true : false,
    ...userData
  };
  
  await setDoc(doc(db, 'users', user.uid), newUserData);
  return newUserData;
};

export const loginUser = async (email: string, password: string): Promise<UserData> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    throw new Error('User data not found');
  }
  
  return userDoc.data() as UserData;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUserData = async (user: User): Promise<UserData | null> => {
  if (!user) return null;
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) return null;
  
  return userDoc.data() as UserData;
};
