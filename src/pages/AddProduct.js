import axios from "axios";
import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Spacer,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import Layout from "./Layout";

const baseURL = "http://localhost:3000/products";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // may need custom fields
  // ie, CustomField1Key=Size, CustomField1Value=Big  etc
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({ name, description, count });
    axios
      .post(baseURL, { name, description, count })
      .then((response) => {
        toast({
          title: `${name} (${count}) added to products!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AddProduct :(");

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
      default:
        break;
    }
  };

  return (
    <Layout title="Add Product">
      <Flex>
        <form onSubmit={handleOnClick}>
          <Input
            placeholder="Product name"
            name="name"
            onChange={handleChange}
          />

          <Spacer />
          <br />

          <Input
            placeholder="Product description"
            name="description"
            onChange={handleChange}
          />

          <Spacer />
          <br />

          <Input defaultValue={count} name="count" onChange={handleChange} />

          <Spacer />
          <br />

          {
            // potentially add business logic to set frequency of ability to order?
            // depends if business logic depends on anything outside of this form
          }

          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={handleOnClick}
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Layout>
  );
}
