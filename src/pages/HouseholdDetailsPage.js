import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  StackDivider,
  Text,
  IconButton,
  Grid,
  GridItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function HouseholdDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedRecipientName,
    members,
    address,
    adultCount,
    childCount,
    orders = [],
  } = location.state;

  const selectedRecipient = members.find(
    (member) => member.name === selectedRecipientName
  );
  const remainingMembers = members.filter(
    (member) => member.name !== selectedRecipientName
  );

  return (
    <Layout>
      {
        // maybe remove title and leave personal details card at top, with name in title of that card
        // button to add recipient specifically to this household hmmm
      }
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Flex direction="column">
            <Card>
              <CardHeader>
                <Heading>{selectedRecipient.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>Contact number: {selectedRecipient.contactNumber}</Text>
                <Text>Email: {selectedRecipient.email}</Text>
              </CardBody>
            </Card>
            <Spacer />
            <Card>
              <CardHeader>
                <Heading>Household Details</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Address
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {address}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Total members of the household
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {adultCount + childCount} ({adultCount} adults
                      {childCount > 0 && `, ${childCount} children`})
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Other registered members
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {remainingMembers.length > 0
                        ? remainingMembers.forEach((member) => member.name) // maybe link to their person page?
                        : "None"}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <Card>
            <CardHeader>
              <Heading>Orders</Heading>
              <IconButton
                aria-label="Search database"
                icon={<AddIcon />}
                onClick={() => navigate("orders/new")}
              />
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Total
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {orders.length}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    History
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {orders.length > 0
                      ? orders.map((element, index) => (
                          <Text>
                            {index + 1}. {element.completedAt ?? "Not complete"}
                          </Text>
                        ))
                      : "No orders"}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Layout>
  );
}
