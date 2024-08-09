import adminRepositary from '../Repositary/adminRepositary.js';
import repositary from '../Repositary/adminRepositary.js'



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
      console.log(data)
      const response=await adminRepositary.addBooks(data)
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


export default {
    signup,
    login,
    addBooks,
    getBooks,
    updateBooks,
    deleteBooks
}