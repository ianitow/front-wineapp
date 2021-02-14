export function getCustomersWithSearching(state) {
  const customers = [];
  state.customers.forEach(customer => {
    if (customer.name.toLowerCase().includes(state.searching.toLowerCase())) {
      customers.push(customer);
    }
  });
  return customers;
}
