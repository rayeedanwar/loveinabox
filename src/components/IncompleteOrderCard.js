import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  List,
  UnorderedList,
  ListItem,
  CardFooter,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function IncompleteOrderCard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleOnClick = (e) => {
    const householdId=e.target.id.split(",")[0]
    const orderId=e.target.id.split(",")[1]
    const completedAt= new Date().toISOString()
    axios
    .post(
      `${process.env.REACT_APP_API_URL}/households/${householdId}/orders/${orderId}/complete`,
      {completedAt}
    )
    .then(() => {
      toast({
        title: "Congrats! Order completed", // order number might be useful with link to order
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
  
    // should patch order with complete status, ie /househouldId/orders/orderId
  };

  const{selectedRecipientName, cart, familyCount, notes, householdId, orderId} = props.order
  return (
    <Card size="sm" maxW="250px" minW="250px" key={6}>
      <CardHeader>
        <Heading size="md">{selectedRecipientName}</Heading>
        <Text>{familyCount} family member(s)</Text>
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
        {notes && (
          <div>
            <Text>Notes</Text>
            <Text>{notes}</Text>
          </div>
        )}
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          onClick={handleOnClick}
          id={`${householdId}, ${orderId}`}
          mr={5}
        >
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
}