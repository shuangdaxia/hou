//每次调用   get  post  ajax  的时候,会先调用ajaxPrefilter这个函数,在这个函数里可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起请求之前,统一配置根路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url;
    //配置有权限的接口
    if (options.url.indexOf('/my') !== -1) {
        options.headers = { 'Authorization': localStorage.getItem('token') || '' };
    }
    // //全局配置回调complete函数
    // options.complete = function(res) {
    //     //console.log(res);
    //     //res.responseJSON获取服务器响应的数据
    //     if (res.responseJSON.status === 1) {
    //         //清空本地存储
    //         localStorage.removeItem('token');
    //         //强制跳转到登录页面
    //         location.href = '/login.html';
    //     }
    // }


})