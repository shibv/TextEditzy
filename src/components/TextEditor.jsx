import React, { useEffect, useState } from "react";

function TextEditor({ socket, roomId, onCodeChange, quill, targetRef }) {
  const handleTextChange = (delta, oldDelta, source) => {
    if (source !== "user") return;
    // sending data(changes) to server
    socket &&
      socket.emit("send-changes", {
        roomId,
        delta,
      });
  };

  useEffect(() => {
    if (socket == null || quill == null) return;

    quill && quill.on("text-change", handleTextChange);

    return () => {
      quill && quill.off("text-change", handleTextChange);
    };
  }, [quill, socket]);




  useEffect(() => {
    if (socket == null || quill == null) return;

    const handleChange = ({ delta }) => {
      quill && quill.updateContents(delta);
    };


    socket && socket.on("receive-changes", handleChange);

    return () => {
      socket && socket.off("receive-changes", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const data = quill.getContents();
      socket.emit("save-document", {
        roomId,
        data,
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <div
      id="editor"
      ref={targetRef}
      className=" text-editor w-[50%] flex mt-4  m-auto bg-white  shadow-lg cursor-text  "
    ></div>
  );
}

export default TextEditor;
