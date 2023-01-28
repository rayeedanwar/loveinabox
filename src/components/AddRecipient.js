import axios from "axios";
import { useState } from "react";

import {
  Input,
  Spacer,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import EmailInput from "./Form/EmailInput";
import PhoneInput from "./Form/PhoneInput";
import FormModal from "./Form/FormModal";
import { useNavigate } from "react-router-dom";

const baseURL = `${process.env.REACT_APP_API_URL}/households`;

export default function AddRecipient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(baseURL, {
        address,
        adultCount,
        childCount,
        members: [{ name, email, contactNumber }],
      })
      .then(() => {
        toast({
          title: `${name}, you've been added!`,
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/recipients");
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AddHousehold :(");

        // this toast causes app to crash :(((((
        // toast({
        //   title: "Woops!",
        //   description: "Something went wrong :(",
        //   status: "failure",
        //   duration: 9000,
        //   isClosable: true,
        // });
      })
      .finally(() => setIsLoading(false));
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
        setContactNumber(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "adultCount":
        setAdultCount(parseInt(event.target.value));
        break;
      case "childCount":
        setChildCount(parseInt(event.target.value));
        break;
      default:
        break;
    }
  };

  const modalBody = (
    <form>
      <Input placeholder="Full name" name="name" onChange={handleChange} />

      <Spacer />
      <br />

      <EmailInput onChange={handleChange} />

      <Spacer />
      <br />

      <PhoneInput onChange={handleChange} />

      <Spacer />
      <br />

      <Input placeholder="Address" name="address" onChange={handleChange} />

      <Spacer />
      <br />

      <Input placeholder="1" name="adultCount" onChange={handleChange} />

      <Spacer />
      <br />

      <Input placeholder="0" name="childCount" onChange={handleChange} />
    </form>
  );

  return (
    <FormModal
      title="Add Recipient"
      modalBody={modalBody}
      isLoading={isLoading}
      handleOnClick={handleOnClick}
    />
  );
}
