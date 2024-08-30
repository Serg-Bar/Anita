import type { twiml } from 'twilio';

import { voiceConfig, welcomeText } from '../../utils';

require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const incomingCallHandler = (voiceResponse: twiml.VoiceResponse) => {
  voiceResponse.say(voiceConfig, welcomeText);

  voiceResponse.gather({
    input: ['speech'],
    action: '/conversation',
    speechTimeout: 'auto',
    language: 'he-IL',
  });
};

const voiceConversation = (
  reply: string | null | undefined,
  voiceResponse: twiml.VoiceResponse,
) => {
  if (reply) {
    voiceResponse.say(voiceConfig, reply);

    voiceResponse.say(voiceConfig, 'מקווה שעזרתי, אשמח לענות על עוד שאלות');
    voiceResponse.gather({
      input: ['speech'],
      action: '/conversation',
      speechTimeout: 'auto',
      language: 'he-IL',
    });
  } else {
    voiceResponse.say(
      voiceConfig,
      'Sorry, there was an error processing your request.',
    );
    voiceResponse.hangup();
  }
};

export { incomingCallHandler, voiceConversation };
