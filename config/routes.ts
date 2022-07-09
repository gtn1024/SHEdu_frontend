export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/Register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/home', name: '首页', icon: 'smile', component: './Home', layout: 'top' },
  { path: '/course', name: '课程', icon: 'smile', component: './Course', layout: 'top' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
