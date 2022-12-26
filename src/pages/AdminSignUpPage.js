import axios from "axios";
import { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Spacer,
  InputGroup,
  InputLeftElement,
  CheckboxGroup,
  Stack,
  Checkbox,
  useCheckboxGroup,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";

const baseURL = "http://localhost:3000/volunteers";
// should admin be different from volunteers?
// need to digest user types

export default function AdminSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({ name, email, number, availability });
    axios
      .post(baseURL, { name, email, number, availability })
      .then(() => {
        toast({
          title: `${name} congrats on volunteering!`,
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
    console.log(event);
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

  const { getCheckboxProps } = useCheckboxGroup({ onChange: setAvailability });

  // console.log(getCheckboxProps({ value: "first" }));
  // I'd want the form to be consistent so will wrap as a component
  return (
    <Flex>
      <h1>Admin sign up</h1>
      <form>
        <Input placeholder="Full name" name="name" onChange={handleChange} />

        <Spacer />
        <br />

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </InputGroup>

        <Spacer />
        <br />

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<PhoneIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            name="number"
            onChange={handleChange}
          />
        </InputGroup>

        <Spacer />
        <br />

        <label>
          Availability (week of the month):
          <CheckboxGroup colorScheme="teal" name="availability">
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox {...getCheckboxProps({ value: "first" })}>
                First
              </Checkbox>
              <Checkbox {...getCheckboxProps({ value: "second" })}>
                Second
              </Checkbox>
              <Checkbox {...getCheckboxProps({ value: "third" })}>
                Third
              </Checkbox>
              <Checkbox {...getCheckboxProps({ value: "fourth" })}>
                Fourth
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </label>

        <Spacer />
        <br />

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
  );
}
