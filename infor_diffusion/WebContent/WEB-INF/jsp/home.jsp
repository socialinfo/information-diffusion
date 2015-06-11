<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="<%=basePath%>/bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>
</head>
<body>
<div class='container'>
	<div class='row'>
	<div class='col-lg-2'></div>
		<div class="jumbotron col-lg-8">
			<div class='center-block'>
			<h2>Twitter社交网络中关键节点对信息传播的作用</h2>
			  <h2>---信息传播模型</h2>
			  <ul>
			  <li>羊群效应</li>
			  <li>瀑布模型</li>
			  <li>创新传播</li>
			  <li>传染病模型</li>
			  </ul>
			  <h2>---应用场景</h2>
			<ul>
			<li>研究 twitter 社交网络中的信息传播</li>
			<li>找出传播過程中影响力较大的节点</li>
			<li>研究这些节点在传播中的影响</li>
			</ul>
			
			 
			  </div>
		</div>
	<div class='col-lg-2'></div>
	</div>
	<div class="container marketing">
      <footer>
        <p>@2015 社交媒体大数据挖掘--第14组课程大作业 <a href="http://snap.stanford.edu/data/higgs-twitter.html">.数据来源.</a></p>
      </footer>    
</div>
</div>

</body>
</html>