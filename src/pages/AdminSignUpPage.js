import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:3000/volunteers";
// should admin be different from volunteers?
// need to digest user types

export default function AdminSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [availability, setAvailability] = useState([]);

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log({ name, email, number, availability });
    axios
      .post(baseURL, { name, email, number, availability })
      .then((response) => {
        alert(`${name} congrats on volunteering!`);
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong :(");
      });
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
      case "availability":
        // proper form validation can handle this better when I get round to thi
        setAvailability([...availability, event.target.value]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Admin sign up</h1>
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

        <label>
          Availability:
          <br />
          <input
            type="checkbox"
            id="first"
            name="availability"
            value="first"
            onChange={handleChange}
          />
          <label>First week of the month</label>
          <br />
          <input
            type="checkbox"
            id="second"
            name="availability"
            value="second"
            onChange={handleChange}
          />
          <label>Second week of the month</label>
          <br />
          <input
            type="checkbox"
            id="third"
            name="availability"
            value="third"
            onChange={handleChange}
          />
          <label>Third</label>
          <br />
          <input
            type="checkbox"
            id="last"
            name="availability"
            value="last"
            onChange={handleChange}
          />
          <label>Fourth/Last</label>
          <br />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
