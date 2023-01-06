import { Heading } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  return (
    <div>
      <Heading size="3xl" margin="5%" padding="5%">
        {title}
      </Heading>
      {children}
    </div>
  );
}
