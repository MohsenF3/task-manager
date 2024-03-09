import React from "react";

export default function LoginForm() {
  return (
    <div className="form-container">
      <form className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input required name="email" id="email" type="text" />
        </div>

        <button type="submit" className="form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
