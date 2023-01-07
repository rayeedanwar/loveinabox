import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddRecipient from "../components/AddRecipient";
import Layout from "../components/Layout";

export default function HouseholdDetailsPage() {
  const location = useLocation();
  const { selectedRecipientName, members, address, adultCount, childCount } =
    location.state;
  const { householdId } = useParams();

  const selectedRecipient = members.find(
    (member) => member.name === selectedRecipientName
  );
  const remainingMembers = members.filter(
    (member) => member.name !== selectedRecipientName
  );

  return (
    <Layout title={selectedRecipientName}>
      {
        // button to add recipient specifically to this household hmmm
      }
      <Box>
        Personal Details: Contact number: {selectedRecipient.contactNumber}
        Email: {selectedRecipient.email}
      </Box>
      <Box>
        Household Details: Address: {address}
        Total members of the household: {adultCount + childCount} ({adultCount}{" "}
        adults{childCount > 0 && `, ${childCount}children`})
      </Box>

      <Box>Other registered recipients at household</Box>
      <Box>
        Orders
        <Box>Actions: add order</Box>
        <Box>Previous orders</Box>
      </Box>
      <AddRecipient />
    </Layout>
  );
}
