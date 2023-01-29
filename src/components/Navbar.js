import { Button, ButtonGroup, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

// logo
// https://www.flaticon.com/free-icon/open-box_1083057?related_id=1082955&origin=search

const NavButton = ({ routeTo, text, currentRoute }) => {
  const location = useLocation();
  const isActiveRoute = routeTo === location.pathname;
  return (
    <Link to={routeTo}>
      <Button
        bgColor={`teal${isActiveRoute && ".900"}`}
        color={isActiveRoute ? "white" : "black"}
      >
        {text}
      </Button>
    </Link>
  );
};

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
        <NavButton routeTo="/recipients" text="Recipients" />
        <NavButton routeTo="/orders" text="Orders" />
        <NavButton routeTo="/items" text="Items" />
      </ButtonGroup>
    </Flex>
  );
}
