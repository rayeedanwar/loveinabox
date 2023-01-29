import IncompleteOrderCard from "../components/IncompleteOrderCard";
import Table from "../components/TableWrapper";
import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";
import {
  Card,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { partition } from "../utils/partition";

export default function OrdersPage() {
  const { data } = useLoaderData();

  const compareFn = (a, b) => {
    // probs need to refactor this
    // .completedAt is only present if the order has been completed
    // comparing .completedAt to placedAt doesn't make sense
    // ordering should:
    // completed orders: most recent first
    // incomplete orders: oldest first
    const dateToBeOrderedFirst = a.completedAt
      ? new Date(a.completedAt)
      : new Date(b.placedAt);
    const dateToBeSortedSecond = b.completedAt
      ? new Date(b.completedAt)
      : new Date(a.placedAt);
    return dateToBeSortedSecond - dateToBeOrderedFirst;
  };

  const [completeOrders, incompleteOrders] = partition(
    data.sort(compareFn),
    (order) => order.completedAt !== undefined
  );

  // should put this as it's own function
  const dataTransform = (completeOrders) =>
    completeOrders.map(
      ({ cart, selectedRecipientName, familyCount, notes, completedAt }) => {
        const parsedDate = new Date(completedAt);
        return {
          "Date completed": parsedDate.toLocaleDateString("en-GB"),
          "Time completed": parsedDate.toLocaleTimeString("en-GB"),
          selectedRecipientName,
          notes,
          familyCount,
          "Number of items": (
            <Accordion allowToggle borderColor="white">
              <AccordionItem width="inherit">
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {cart.length}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List>
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
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ),
        };
      }
    );

  const columnCount = 5;
  return (
    <Layout title="Orders">
      <SimpleGrid gridTemplateColumns={`repeat(${columnCount}, 1fr)`} gap="1em">
        {incompleteOrders.map((order, index) => {
          if (index < columnCount - 1) {
            return <IncompleteOrderCard order={order} />;
          }
        })}
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
      <Table
        caption="Completed Orders"
        data={completeOrders}
        dataTransform={dataTransform}
      />
    </Layout>
  );
}
