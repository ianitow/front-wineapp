export function getOrdersWithSearching(state) {
  const orders = [];
  state.orders.forEach(order => {
    if (order.customer_id.name.toLowerCase().includes(state.searching.toLowerCase())) {
      orders.push(order);
    }
  });
  return orders;
}
