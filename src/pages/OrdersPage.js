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
} from "@chakra-ui/react";
import { partition } from "../utils/partition";

export default function OrdersPage() {
  const { data } = useLoaderData();

  const [completeOrders, incompleteOrders] = partition(
    data,
    (order) => order.complete == true
  );

  const columnCount = 5;
  return (
    <Layout title="Here be yer orders">
      <SimpleGrid gridTemplateColumns={`repeat(${columnCount}, 1fr)`} gap="1em">
        {incompleteOrders.map(
          (order, index) => {
            if (index < columnCount - 1) {
              return (
                <IncompleteOrderCard order={order}/>
              )
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
