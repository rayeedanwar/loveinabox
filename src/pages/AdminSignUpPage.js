import axios from "axios";
import { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Spacer,
  CheckboxGroup,
  Stack,
  Checkbox,
  useCheckboxGroup,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import EmailInput from "../components/Form/EmailInput";
import PhoneInput from "../components/Form/PhoneInput";
import Layout from "./Layout";

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

  return (
    <Layout title="Admin sign up">
      <Flex>
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
    </Layout>
  );
}
