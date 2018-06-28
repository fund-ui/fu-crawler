<!doctype html>
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/layout.css" />
  </head>
  <body>
    <h1>Private Equity Crawler</h1>
    <ul>
      <li><a href="./">Home</a></li>
      <li><a href="./news">News</a></li>
      <li><a href="./market">Market</a></li>
      <li><a href="./uploader">Uploader</a></li>
    </ul>
    <div class="content">
        {% block content %}{% endblock %}
    </div>
  </body>
</html>