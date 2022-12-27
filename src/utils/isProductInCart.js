export default function isProductInCart(cart, productId) {
  const foundProductId = cart.find((id) => id === productId);
  return foundProductId ? true : false;
}
