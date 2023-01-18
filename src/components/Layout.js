import { Box, Heading } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  return (
    <Box width="80vw" margin="auto">
      {title && (
        <Heading size="3xl" margin="5%">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
}
