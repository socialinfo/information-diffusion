<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" errorPage="/error/error.jsp"%>
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
<title>dynamic simulation</title>
<link href="<%=basePath%>/bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/js/epidemic/dynamicSim.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>
</head>
<body>
<div class='container'>
<div class='row'>
<div class='col-md-5 col-lg-5'>
	<div class="panel panel-default">
	  <div class="panel-heading">
	    <h3 class="panel-title">动态仿真</h3>
	  </div>
	  <div class="panel-body">
	    <form class="form-horizontal" id='dynamicform'>
		   <div class="form-group">
		    <label for="type" class="col-sm-3 control-label">选择模型:</label>
		    <div class="col-sm-4">
		      <select id='type' name='type' class="form-control">
		      <option>SIR</option>
		      <option>SIS</option>
		      <option>SIRS</option>
		      </select>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="alpha" class="col-sm-3 control-label">alpha:</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" name='alpha' id="alpha" disabled>
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="beta" class="col-sm-3 control-label">beta:</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" id="beta" name='beta'>
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="gamma" class="col-sm-3 control-label">gamma:</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" id="gamma" name='gamma'>
		    </div>
		  </div>
</form>
<button class='btn btn-success btn-lg btn-block' id='startSimulation'>开始仿真</button>
	  </div>
	</div>
</div>
<div class='col-md-7 col-lg-7'>
<img src='' id='dynamicimg'>
</div>
</div>

</div>
</body>
</html>