export default function isItemInCart(cart, itemId) {
  const foundProductId = cart.find((cartItem) => cartItem.itemId === itemId);
  return foundProductId ? true : false;
}
