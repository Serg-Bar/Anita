import admin from 'firebase-admin';

import { fbServiceAccount } from '@/firebaseServiceAccountKey';

admin.initializeApp({
  credential: admin.credential.cert(fbServiceAccount as admin.ServiceAccount),
  databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com',
});

const db = admin.firestore();
export { db };
