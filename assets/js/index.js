$(function() {
    getUserInfo();
    //退出按钮功能
    var layer = layui.layer;
    $('#btnLogOut').on('click', function() {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function(index) {
            //确定按钮
            //清空本地存储
            localStorage.removeItem('token');
            location.href = '/login.html';
            //关闭弹出窗
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: 'my/userinfo',
        //配置头部信息
        //headers: { 'Authorization': localStorage.getItem('token') || '' },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                //渲染头像方法
                renderAvatar(res.data);
            }
            //无论请求失败成功之后都会调用这个回调函数
            /*complete: function(res) {
                //console.log(res);
                //res.responseJSON获取服务器响应的数据
                if (res.responseJSON.status === 1) {
                    //清空本地存储
                    localStorage.removeItem('token');
                    //强制跳转到登录页面
                    location.href = '/login.html';
                }

            }*/
    });

}
//渲染头像方法
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    //渲染用户头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        //没有头像
        $('.layui-nav-img').hide();
        //toUpperCase()转为大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }

}