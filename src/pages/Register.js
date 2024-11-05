import React from "react"
import { useState, useEffect } from "react"
import { FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)

  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    console.log(e.target)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
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
          label="password"
          name="password"
          type="email"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
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
