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
import { useNavigate } from "react-router-dom";

export default function IncompleteOrderCard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    const splitId = e.target.id.split(",");
    const householdId = splitId[0];
    const orderId = splitId[1];
    const completedAt = new Date().toISOString();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/households/${householdId}/orders/${orderId}/complete`,
        { completedAt }
      )
      .then(() => {
        toast({
          title: "Congrats! Order completed",
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
      .finally(() => {
        setIsLoading(false);
        navigate("/orders");
      });
  };

  const {
    selectedRecipientName,
    cart,
    familyCount,
    notes,
    householdId,
    orderId,
    placedAt,
  } = props.order;
  const parsedDate = new Date(placedAt);
  return (
    <Card size="sm" maxW="250px" minW="250px" key={6}>
      <CardHeader>
        <Heading size="md">{selectedRecipientName}</Heading>
        <Text>{familyCount} family member(s)</Text>
        <Text>
          Placed at:{" "}
          {parsedDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
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
      {notes && (
        <div>
          <Divider />
          <Heading size="sm">Notes</Heading>
          <Text>{notes}</Text>
        </div>
      )}
      <Divider />
      <CardFooter>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          onClick={handleOnClick}
          id={`${householdId},${orderId}`}
          mr={5}
        >
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
}
