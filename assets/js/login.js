$(function() {
    //登录
    $('#link_login').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //注册账号
    $('#link_reg').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义检验规则
    //从laui获取form表单
    var form = layui.form;
    //layui弹出动画
    var layer = layui.layer;
    //通过form.verify()函数自定以校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        //获取用户输入
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('api/reguser', data, function(res) {
            if (res.status !== 0) {
                //layui弹出动画
                return layer.msg(res.message);
            }
            //layui弹出动画
            layer.msg(res.message);
            $('#link_reg').click();
        })
    })

    //监听登录表单提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'api/login',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                //console.log(res.token);
                layer.msg(res.message);
                //成功跳转到主页
                location.href = 'index.html';
                //将服务器返回的token保存在localStorage中
                localStorage.setItem('token', res.token);
            }
        })
    })

})