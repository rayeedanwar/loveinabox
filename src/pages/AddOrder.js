import axios from "axios";
import { useState } from "react";

// middleware should add recipientId to uri
const baseURL = "http://localhost:3000/recipients/orders";

export default function AddOrder() {
  const [products, setProducts] = useState([]);
  const [notes, setNotes] = useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log({ products, notes });
    axios
      .post(baseURL, { products, notes })
      .then((response) => {
        alert(`${products.toString()} ordered!`);
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AddOrder :(");
      });
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setProducts(event.target.value.split(", "));
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Add Order</h1>
      <form onSubmit={handleOnClick}>
        <label>
          Products:
          {
            // really there should be an option to add another item from a dropdown or autofill
            // maybe even a grid with pictures
            // then logic to combine all selections into an array
          }
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />

        <label>
          Notes:
          <input type="text" name="notes" onChange={handleChange} />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
