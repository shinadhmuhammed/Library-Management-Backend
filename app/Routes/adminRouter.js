import express from "express";
const AdminRouter=express.Router()
import adminController from '../Controllers/AdminController.js'


AdminRouter.post('/adminSignup',adminController.signup)
AdminRouter.post('/adminLogin',adminController.login)
AdminRouter.post('/books',adminController.addBooks)
AdminRouter.get('/getBooks',adminController.getBooks)
AdminRouter.put('/books/:id',adminController.updateBooks)
AdminRouter.delete('/deleteBooks/:id',adminController.deleteBooks)

export default AdminRouter