import React, { useState } from "react"
import SearchBar from "./SearchBar/SearchBar"
import ProfileInfo from "./Cards/ProfileInfo"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  signoutSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice"
import axios from "axios"
import Logo  from "../assets/logo.png"

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  // const onLogout = async () => {
  //   try {
  //     dispatch(signoutStart())

  //     // const res = await axios.get("http://localhost:3000/api/auth/signout", {
  //     const res = await axios.get("https://dis-caudal.onrender.com/api/auth/signout", {
  //       withCredentials: true,
  //     })

  //     if (res.data.success === false) {
  //       dispatch(signoutFailure(res.data.message))
  //       toast.error(res.data.message)
  //       return
  //     }

  //     toast.success(res.data.message)
  //     dispatch(signInSuccess())
  //     navigate("/login")
  //   } catch (error) {
  //     toast.error(error.message)
  //     dispatch(signoutFailure(error.message))
  //   }
  // }

  const onLogout = async () => {
    try {
      dispatch(signoutStart());
  
      // Call the logout endpoint
      const res = await axios.post("https://dis-caudal.onrender.com/api/auth/signout", {}, {
        withCredentials: true,
      });
  
      // Check the response
      if (res.data.success) {
        // Dispatch success and navigate to the login page
        toast.success(res.data.message);
        dispatch(signoutSuccess()); // Make sure to use signoutSuccess to reset Redux state
        navigate("/login");
      } else {
        // Handle error case
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };
  

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          {/* <span className="text-slate-500">Mouse and </span>
          <span className="text-slate-900">Cheese</span> */}
          <img src={Logo} />
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
