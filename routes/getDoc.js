import express from 'express';
import {getAllDocuments, createRoom, joinRoom} from '../controller/documentController.js'
const router = express.Router();


router.get("/getDoc", getAllDocuments)
router.post("/createRoom", createRoom)
router.post("/joinRoom", joinRoom)


export default router