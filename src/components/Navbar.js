import { Button, ButtonGroup, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// logo
// https://www.flaticon.com/free-icon/open-box_1083057?related_id=1082955&origin=search

export default function Navbar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" bg="teal">
      <Link to={`/`}>
        <Image src="open-box.png" boxSize="20" objectFit="contain" margin={5} />
      </Link>

      <Spacer />
      {
        // add boiga menu for smaller viewports
      }
      <ButtonGroup margin={5}>
        <Link to={`/recipients`}>
          <Button>Recipients</Button>
        </Link>
        <Spacer />
        <Link to={`/orders`}>
          <Button>Orders</Button>
        </Link>
        <Spacer />
        <Link to={`/products`}>
          <Button>Products</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}
