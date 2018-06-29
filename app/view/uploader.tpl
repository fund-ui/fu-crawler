{% extends "base.tpl" %}

{% block content %}
<h2>{{ state }}</h2>
{# 单文件同步 #}
<h3>文件上传-同步</h3>
<form name="synForm" method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
  title: <input type="text" name="title" />
  file: <input type="file" name="file"/>
  <button type="submit">上传</button>
</form>{# 单文件异步 #}
<h3>文件上传-异步+progress</h3>
<div id="fu-progress" style="height: 20px;text-align:center"></div>
<form name="asynForm" enctype="multipart/form-data">
  title: <input type="text" name="title">
  file: <input type="file" name="file">
  <input type="button" value="上传" onclick="uploadSingle()" />
</form>
<h3>文件上传-多文件</h3>
<form name="asynFormMult" enctype="multipart/form-data">
  file: <input type="file" name="file" multiple="multiple">
  <input type="button" value="上传" onclick="uploadMulti()" />
</form>

{# <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> #}
<script>
  // 异步单文件
  function uploadSingle() {
      var title = document.asynForm.title.value;
      var file = document.asynForm.file.files[0];
      var fm = new FormData();
      fm.append('title', title);
      fm.append('file', file);
      var request = new XMLHttpRequest();
      request.open('POST', '/uploadAjax?_csrf={{ ctx.csrf | safe }}');
      request.upload.onprogress = function(evt) {
        console.log(evt);
        var percent = (evt.loaded / evt.total).toFixed(2); // => 计算百分比
        var progress = document.getElementById('fu-progress');
            progress.style.width = percent * 300 + 'px';
            progress.style.background = 'skyblue';
      }
      request.onreadystatechange = function(){
          if(request.readyState == 4){
              alert(request.responseText);
          }
      }
      request.send(fm);
  }
  // 异步多文件
  function uploadMulti() {
      var files = document.asynFormMult.file.files;
      var fm = new FormData();
      for(var i=0; i < files.length; i++) {
        fm.append('file', files[i]);
      }
      var request = new XMLHttpRequest();
      request.open('POST', '/uploadMulti?_csrf={{ ctx.csrf | safe }}');
      request.send(fm);
  }
</script>
{% endblock %}