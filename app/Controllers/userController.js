import userRepositary from '../Repositary/userRepositary.js'
import jwt from 'jsonwebtoken';

const signup=async(req,res)=>{
    try {
        const data=req.body
        const response=await userRepositary.signup(data)
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in signup' });
    }
}


const login=async(req,res)=>{
    try {
        const { username, password } = req.body;
        const response = await userRepositary.login(username, password);
        if (response.success) {
          res.status(response.status).json(response);
        } else {
          res.status(response.status).json({ message: response.message });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in login' });
      }
}


const getBooks=async(req,res)=>{
    try {
        const books=await userRepositary.getBooks()
        res.status(200).json(books)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in login' });
    }
}


const transactions = async (req, res) => {
    try {
        const {bookId, returnDate } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const {id}=jwt.decode(token,process.env.SECRET_KEY)
        // const id=req.user.id
        const response = await userRepositary.transactions(id,bookId, returnDate);
        res.status(response.status).json(response);
      } catch (error) {
        console.error('Error in transactions controller:', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
    };

    const getTransactions=async(req,res)=>{
      try {
      const userID=req.user.id
      const response=await userRepositary.getTransactions(userID)
      res.status(200).json(response)
      } catch (error) {
        console.error('Error in get transactions :', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
    }
    const getUserBook = async (req, res) => {
      try {
        const bookId = req.query.bookId; 
          const getBook=await userRepositary.getUserBook(bookId)
          res.status(200).json(getBook)
      } catch (error) {
        console.error('Error fetching user book:', error);
        res.status(500).json({ message: 'Server error' });
      }
    };

  



export default {
    signup,login,getBooks,transactions,getTransactions,getUserBook
}