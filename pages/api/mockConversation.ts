import type { NextApiRequest, NextApiResponse } from 'next';

const mockConversation = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API Route Hit'); // Debugging statement

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Extract values from request body
  const { From, To, CallSid, SpeechResult } = req.body;

  if (!From || !To || !CallSid || !SpeechResult) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  // Create a simple response message
  const responseMessage = `Received message: "${SpeechResult}" from ${From} to ${To}.`;

  // Return a simple JSON response
  res.status(200).json({ message: responseMessage });
};

export default mockConversation;
