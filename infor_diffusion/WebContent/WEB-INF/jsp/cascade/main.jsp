<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
.node {
	stroke: #fff;
	stroke-width: 1.5px;
}

.link {
	stroke: #999;
	stroke-opacity: .6;
}
</style>
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/js/d3.min.js"></script>

<title>Insert title here</title>
</head>
<body>

	<div>
		<button id='max_spread_of_cascades'>maximizing the spread of
			cascades</button>
		<h2 id='outcome'>this is a header</h2>
	</div>
		
	<script src="<%=basePath%>/js/cascades/show.js"></script>		
	
</body>
</html>
