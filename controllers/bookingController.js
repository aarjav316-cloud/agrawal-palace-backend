import Booking from "../models/Booking.js";
import sendWhatsApp from "../utils/sendWhatsApp.js";

export const createBooking = async (req, res) => {
  try {
    const { name, phone, type, date, guests } = req.body;

    // Validate required fields
    if (!name || !phone || !type || !date || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate booking type
    if (!["room", "garden"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking type. Must be 'room' or 'garden'",
      });
    }

    // Validate guests number
    if (guests < 1) {
      return res.status(400).json({
        success: false,
        message: "At least 1 guest is required",
      });
    }

    const booking = await Booking.create({
      name,
      phone,
      type,
      date,
      guests,
    });

    // Send WhatsApp notification to owner
    await sendWhatsApp(booking);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later",
    });
  }
};
