import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  currentAvailabilityStatus: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
