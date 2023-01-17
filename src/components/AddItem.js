import axios from "axios";
import { useState } from "react";
import {
  Input,
  Spacer,
  Text,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import FormModal from "./Form/FormModal";

const baseURL = `${process.env.REACT_APP_API_URL}/items`;

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // may need custom fields
  // ie, CustomField1Key=Size, CustomField1Value=Big  etc
  const [count, setCount] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    // api call with succes toast feels like it should sit closely with FormModal
    // look at refactor
    e.preventDefault();
    setIsLoading(true);
    console.log({ name, description, count });
    axios
      .post(baseURL, { name, description, count, frequency })
      .then((response) => {
        toast({
          title: `${name} (${count}) added to items!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AddItem :(");

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
      case "description":
        setDescription(event.target.value);
        break;
      case "count":
        setCount(event.target.value);
        break;
      case "frequency":
        setFrequency(event.target.value);
        break;
      default:
        break;
    }
  };
  const modalBody = (
    <form onSubmit={handleOnClick}>
      <Input placeholder="Item name" name="name" onChange={handleChange} />

      <Spacer />
      <br />

      <Input
        placeholder="Item description"
        name="description"
        onChange={handleChange}
      />

      <Spacer />
      <br />

      <Text mb="8px">Stock count:</Text>
      <Input defaultValue={count} name="count" onChange={handleChange} />

      <Text mb="8px">Frequency:</Text>
      <Input defaultValue={count} name="frequency" onChange={handleChange} />

      <Spacer />
      <br />

      {
        // potentially add business logic to set frequency of ability to order?
        // depends if business logic depends on anything outside of this form
      }
    </form>
  );

  return (
    <FormModal
      title="Add Item"
      modalBody={modalBody}
      isLoading={isLoading}
      handleOnClick={handleOnClick}
    />
  );
}
