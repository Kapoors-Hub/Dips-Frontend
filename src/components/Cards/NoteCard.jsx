import React from "react"
import { FaTags } from "react-icons/fa6"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"
import { motion } from "framer-motion"

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
  className="border-2 border-[#E9E9E9] rounded-[30px] p-4 mr-4 bg-white transition-all ease-in-out"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.3 }}
  style={{
    boxShadow: "none", // Remove box shadow
  }}
>


      <div className="flex items-center justify-between">
        <div>
          <motion.h6 
            className="text-sm font-medium text-gray-800"
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h6>
          <span className="text-xs  font-semibold"
          style={{color:"#BOBOBO"}}
          >

            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdOutlinePushPin
            className={`icon-btn text-2xl cursor-pointer ${
              isPinned ? "text-[#2B85FF]" : "text-slate-300"
            }`}
            onClick={onPinNote}
          />
        </motion.div>
      </div>

      <motion.p 
        className="text-sm text-slate-600 mt-3 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {content?.slice(0, 100)}
        {content?.length > 100 && "..."}
      </motion.p>

      <div className="flex items-center justify-between mt-4">
        <motion.div 
          className="flex items-center text-xs text-slate-500 space-x-1"
          whileHover={{ scale: 1.05 }}
        >
          <FaTags className="text-blue-400" />
          <span>{tags.map((item) => `#${item} `)}</span>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdCreate
              className="icon-btn text-xl text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={onEdit}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdDelete
              className="icon-btn text-xl text-red-400 hover:text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NoteCard