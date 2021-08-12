export function GET_ORDERS_REQUEST_SUCCESS(state, {
  orders,
}) {
  state.orders = orders;
}

export function SET_SEARCH_STRING(state, text) {
  state.searching = text;
}
