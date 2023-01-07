import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Table from "../components/TableWrapper";
import AddRecipient from "../components/AddRecipient";
import Layout from "../components/Layout";

const baseURL = `${process.env.REACT_APP_API_URL}/households`;

export default function RecipientsPage() {
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) {
          setHouseholds(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tableRowData = [];
  if (households.length > 0) {
    households.forEach(({ members, ...rest }) => {
      members.forEach((member) => {
        tableRowData.push({ ...member, ...rest });
      });
    });
  }

  const dataTransform = (recipientsData) =>
    recipientsData.map(
      ({
        name,
        householdId,
        adultCount,
        childCount,
        ...remainingProperties
      }) => {
        return {
          name: (
            <Link
              to={`/households/${householdId}`}
              state={{
                selectedRecipientName: name,
                ...households.find((house) => house.householdId == householdId),
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
    <Layout title="Here be yer recipients">
      <AddRecipient />
      <Table data={tableRowData} dataTransform={dataTransform} />
      <Outlet />
    </Layout>
  );
}
