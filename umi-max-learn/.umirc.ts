import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  define: { MY_TOKEN: process.env.MY_TOKEN },
  // mock: false,
  request: {
    dataField: 'data',
  },
  clientLoader: {},
  layout: {
    title: '@umijs/max learn',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: 'clientLoader',
      path: '/clientLoader',
      component: './ClientLoader',
    },
    {
      name: '地图可视化',
      path: '/mapView',
      component: './MapView',
    },
    {
      name: 'Zoomify 可视化',
      path: '/zoomifyView',
      component: './ZoomifyView',
    },
  ],
  npmClient: 'pnpm',
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx'],
  },
});
