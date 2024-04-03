import express from 'express';
import {getAllDocuments} from '../controller/documentController.js'
const router = express.Router();


router.get("/getDoc", getAllDocuments)


export default router