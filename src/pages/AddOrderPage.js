import {
  Text,
  Card,
  CardBody,
  CardFooter,
  Textarea,
  Image,
  Heading,
  Divider,
  Stack,
  useToast,
  Flex,
  List,
  UnorderedList,
  ListItem,
  Icon,
  CardHeader,
  Button,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import AddRemoveCartButton from "../components/AddRemoveCartButton";
import Layout from "../components/Layout";
import isItemInCart from "../utils/isItemInCart";
import { BsFillBasketFill } from "react-icons/bs";
import { useLoaderData, useLocation } from "react-router-dom";

export default function AddOrderPage() {
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { data } = useLoaderData();

  const location = useLocation();
  const { selectedRecipientName, familyCount, householdId } = location.state;

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/households/${householdId}/orders`,
        {
          cart,
          notes,
          householdId,
          selectedRecipientName,
          familyCount,
          placedAt: new Date().toISOString(),
        }
      )
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

  const handleCartChange = (e) => {
    const intTargetId = e.target.id;
    if (isItemInCart(cart, intTargetId)) {
      setCart(cart.filter(({ itemId }) => itemId !== intTargetId));
    } else {
      setCart([...cart, data.find(({ itemId }) => itemId === intTargetId)]); // data outside of scope of function, potential fix needed as not pure function}
    }
  };

  // mock data
  // const productsRes = [
  //   {
  //     id: 1,
  //     name: "Rice",
  //     description: "small",
  //     src: "/rice.jpg", // https://isthisthatfood.com/is-rice-a-grain/
  //   },
  //   {
  //     id: 2,
  //     name: "Shampoo",
  //     description: "big",
  //     src: "/shampoo.jfif",
  //   },
  //   {
  //     id: 3,
  //     name: "Tinned tomatoes",
  //     description: "Family",
  //     src: "/tomatoes.jfif",
  //   },
  // ];

  return (
    <Layout>
      <form onSubmit={handleOnClick}>
        <SimpleGrid gridTemplateColumns="70vw 10vw">
          <Flex flexWrap="wrap">
            {data.map(({ itemId, name, description, src }) => {
              return (
                <Card
                  size="sm"
                  maxW="250px"
                  minW="250px"
                  key={itemId}
                  align="center"
                  name={name}
                >
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
                      itemId={itemId}
                      cart={cart}
                      onClick={handleCartChange}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </Flex>
          <Box>
            <Card size="sm" maxW="250px" minW="250px" key={6}>
              <CardHeader>
                <Icon as={BsFillBasketFill} color="teal" boxSize="50" />
                <Heading size="md">Cart</Heading>
              </CardHeader>
              <Divider />
              <CardBody textAlign="left">
                <List spacing={3}>
                  <UnorderedList>
                    {cart.map(({ name, description }) => {
                      return (
                        <>
                          <ListItem>
                            {name} - {description}
                          </ListItem>
                        </>
                      );
                    })}
                  </UnorderedList>
                </List>
              </CardBody>
              <Divider />
              <CardFooter>
                <Textarea
                  placeholder="Add notes for the order here"
                  size="sm"
                  resize="vertical"
                  onChange={handleChange}
                />
                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleOnClick}
                  mr={5}
                  disabled={cart.length > 0 ? false : true}
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Box>
        </SimpleGrid>
      </form>
    </Layout>
  );
}
