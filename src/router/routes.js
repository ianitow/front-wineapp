const routes = [
  {
    path: '/',
    component: () => { return import('layouts/MainLayout.vue'); },
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => { return import('pages/Index.vue'); },
      },
      {
        name: 'Products',
        path: 'products',
        component: () => { return import('pages/Products.vue'); },
      },
      {
        name: 'Customers',
        path: 'customers',
        component: () => { return import('pages/Customers.vue'); },
      },
      {
        name: 'Orders',
        path: 'orders',
        component: () => { return import('pages/Orders.vue'); },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => { return import('pages/Login.vue'); },
    name: 'LoginForm',
  },
  {
    path: '/register',
    component: () => { return import('pages/Register.vue'); },
    name: 'RegisterForm',
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => { return import('pages/Error404.vue'); },
  },
];

export default routes;
