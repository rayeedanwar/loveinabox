import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function TableWrapper({ caption, data }) {
  if (data.length === 0) return <p>No data :(</p>; // probs should be loading state

  // typing would be better to handle nulls, won't matter if I use a table component that handles these issues
  // also would remove table primary key as they're useless to a user
  // column ordering needs to be handled
  const keys = Object.keys(data[0]);

  return (
    <TableContainer>
      <Table variant="simple">
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            {keys.map((key) => (
              <Th>{key}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((arrayObject) => {
            const rows = keys.map((key) => <Td>{arrayObject[key]}</Td>);
            return <Tr>{rows}</Tr>; // availability needs improving
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            {keys.map((key) => (
              <Th>{key}</Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
