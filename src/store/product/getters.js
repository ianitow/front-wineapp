export function getProductsByGroup(state) {
  const groups = [];
  state.products.forEach(product => {
    if (!groups[product.name]) groups[product.name] = [];

    groups[product.name].push(product);
  });
  return groups;
}
