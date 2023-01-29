import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Box,
  Text,
  Input,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Table from "../components/TableWrapper";
import AddRecipient from "../components/AddRecipient";
import Layout from "../components/Layout";
import { useState } from "react";

export default function RecipientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useLoaderData();

  const flatData = [];
  if (data.length > 0) {
    data.forEach(({ members, ...rest }) => {
      members.forEach((member) => {
        flatData.push({ ...member, ...rest });
      });
    });
  }

  let tableRowData = flatData;
  if (searchTerm.length > 0) {
    tableRowData = flatData.filter((recipient) =>
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const dataTransform = (recipientsData) =>
    recipientsData.map(
      ({
        name,
        householdId,
        adultCount,
        childCount,
        orders,
        ...remainingProperties
      }) => {
        return {
          name: (
            <Link
              to={`/households/${householdId}`}
              state={{
                selectedRecipientName: name,
                orders,
                ...data.find((house) => house.householdId == householdId),
              }}
            >
              {name}
            </Link>
          ),
          ...remainingProperties,
          "Number of family members": (
            <Accordion allowToggle borderColor="white">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {adultCount + childCount}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Number of adults: {adultCount}</Text>
                  <Text>Number of children: {childCount}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ),
        };
      }
    );
  // make data transform a pure function

  // table needs a group by household button
  // table needs an ability to search
  return (
    <Layout title="Recipients">
      <Flex maxWidth="450px" margin="auto">
        <AddRecipient />
        <Spacer />
        <Input
          placeholder="Search name"
          value={searchTerm}
          onChange={handleSearch}
          maxWidth="300px"
        />
      </Flex>
      <Table data={tableRowData} dataTransform={dataTransform} />
      <Outlet />
    </Layout>
  );
}
