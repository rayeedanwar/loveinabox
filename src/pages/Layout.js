import { Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Layout({ title, children }) {
  return (
    <div>
      <Navbar />
      <Heading size="3xl" margin="10" padding="20">
        {title}
      </Heading>
      {children}
    </div>
  );
}
