import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["room", "garden"],
      required: [true, "Booking type is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest is required"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
