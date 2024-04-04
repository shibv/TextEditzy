import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    password :{
        type: String,
        required: true
    }
  
})

const ducument = mongoose.model("document", documentSchema);
export default ducument