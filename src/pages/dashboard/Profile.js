import React from "react"

import { useState } from "react"
import { FormRow } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "../../features/user/userSlice"

const Profile = () => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastname || "",
    location: user?.location || "",
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData

    if (!name || !email || !lastName || !location) {
      toast.error("Fill all fields")
      return
    }
    dispatch(updateUser({ name, email, lastName, location }))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="location"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
