{% extends "base.tpl" %}

{% block content %}
<h2>{{ state }}</h2>
<h3>文件上传-同步</h3>
<form name="synForm" method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
  title: <input type="text" name="title" />
  file: <input type="file" name="file"/>
  <button type="submit">上传</button>
</form>
<h3>文件上传-异步</h3>
<form name="asynForm" enctype="multipart/form-data">
  title: <input type="text" name="title">
  file: <input type="file" name="file">
  <input type="button" value="上传" onclick="upload()" />
</form>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
  // Jquery
  {# function upload() {
      var title = document.asynForm.title.value;
      var file = document.asynForm.file.files[0];
      var fm = new FormData();
      fm.append('title', title);
      fm.append('file', file);
      $.ajax({
        url: '/uploadAjax?_csrf={{ ctx.csrf | safe }}',
        type: 'POST',
        data: fm,
        contentType: false, //禁止设置请求类型
        processData: false, //禁止jquery对DAta数据的处理,默认会处理
        //禁止的原因是,FormData已经帮我们做了处理
        success: function (result) {
            //测试是否成功
            //但需要你后端有返回值
            console.log(result);
        }
      });
  } #}
  // 原生
  function upload() {
      var title = document.asynForm.title.value;
      var file = document.asynForm.file.files[0];
      var fm = new FormData();
      fm.append('title', title);
      fm.append('file', file);
      var request = new XMLHttpRequest();
      request.open('POST', '/uploadAjax?_csrf={{ ctx.csrf | safe }}');
      request.send(fm);
  }
</script>
{% endblock %}