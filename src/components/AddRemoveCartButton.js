import { Button } from "@chakra-ui/react";
import isProductInCart from "../utils/isProductInCart";

export default function AddRemoveCartButton({ cart, productId, onClick }) {
  const isInCart = isProductInCart(cart, productId);
  const buttonText = isInCart ? "Remove from cart" : "Add to cart";
  const colorScheme = isInCart ? "red" : "teal";

  return (
    <Button
      id={productId}
      variant="ghost"
      colorScheme={colorScheme}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
