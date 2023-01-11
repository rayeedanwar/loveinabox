import { Box, Heading } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  return (
    <Box width="80vw" margin="auto" padding="3%">
      {title && (
        <Heading size="3xl" margin="5%" padding="5%">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
}
