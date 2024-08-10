import express from "express";
const AdminRouter=express.Router()
import adminController from '../Controllers/AdminController.js'
import {authenticateToken} from '../utils/jwt.js'


AdminRouter.post('/adminSignup',adminController.signup)
AdminRouter.post('/adminLogin',adminController.login)
AdminRouter.post('/books',authenticateToken,adminController.addBooks)
AdminRouter.get('/getBooks',authenticateToken,adminController.getBooks)
AdminRouter.put('/books/:id',authenticateToken,adminController.updateBooks)
AdminRouter.delete('/deleteBooks/:id',authenticateToken,adminController.deleteBooks)
AdminRouter.get('/getTransaction',authenticateToken,adminController.getTransaction)
AdminRouter.post('/details',authenticateToken,adminController.transactionDetails)
AdminRouter.post('/sendReminder',authenticateToken,adminController.sendReminder)

export default AdminRouter