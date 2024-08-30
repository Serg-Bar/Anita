import type { NextApiRequest, NextApiResponse } from 'next';
import { twiml } from 'twilio';

import { incomingCallHandler } from '@/lib/twilio';

const incomingCalls = (_req: NextApiRequest, res: NextApiResponse) => {
  const voiceResponse = new twiml.VoiceResponse();
  incomingCallHandler(voiceResponse);
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(voiceResponse.toString());
};

export default incomingCalls;
