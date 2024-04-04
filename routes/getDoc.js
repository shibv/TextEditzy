import express from 'express';
import {getAllDocuments, createRoom} from '../controller/documentController.js'
const router = express.Router();


router.get("/getDoc", getAllDocuments)
router.post("/createRoom", createRoom)


export default router