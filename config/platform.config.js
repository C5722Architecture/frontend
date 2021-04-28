
// 菜单权限：true(开启) false(关闭)
// let GLOBAL_MENU_PERMISSION;
// if (process && process.env.NODE_ENV === 'development') {
//     GLOBAL_MENU_PERMISSION = false;
// } else {
//     GLOBAL_MENU_PERMISSION = true;
// }

module.exports = {
    // 数据请求api
    apiPrefix: "http://localhost:8088" || '',
    iframePrefix: document.head.dataset.iframe || '',
    loginLogo: 'logo_blue_1024.png',
    sysLogo: 'logo.png',
    // 登录页名称
    loginName: 'Gym system',
    // 系统名称
    sysName: 'Gym system',
    // 版权
    copyright: "2019 mpw0311@163.com.",
    // 是否开启菜单权限校验
    menuPermission: true,
    // table默认一页条数
    pageSize: 10,
    // iconFont 地址
    iconUrl: '//at.alicdn.com/t/font_1030595_depmdbpf3yc.js',
    // 系统默认首页
    sysDefultPage: {
        pathname: '/sys/users',
        state: {
            key: 'users',
            pathtitles: [{ title: 'user', icon: 'user' }],
        }
    },
};