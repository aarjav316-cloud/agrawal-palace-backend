// Test script for booking API
// Run with: node test-booking.js

const testBooking = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        phone: "+1234567890",
        type: "room",
        date: "2026-04-15",
        guests: 2,
      }),
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

testBooking();
