import React from "react"
import { getInitials } from "../../utils/helper"
import { motion } from "framer-motion";
import { BiBookBookmark } from "react-icons/bi";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.username)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.username}</p>
      </div>

      <motion.button
        className="bg-[#B0B0B0] text-white font-bold py-2 px-4 rounded hover:bg-[#A0A0A0] transition-all duration-300 transform hover:scale-105"

        onClick={onLogout}
        whileHover={{ scale: 1.05, rotate: 2 }} // Animation on hover
        whileTap={{ scale: 0.95 }} // Animation on tap
      >
        Logout
      </motion.button>  
    </div>
  )
}

export default ProfileInfo

