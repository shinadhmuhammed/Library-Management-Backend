import adminRepositary from '../Repositary/adminRepositary.js';
import repositary from '../Repositary/adminRepositary.js'
import {sendEmailNotification} from '../utils/nodeMailer.js'


const signup=async(req,res)=>{
    try {
        const data=req.body
      const response=await repositary.adminSignup(data)
      res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in signup' });
    }
}

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const response = await repositary.adminLogin(username, password);
      if (response.success) {
        res.status(response.status).json(response);
      } else {
        res.status(response.status).json({ message: response.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error in login' });
    }
  };


  const addBooks=async(req,res)=>{
    try {
      const data = req.body;
      const adminId = req.admin.adminId; 
      const response=await adminRepositary.addBooks(data,adminId)
      res.status(201).json(response);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  }

  const getBooks = async (req, res) => {
    try {
      const books = await adminRepositary.getBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
  };


  const updateBooks=async(req,res)=>{
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const response=await adminRepositary.updateBooks(id,updatedData)
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
  }

  const deleteBooks=async(req,res)=>{
    try {
      const {id}=req.params
      console.log(id,'id')
      const deleteResponse=await adminRepositary.deleteBooks(id)
      res.status(200).json(deleteResponse);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
  }

  const getTransaction=async(req,res)=>{
    try {
      const adminId = req.admin.adminId; 
      const transactions=await repositary.getTransaction(adminId)
      res.status(200).json(transactions)
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  }

  const transactionDetails=async(req,res)=>{
    try {
      const { userId, bookId } = req.body;
      const details=await repositary.details(userId,bookId)
      res.status(200).json(details)
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  }

  const sendReminder=async(req,res)=>{
    try {
      const { email, bookName } = req.body;
      console.log(email,bookName)
      const message = `This is a reminder to return the book "${bookName}". Please make sure to return it on time.`;
      const subject = 'Book Return Reminder';
  
      await sendEmailNotification(email, message, subject);
  
      res.status(200).json({ success: true, message: 'Reminder sent successfully' });
    } catch (error) {
      console.error('Error sending email reminder:', error);
      res.status(500).json({ success: false, message: 'Failed to send reminder' });
    }
  }



export default {
    signup,
    login,
    addBooks,
    getBooks,
    updateBooks,
    deleteBooks,
    getTransaction,
    transactionDetails,
    sendReminder
}