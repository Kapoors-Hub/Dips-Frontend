import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput ";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const addNewNote = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/note/add",
        "https://dis-caudal.onrender.com/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        // `http://localhost:3000/api/note/edit/${noteId}`,
        `https://dis-caudal.onrender.com/api/note/edit/${noteId}`,
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  const handleSummarize = async () => {
    if (!content) {
      setError("Please enter content to summarize");
      return;
    }

    setIsSummarizing(true);
    setError("");

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/summarize",
        "https://dis-caudal.onrender.com/api/summarize",
        { content },
        { withCredentials: true }
      );

      if (response.data.success) {
        setContent(response.data.summary);
        toast.success("Content summarized successfully");
      } else {
        setError("Failed to summarize content");
        toast.error("Failed to summarize content");
      }
    } catch (error) {
      setError("An error occurred while summarizing");
      toast.error("An error occurred while summarizing");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <motion.div
      className="relative p-6 bg-white rounded-lg rounded-[30px] shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <button
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        onClick={onClose}
      >
        <MdClose className="text-xl text-gray-600" />
      </button>
      <div className="flex flex-col gap-4">
        <label className="input-label uppercase"
        style={{color:"black"}}
        >Title</label>
        <input
          type="text"
          className="text-xl text-gray-800 border border-gray-300 rounded p-2  focus:text-black"

          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <label className="input-label uppercase"
        style={{color:"black"}}
        >Content</label>
        <textarea
          className="text-sm text-gray-800 border border-gray-300 rounded p-2 focus:text-black"
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label  uppercase"
        style={{color:"black"}}
        >Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <div className="flex justify-between mt-5 gap-4">
  <button
    className="w-1/2 bg-red-500 text-white font-medium p-3 rounded-[30px] hover:bg-red-600 transition"
    style={{ backgroundColor: '#FFCD00', color: "#000" }}
    onClick={handleAddNote}
  >
    {type === "edit" ? "Update" : "Add"}
  </button>
  <button
    className={`w-1/2 bg-gradient-to-r from-[#CCF6FF] to-[#FFCAF4] text-gray-800 font-medium p-3 rounded-[30px] hover:from-[#FFCAF4] hover:to-[#CCF6FF] transition ${isSummarizing ? "cursor-not-allowed" : ""}`}
    onClick={handleSummarize}
    disabled={isSummarizing}
  >
    {isSummarizing ? "Summarizing..." : "Summarize"}
  </button>
</div>
    </motion.div>
  );
};

export default AddEditNotes;