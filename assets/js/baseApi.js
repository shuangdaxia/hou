//每次调用   get  post  ajax  的时候,会先调用ajaxPrefilter这个函数,在这个函数里可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起请求之前,统一配置根路径
    options.url = 'http://api-breakingnews-web.itheima.net/api' + options.url;
    console.log(options.url);

})