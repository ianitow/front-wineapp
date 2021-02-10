export function GET_CUSTOMERS_REQUEST_SUCCESS(state, { customers }) {
  state.customers = customers;
}

export function SET_SEARCH_STRING(state, text) {
  state.searching = text;
}
