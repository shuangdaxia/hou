$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    //定义时间美化过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDay());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    var q = {
        pagenum: 1, //页码,默认为1
        pagesize: 5, //每页显示的条数
        cate_id: '', //文章分类
        state: '' //文章的发布状态
    }

    initTableList();
    initCate();

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
                // console.log(res);
                var htmlStr = template('art_list', res);
                $('#list_tbody').html(htmlStr);
                //列表渲染成功后渲染分页
                renderPage(res.total);

            }
        })
    }
    //加载文章分类方法
    function initCate() {
        $.ajax({
            type: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return msg(res.message);
                }
                var htmlStr = template('sele_opt', res);
                $('#cate_se').html(htmlStr);
                //重新渲染表单
                form.render();

            }
        })
    }
    //筛选表单绑定事件
    $('#form-search').on('submit', function(e) {
            e.preventDefault();
            //获取表单中选中的值
            var cate_id = $('[name=cate_id]').val();
            var state = $('[name=state]').val();
            //为查询对象赋值
            q.cate_id = cate_id;
            q.state = state;
            //根据最新筛选条件渲染文章列表
            initTableList();
        })
        //渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //分页容器
            count: total, //总条数
            limit: q.pagesize, //每页条数
            curr: q.pagenum, //默认起始页
            limits: [2, 3, 4, 5],
            /*layout自定义排版。可选值有：count（总条目输区域）、prev（上一页区域）、
            page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）*/
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            //点击切换回调,触发回调方式两种  点击页码，只要调用了laypage.render方法
            jump: function(obj, first) {
                //将最新的页码值给配置对象
                q.pagenum = obj.curr;
                //每页展示的数据条数
                q.pagesize = obj.limit;
                if (!first) {
                    initTableList();
                }
            }
        })

    }


})