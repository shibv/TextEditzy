import Document from "../modals/documentSchema.js";

//  get document data from database
export const getDocument = async (id) => {
  if (id === null) return;

  const document = await Document.findById(id);

  if (document) return document;

  return await Document.create({ _id: id, data: "" });
};
//  update document data in database 
export const updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, { data });
};



export const getAllDocuments = async (req, res) => {
  const documents = await Document.find();
  return res.status(200).json({ documents });
}

export const createRoom = async (req, res) => {
  const { roomId , password} = req.body
console.log(roomId, password);

  const document = await Document.create({ _id: roomId, data:"", password: password });
  return res.status(200).json({ document });
}

export const joinRoom = async (req, res) => {
  const { roomId, password } = req.body
  const document = await Document.findById(roomId);
  if(document.password !== password){
    return res.status(200).json({ document: null, error: "Wrong Password" });
  }
  return res.status(200).json({ document });  
}