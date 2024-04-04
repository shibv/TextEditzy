import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainI from "../assets/edi.svg";

function List() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDocuments = async () => {
      const res = await axios.get("http://localhost:3000/api/getDoc");
      console.log(res.data);
      setDocuments(res.data?.documents);
    };
    getDocuments();
  }, [documents]);

  return (
    <div className="flex justify-evenly items-center text-black h-screen mt-4 w-full">
      <div className="w-[50%] h-full flex justify-center items-center">
        <img src={mainI} className="w-[60%] h-[70%]" alt="" />
      </div>
      <div className="w-[50%] h-full flex m-auto ">
        <div className="w-[65%] h-[70%] py-4 text-black rounded-lg flex flex-col gap-2 m-auto items-center overflow-y-auto bg-white  shadow-lg">
          <p className="text-2xl text-slate-400 font-bold  mb-2 border-b-2 " > Already Saved Documents</p>

          {documents &&
            documents.map((document) => {
              return (
                <p
                  className="hover:scale-105 transition-all duration-500 cursor-pointer bg-slate-200 rounded-md p-2 w-[80%] text-center   "
                  onClick={() =>
                    navigate(`/Join-Room/?roomId=${document._id}`)
                  }
                  key={document._id}
                >
                  {document.data.roomId}
                </p>
              );
            })}

        </div>
      </div>
    </div>
  );
}

export default List;
