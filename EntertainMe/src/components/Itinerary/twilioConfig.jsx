

import React, { useState } from 'react';

const TwilioMessaging = () => {
  const [messageID, setMessageID] = useState(null);

  const handleMessageSend = async () => {
    try {
      const TwilioModule = await import('twilio');
      const Twilio = TwilioModule.default;

      const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_ID
      const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN
      const client = Twilio(accountSid, authToken);

      // Rest of your code...

      const message = await client.messages.create({
        to: '+7738701031', // Replace with the recipient's phone number
        from: '+18667479043',
        body: 'Hello, this is a test message!', // Replace with your message content
      });

      setMessageID(message.sid);
      console.log('Message sent:', message.sid);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleMessageSend}>Send Message</button>
      {messageID && <p>Message ID: {messageID}</p>}
    </div>
  );
};

export default TwilioMessaging;