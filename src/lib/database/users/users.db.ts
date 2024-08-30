// import bcrypt from 'bcrypt';
// import admin from 'firebase-admin';
// import { v4 as uuidv4 } from 'uuid';

// import type { IUserData } from '@/types/user.js';

// import { db } from '../firebase';
// import type { User } from '../types/index.ts';

// async function createUser(
//   email: string,
//   password: string,
//   phoneNumber: string,
// ) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const uniqueKey = uuidv4();
//     const user: User = {
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       uniqueKey,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     };

//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     const isUserExist = await getIsUserExist(email);

//     if (isUserExist) {
//       throw new Error(`Error user exist`);
//     }
//     const userRef = db.collection('users').doc(email);
//     await userRef.set(user);
//   } catch (error) {
//     // console.error('Error creating user:', error);
//     throw new Error(`Error creating user ${error}`);
//   }
// }

// async function getUser(
//   email: string,
// ): Promise<FirebaseFirestore.DocumentData | undefined | IUserData> {
//   try {
//     const userRef = db.collection('users').doc(email);
//     const userDoc = await userRef.get();
//     if (!userDoc.exists) {
//       throw new Error('User not found');
//     }
//     return userDoc.data();
//   } catch (error) {
//     console.error('Error getting user:', error);
//     throw new Error('Error getting user');
//   }
// }

// async function getIsUserExist(email: string): Promise<boolean> {
//   try {
//     const userRef = db.collection('users').doc(email);
//     const userDoc = await userRef.get();
//     return userDoc.exists;
//   } catch (error) {
//     console.error('Creating user error', error);
//     throw new Error('Creating user error');
//   }
// }

// async function getUserData(uuid: string) {
//   try {
//     const userRef = db.collection('users').doc(uuid);
//     const userDoc = await userRef.get();
//     if (!userDoc.exists) {
//       throw new Error('User not found');
//     }
//     return userDoc.data();
//   } catch (error) {
//     console.error('Error getting user:', error);
//     throw new Error('Error getting user');
//   }
// }

// export { createUser, getUser, getUserData };
