import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Flex,
  Image,
  Spacer,
  Stack,
  SimpleGrid,
  Text,
  Textarea,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import AddRemoveCartButton from "../components/AddRemoveCartButton";
import isProductInCart from "../utils/isProductInCart";

// middleware should add recipientId to uri
const baseURL = "http://localhost:3000/recipients/orders";

export default function AddOrder() {
  // to be replaced by api res
  const productsRes = [
    {
      id: 1,
      name: "Rice",
      description: "small",
      src: "rice.jpg", // https://isthisthatfood.com/is-rice-a-grain/
    },
    {
      id: 2,
      name: "Shampoo",
      description: "big",
      src: "shampoo.jfif",
    },
    {
      id: 3,
      name: "Tinned tomatoes",
      description: "Family",
      src: "tomatoes.jfif",
    },
  ];
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, { cart, notes }) // do I want to send IDs only? what if db gets wiped? is that real?
      .then(() => {
        toast({
          title: "Congrats! Order placed", // order number might be useful with link to order
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AddOrder :(");
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
      case "notes":
        setNotes(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleProductCartChange = (e) => {
    const intTargetId = parseInt(e.target.id);
    const productFoundInCart = isProductInCart(cart, intTargetId);

    if (productFoundInCart) setCart(cart.filter((id) => id !== intTargetId));

    if (!productFoundInCart) setCart([...cart, intTargetId]);
  };

  return (
    <Flex>
      <h1>Add Order</h1>
      <form onSubmit={handleOnClick}>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {productsRes.map(({ id, name, description, src }) => {
            return (
              <Card maxW="sm" key={id} align="center" name={name}>
                <CardBody>
                  <Image
                    src={src}
                    alt={`${name} - ${description}`}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{name}</Heading>
                    <Text>{description}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <AddRemoveCartButton
                    productId={id}
                    cart={cart}
                    onClick={handleProductCartChange}
                  />
                </CardFooter>
              </Card>
            );
          })}
          <Spacer />
          <br />
          <Divider orientation="horizontal" />
          <Textarea
            placeholder="Add notes for the order here"
            size="sm"
            resize="vertical"
            onChange={handleChange}
          />

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
        </SimpleGrid>
      </form>
    </Flex>
  );
}
