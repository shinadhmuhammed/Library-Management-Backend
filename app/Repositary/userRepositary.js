import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { UsergenerateToken } from "../utils/userJwt.js";
import Book from "../Models/bookModel.js";
import LibraryTransaction from "../Models/libraryModel.js";

const signup = async (data) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      username: data.username,
      name: data.name,
      email: data.email,
      contact: data.contact,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return { success: true, user: savedUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { success: false, status: 400, message: "User not found" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, status: 400, message: "Invalid credentials" };
    }
    const token = UsergenerateToken(user);
    return {
      success: true,
      status: 200,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, status: 500, message: "Server error" };
  }
};

const getBooks = async () => {
  try {
    const book = await Book.find();
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

const transactions = async (userId, bookId, dueDate) => {
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return { success: false, status: 404, message: "Book not found" };
    }

    const newTransaction = new LibraryTransaction({
      userId,
      bookId,
      dueDate,
      transactionType: "borrowed",
    });

    await newTransaction.save();
    return {
      success: true,
      status: 201,
      message: "Transaction completed successfully",
      transaction: newTransaction,
    };
  } catch (error) {
    console.error("Error in userRepository.transactions:", error);
    return { success: false, status: 500, message: "Server error" };
  }
};

const getTransactions = async (userId) => {
  try {
    const transaction = await LibraryTransaction.find({userId});
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export default { signup, login, getBooks, transactions, getTransactions };
