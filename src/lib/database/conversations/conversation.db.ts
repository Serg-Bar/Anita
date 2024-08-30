// import admin from 'firebase-admin';

// import { db } from '../firebase';
// import type { Conversation } from '../types';

// const getServerTimestamp = () => {
//   return admin.firestore.FieldValue.serverTimestamp();
// };

// async function saveConversation(data: Conversation) {
//   try {
//     const { from, to, userMessage, botReply, callSid } = data;
//     const conversationRef = db
//       .collection(`conversations`)
//       .doc(to)
//       .collection(callSid)
//       .doc();

//     const conversation: Partial<Conversation> = {
//       from,
//       userMessage,
//       botReply,
//       timestamp: getServerTimestamp(),
//       to,
//     };
//     await conversationRef.set(conversation);
//     console.log('Conversation saved successfully');
//   } catch (error) {
//     console.error('Error saving conversation:', error);
//   }
// }

// async function getConversations() {
//   try {
//     const conversationsSnapshot = await db.collection('conversations').get();
//     return conversationsSnapshot.docs.map((doc) => doc.data());
//   } catch (error) {
//     console.error('Error getting conversations:', error);
//     throw new Error('Error getting conversations');
//   }
// }

// export { getConversations, saveConversation };
