$(function() {

    var form = layui.form;
    var indexAdd = null;
    var indexEdit = null;
    initArtCateList();
    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('#tbody').html(htmlStr);

            }
        })
    }
    //添加类别按钮事件
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '300px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            });
        })
        //为添加form绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增失败');
                    }
                    initArtCateList();
                    layer.msg('新增成功');
                    //关闭弹出层
                    layer.close(indexAdd);
                }
            })
        })
        //编辑按钮事件
    $('#tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '300px'],
                title: '添加文章分类',
                content: $('#dialog-edit').html()
            })
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'GET',
                url: 'my/article/cates/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return
                    }
                    form.val('form-edit', res.data);
                }
            })
        })
        //确认修改按钮事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新失败');
                    }
                    layer.msg('更新成功');
                    layer.close(indexEdit);
                    initArtCateList();
                }
            })
        })
        //删除按钮事件
    $('#tbody').on('click', '.btn-dele', function() {
        var id = $(this).attr('data-id');
        //点击确认按钮后的回调函数
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: 'my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        //return console.log(res);
                        return layer.msg(res.message);
                    }
                    layer.msg('删除成功');
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })


})