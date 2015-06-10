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
<script src="<%=basePath%>/js/d3.min.js"></script>
<script src="<%=basePath%>/js/cascades/button.js"></script>
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<title>Insert title here</title>

</head>
<body>

<div>
	<button id='max_spread_of_cascades'>maximizing the spread of cascades</button>
	<h2 id='outcome'>this is a header</h2>
</div>

 
<script>

//var width = 960,
//   height = 700;
var width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight-300;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-170)
    .linkDistance(100)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("json/cascades/miserables.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 9)
      .style("fill", function(d) { return color(1); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});

</script>
</body>
</html>