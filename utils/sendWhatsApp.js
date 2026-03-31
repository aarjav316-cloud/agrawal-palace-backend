import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const sendWhatsApp = async (booking) => {
  try {
    const message = `🚨 New Booking Alert!

👤 Name: ${booking.name}
📞 Phone: ${booking.phone}
🏨 Type: ${booking.type}
📅 Date: ${booking.date}
👥 Guests: ${booking.guests}`;

    console.log("Sending SMS from:", process.env.TWILIO_PHONE_NUMBER);
    console.log("Sending SMS to:", process.env.OWNER_PHONE_NUMBER);

    const result = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.OWNER_PHONE_NUMBER,
      body: message,
    });

    console.log("SMS sent ✅ - SID:", result.sid);
    console.log("Status:", result.status);
  } catch (error) {
    console.log("SMS Error:", error.message);
    console.log("Error Code:", error.code);
    console.log("Error Details:", error.moreInfo);
  }
};

export default sendWhatsApp;
