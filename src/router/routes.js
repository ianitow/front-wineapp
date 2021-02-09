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
        name: 'Clients',
        path: 'clients',
        component: () => import('pages/Clients.vue'),
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
