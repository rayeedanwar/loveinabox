import { Heading } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  return (
    <div>
      <Heading size="3xl" margin="10" padding="20">
        {title}
      </Heading>
      {children}
    </div>
  );
}
