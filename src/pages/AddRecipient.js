import axios from "axios";
import { useState } from "react";

import {
  Input,
  Spacer,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import EmailInput from "../components/Form/EmailInput";
import PhoneInput from "../components/Form/PhoneInput";
import FormModal from "../components/Form/FormModal";

const baseURL = "http://localhost:3000/recipients";

export default function AddRecipient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(baseURL, { name, email, number })
      .then(() => {
        toast({
          title: `${name}, you've been added!`,
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AdminSignUpPage :(");

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
        setNumber(event.target.value);
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
