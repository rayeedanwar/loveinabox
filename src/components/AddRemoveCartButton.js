import { Button } from "@chakra-ui/react";
import isItemInCart from "../utils/isItemInCart";

export default function AddRemoveCartButton({ cart, itemId, onClick }) {
  const isInCart = isItemInCart(cart, itemId);
  const buttonText = isInCart ? "Remove from cart" : "Add to cart";
  const colorScheme = isInCart ? "red" : "teal";

  return (
    <Button
      id={itemId}
      variant="ghost"
      colorScheme={colorScheme}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
