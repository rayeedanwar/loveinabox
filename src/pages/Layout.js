import { Heading } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  return (
    <div>
      <Heading size="3xl">{title}</Heading>
      {children}
    </div>
  );
}
