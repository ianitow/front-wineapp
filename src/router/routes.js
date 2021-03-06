const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        name: 'Products',
        path: 'products',
        component: () => import('pages/Products.vue'),
      },
      {
        name: 'Customers',
        path: 'customers',
        component: () => import('pages/Customers.vue'),
      },
      {
        name: 'Orders',
        path: 'orders',
        component: () => import('pages/Orders.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    name: 'LoginForm',
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
    name: 'RegisterForm',
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
