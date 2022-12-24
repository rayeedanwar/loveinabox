import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:3000/products";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // may need custom fields
  // ie, CustomField1Key=Size, CustomField1Value=Big  etc
  const [count, setCount] = useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log({ name, description, count });
    axios
      .post(baseURL, { name, description, count })
      .then((response) => {
        alert(`${name} added to products!`);
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
      case "description":
        setDescription(event.target.value);
        break;
      case "count":
        setCount(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleOnClick}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />

        <label>
          Description:
          <input type="text" name="description" onChange={handleChange} />
        </label>
        <br />

        <label>
          Count:
          <input type="text" name="count" onChange={handleChange} />
        </label>
        <br />

        {
          // potentially add business logic to set frequency of ability to order?
          // depends if business logic depends on anything outside of this form
        }

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
