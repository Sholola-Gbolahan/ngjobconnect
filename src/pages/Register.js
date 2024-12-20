import React from "react"
import { useState, useEffect } from "react"
import { FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { registerUser, loginUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  }, [user, navigate])

  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password, name, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields")
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }

    dispatch(registerUser({ email, password, name }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3> {values.isMember ? "Login" : "Register"}</h3>

        {/* Displaying name if not a member */}
        {/* Toggle name */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Password field */}
        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* Main Submit Button */}
        <button type="submit" className="btn btn-block" disable={isLoading}>
          {isLoading ? "Loading....." : "Submit"}
        </button>

        {/* Test User Button */}
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            )
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>

        {/* Toggle registration or Login Button */}
        <p>
          {values.isMember ? "Not a Member yet?" : "Already a Member?"}
          <button className="member-btn" onClick={toggleMember} type="button">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
