import { Button, ButtonGroup, Flex, Image, Spacer } from "@chakra-ui/react";

// logo
// https://www.flaticon.com/free-icon/open-box_1083057?related_id=1082955&origin=search

export default function Navbar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" bg="teal">
      <Image src="open-box.png" boxSize="20" objectFit="contain" margin={5} />

      <Spacer />
      {
        // add menu for smaller viewports
      }
      <ButtonGroup>
        <Button>Volunteers</Button>
        <Button>Recipients</Button>
        <Spacer />
        <Button>Orders</Button>
        <Spacer />
        <Button>Products</Button>
      </ButtonGroup>
    </Flex>
  );
}
