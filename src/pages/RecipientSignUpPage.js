import { useState } from "react";

export default function RecipientSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const handleOnClick = (e) => {
    e.preventDefault();
    console.log({ name, email, number });
    alert(`${name} ${email} ${number}`);
    // api call to go here but depends on form too
    // will do express api first
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "number":
        setNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleOnClick}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />

        <label>
          Email:
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <br />

        <label>
          Number:
          <input type="text" name="number" onChange={handleChange} />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
