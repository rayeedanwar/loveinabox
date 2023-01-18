import Table from "../components/TableWrapper";
import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { partition } from "../utils/partition";

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useLoaderData();
  const handleOnClick = () => {
    // should patch order with complete status, ie /househouldId/orders/orderId
  };

  const [completeOrders, incompleteOrders] = partition(
    data,
    (order) => order.complete == true
  );

  const columnCount = 5;
  return (
    <Layout title="Here be yer orders">
      <SimpleGrid gridTemplateColumns={`repeat(${columnCount}, 1fr)`} gap="1em">
        {incompleteOrders.map(
          ({ selectedRecipientName, cart, familyCount, notes }, index) => {
            if (index < columnCount - 1) {
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
                      mr={5}
                    >
                      Complete
                    </Button>
                  </CardFooter>
                </Card>
              );
            }
          }
        )}
        {incompleteOrders.length > columnCount && (
          <Card size="sm" maxW="250px" minW="250px" alignItems>
            <CardBody textAlign="left">
              <Heading>
                {incompleteOrders.length - columnCount} more order(s) incomplete
                <Text>See more</Text>
              </Heading>
            </CardBody>
          </Card>
        )}
      </SimpleGrid>
      <Table caption="Completed Orders" data={completeOrders} />
    </Layout>
  );
}
