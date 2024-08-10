import mongoose from 'mongoose';

const libraryTransactionSchema = new mongoose.Schema({
  adminId:{type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  dueDate: { type: Date, required: true },
  transactionType: { 
    type: String, 
    enum: ['borrowed', 'returned'], 
    required: true 
  }
});

const LibraryTransaction = mongoose.model('LibraryTransaction', libraryTransactionSchema);

export default LibraryTransaction;
