$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            nickname: function(value) {
                if (value.lenght > 6) {
                    return "昵称长度必须1-6个字符之间";
                }
            }
        })
        //修改密码密码验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位,不能出现空格'],
        //新旧密码不能一致规则
        sanmePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return alert("新旧密码不能一致");
            }
        },
        //确认密码与修改密码不一致规则
        redPwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return alert("密码不一致");
            }

        }


    })
    initUserInfo();
    //修改用户信息获取用户基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: 'my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    //获取信息失败
                    return layer.msg(res.message);
                }
                //成功
                //console.log(res.data);
                //给表单赋值layui中的方法
                form.val('formUserInfo', res.data);
            }
        })
    }
    //修改用户信息重置表单按钮事件
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();
        })
        //修改用户信息提交表单按钮事件
    $('#userInfo-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                //console.log(res);
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                //initUserInfo();
                //更新主页面上的显示信息
                window.parent.getUserInfo();
                layer.msg(res.message);
            }
        })
    })

    //修改密码表单提交方法
    $('#userpasswod-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#userpasswod-form')[0].reset();
            }
        })
    })



})