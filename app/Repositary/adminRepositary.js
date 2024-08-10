import express from "express";
import AdminUser from "../Models/adminModel.js";
import bcrypt from 'bcrypt'
import {generateToken} from "../utils/jwt.js";
import Book from "../Models/bookModel.js";
import LibraryTransaction from "../Models/libraryModel.js";
import User from "../Models/userModel.js";

const adminSignup = async (data) => {
  try {
    const existingUser = await AdminUser.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new AdminUser({
      username: data.username,
      name: data.name,
      password: hashedPassword,
      email: data.email,
      contact: data.contact,
    });
    const savedUser = await newUser.save();
    return { success: true, user: savedUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

const adminLogin = async (username, password) => {
  try {
    const admin = await AdminUser.findOne({ username });
    
    if (!admin) {
      return { success: false, status: 400, message: 'Admin not found' };
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { success: false, status: 400, message: 'Invalid credentials' };
    }
    const token=generateToken(admin)
    return {
      success: true,
      status: 200,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, status: 500, message: 'Server error' };
  }
}

const addBooks=async(data,adminId)=>{
  try {
    const { name, author, currentAvailabilityStatus } = data;

    const newBook=new Book({
      adminId,
      name,
      author,
      currentAvailabilityStatus: currentAvailabilityStatus ?? true,
      
    })
    const saveBook=await newBook.save()
    return saveBook
  } catch (error) {
    console.error('Error in repository while adding book:', error);
    throw error;
  }
}


const getBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    console.error('Error in repository while fetching books:', error);
    throw error;
  }
};

const updateBooks=async(id,updatedData)=>{
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedBook;
  } catch (error) {
    console.error('Error updating book in repository:', error);
    throw error;
  }
};

const deleteBooks=async(id)=>{
  try {
    const book=await Book.findByIdAndDelete(id)
    return book
  } catch (error) {
    console.error('Error deleting book in repository:', error);
    throw error;
  }
}

const getTransaction=async(adminId)=>{
  try {
    const transaction=await LibraryTransaction.find({adminId})
    return transaction
  } catch (error) {
    console.error('Error deleting book in repository:', error);
    throw error;
  }
}

const details = async (adminId, bookId) => {
  try {
    const bookDetails = await Book.find({_id:bookId} ); 
    const userDetails = await User.find({ _id: adminId}); 
    return { bookDetails, userDetails }; 
  } catch (error) {
    console.error('Error fetching details in repository:', error);
    throw error; 
  }
};



export default {
  adminSignup,
  adminLogin,
  addBooks,
  getBooks,
  updateBooks,
  deleteBooks,
  getTransaction,
  details
};
