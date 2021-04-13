$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initEditor();
    initCate();
    //加载文章分类的方法
    function initCate() {
        $.ajax({
            type: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('初始化失败');
                }
                //模板引擎渲染分类信息
                var htmlStr = template('tpl-case', res);
                $('#sele').html(htmlStr);
                //动态渲染下拉表单，需要重新加载表单
                form.render();

            }
        })
    }
    //初始化图片裁剪区
    var $image = $('#image');
    //裁剪选项
    var options = {
        aspecRation: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options);
    //选择封面绑定点击事件
    $('#btnChooseImage').on('click', function() {
            //模拟隐藏文本选择框点击
            $('#coverFile').click();
        })
        //为选择文件按钮绑定change事件
    $('#coverFile').on('change', function(e) {
            // 获取到文件的列表数组
            var files = e.target.files
                // 判断用户是否选择了文件
            if (files.length === 0) {
                return
            }
            // 根据文件，创建对应的 URL 地址
            var newImgURL = URL.createObjectURL(files[0])
                // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        //定义文章的发布状态
    var art_state = '已发布';
    //为草稿按钮绑定点击事件
    $('#btnSave2').on('click', function() {
            art_state = '草稿';
        })
        //为表单绑定submit事件
    $('#form-pub').on('submit', function(e) {
            e.preventDefault();
            //基于表单，创建formData对象
            var fd = new FormData($(this)[0]);
            //在FormData中追加数据
            fd.append('state', art_state);
            //将封面裁剪过后的图片输出为文件对象
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5. 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                        // 6. 发起 ajax 数据请求
                    publishArticle(fd)
                })
        })
        // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: 'my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }

})