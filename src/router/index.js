import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/text_transform',
      name: 'TextTransform',
      component: () => import('../views/TextTransform.vue'),
    },
    {
      path: '/text_analyzer',
      name: 'TextAnalyzer',
      component: () => import('../views/TextAnalyzer.vue'),
    },
    {
      path: '/text_afix',
      name: 'TextAfix',
      component: () => import('../views/TextAfix.vue'),
    },
    {
      path: '/lorem_generator',
      name: 'LoremGenerator',
      component: () => import('../views/LoremGenerator.vue'),
    },
    {
      path: '/password_generator',
      name: 'PasswordGenerator',
      component: () => import('../views/PasswordGenerator.vue'),
    }
  ],
})

export default router
