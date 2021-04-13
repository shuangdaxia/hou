$(function() {
    var layer = layui.layer;
    var q = {
        pagenum: 1, //页码,默认为1
        pagesize: 5, //每页显示的条数
        cate_id: '', //文章分类
        state: '' //文章的发布状态
    }
    initTableList();

    function initTableList() {
        $.ajax({
            type: 'GET',
            url: 'my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //引擎模板渲染页面
                console.log(res);
                var htmlStr = template('art_list', res);
                $('#list_tbody').html(htmlStr);

            }
        })
    }


})