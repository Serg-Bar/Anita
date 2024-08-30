import type { NextApiRequest, NextApiResponse } from 'next';
import { twiml } from 'twilio';

import { sendToChatGPT } from '@/lib/chat-gpt';
import { saveConversation } from '@/lib/database';
import { voiceConversation } from '@/lib/twilio';

const onConversation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { From, To, CallSid, SpeechResult } = req.body;
  const voiceResponse = new twiml.VoiceResponse();
  const reply = await sendToChatGPT(SpeechResult);

  await saveConversation({
    from: From,
    to: To,
    userMessage: SpeechResult,
    botReply: reply,
    callSid: CallSid,
  });

  voiceConversation(reply, voiceResponse);

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(voiceResponse.toString());
};
export default onConversation;
