import React from "react"
import Wrapper from "../assets/wrappers/Navbar"

import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa"
import Logo from "./Logo"
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { logoutUser, toggleSidebar } from "../features/user/userSlice"

const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        {/* SIDEBAR BUTTON */}
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>

        {/* LOGO SECTION */}
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        {/* USER PROFILE */}
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          {/* Logout Button */}
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser("Logging Out"))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
