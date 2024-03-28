import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        component: () => import('@/layouts/Default.vue'),
        children: [
          {
            path: '',
            name: 'Main',
            component: () => import('@/views/Main.vue'),
          },
        ],
      },
  ],
});

export default router;
