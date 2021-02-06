export function getProductsByGroup(state, getters) {
  const groups = [];
  state.products.forEach(product => {
    if (product.name.toLowerCase().includes(getters.getSearchString.toLowerCase())) {
      if (!groups[product.name]) {
        groups[product.name] = [];
      }

      groups[product.name].push(product);
    }
  });
  return groups;
}

export function getSearchString(state) {
  return state.searching;
}
