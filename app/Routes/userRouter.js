import express, { Router } from 'express'
const UserRoute=express.Router()
import  userController  from '../Controllers/userController.js';
import {authenticateToken} from '../utils/userJwt.js'


 UserRoute.post('/signup',userController.signup)
 UserRoute.post('/login',userController.login)
 UserRoute.get('/getBooks',authenticateToken,userController.getBooks)
 UserRoute.post('/transactions',authenticateToken,userController.transactions)
 UserRoute.get('/gettransactions',authenticateToken,userController.getTransactions)

export default UserRoute