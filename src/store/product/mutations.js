export function GET_PRODUCTS_REQUEST_SUCCESS(state, {
  products,
}) {
  state.products = products;
}

export function SET_SEARCH_STRING(state, text) {
  state.searching = text;
}
