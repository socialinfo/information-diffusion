<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" errorPage="/error/error.jsp"%>
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
<title>dynamic simulation</title>
<link href="<%=basePath%>/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="<%=basePath%>/css/diffusion.css" rel="stylesheet">
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>
<script src="<%=basePath%>/js/epidemic/drawmodel.js"></script>

<script src="<%=basePath%>/js/d3.min.js"></script>
</head>
<body>
<div class='container'>
<div class ='row'>
<div class='col-lg-5 col-md-5'>
    	<div class="panel panel-success">
    	 <div class="panel-heading">
		    <h3 class="panel-title">选择模型</h3>
		    <a href='#' id='tooltips'>提示</a>
		  </div>
		  <div class="panel-body" id='formpanel'>
		    <form class="form-horizontal" id='drawmodelform'>
		     <div class="form-group">
		     <label for="TYPE" class="col-sm-4 control-label">模型类型</label>
		    <div class="col-sm-6">
		      <select id='TYPE' class="form-control" name='type'>
				  <option>SI</option>
				  <option>SIR</option>
				  <option>SIS</option>
				  <option>SIRS</option>
				</select>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="N0" class="col-sm-4 control-label">N0(总人数)</label>
		    <div class="col-sm-4">
		      <input type="text" class="form-control" name='N0' id="N0">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="I0" class="col-sm-4 control-label">I0(初始感染人数)</label>
		    <div class="col-sm-4">
		      <input type="text" name='I0' class="form-control" id="I0">
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="R0" class="col-sm-4 control-label">R0(初始康复人数)</label>
		    <div class="col-sm-4">
		      <input type="text" name='R0' class="form-control" disabled id="R0">
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="alpha" class="col-sm-4 control-label">alpha</label>
		    <div class="col-sm-4">
		      <input type="text" name='alpha' class="form-control" disabled id="alpha">
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="beta" class="col-sm-4 control-label">beta</label>
		    <div class="col-sm-4">
		      <input type="text" name='beta' class="form-control" id="beta">
		    </div>
		  </div>
		   <div class="form-group">
		    <label for="gamma" class="col-sm-4 control-label">gamma</label>
		    <div class="col-sm-4">
		      <input type="text" name='gamma' class="form-control" disabled id="gamma">
		    </div>
		  </div>
		 
		  
</form>
</div>
<button  class="btn btn-primary btn-lg btn-block" id='startDraw'>开始绘制</button>
</div>
</div>
<div class='col-lg-7 col-md-7'>
	<div id='svgpanel'>
		
	</div>
</div>
</div>
</div>

<div class='hidden tooltips' id='tooltippanel'>
<img src='img/SIModel.png' id='tooltippanelimg'>
</div>
</body>
</html>