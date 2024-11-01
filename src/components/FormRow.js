import React from "react"

const FormRow = ({ labelText, name, type, handleOnChnage }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        onChange={handleOnChnage}
        className="form-input"
      />
    </div>
  )
}

export default FormRow
