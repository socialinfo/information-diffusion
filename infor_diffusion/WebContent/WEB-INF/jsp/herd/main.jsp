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
<title>HerdDiffusion</title>
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>
<script src="<%=basePath%>/js/d3.min.js"></script>
<link href="<%=basePath%>/css/herd.css" rel="stylesheet">
<style>
</style>
</head>
<body>
	<div id='div_mainwindow' style="">
		<div id='div_control'>
			<button id='readkeynode'>Read Key Node</button>
			<button id='startdiffusion'>Start Diffusion</button>
		</div>
		<div id='div_graph'></div>
	</div>
	<script src="<%=basePath%>/js/Herd/herddiffusion.js"></script>

</body>
</html>