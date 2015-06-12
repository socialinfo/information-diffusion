<<<<<<< HEAD
/**
 * 
 */
var handle1
var handle
var jsonFile = 'links.txt'
$(document).ready(function(){
        var width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight - 300;

		var color = d3.scale.category20();

		var force = d3.layout.force().charge(-250).linkDistance(100).size(
				[ width, height ]);

		var svg = d3.select("body").append("svg").attr("width", width).attr(
				"height", height);
		var keynode = [10,3,2,12,13,14,15,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,43,44,48,49,51,55,58,64,68,69,70,71,72,47,11,57,59,60,61,62,63,65,66,73,74,75,76,39,54,16,41,56,40,42]
		var curkeynode = 0
		var curkeynode1 = 0
		var keynode1 = [63,36,21,56]

		d3.json("json/cascades/miserables.json", function(error, graph) {
			force.nodes(graph.nodes).links(graph.links).start();

			var link = svg.selectAll(".link").data(graph.links).enter().append(
					"line").attr("class", "link").style("stroke-width",
					function(d) { /*return Math.sqrt(d.value);*/

						return 1.5;
					});

			var node = svg.selectAll(".node").data(graph.nodes).enter().append(
					"circle").attr("class", "node").attr('id', function(d) {
				console.log(d.id)
						return 'n' + d.id;
			}).attr("r", 9).style("fill", function(d) {
				
				return color(1);
			}).call(force.drag);

			node.append("title").text(function(d) {
				return d.name;
			});

			force.on("tick", function() {
				link.attr("x1", function(d) {
					return d.source.x;
				}).attr("y1", function(d) {
					return d.source.y;
				}).attr("x2", function(d) {
					return d.target.x;
				}).attr("y2", function(d) {
					return d.target.y;
				});

				node.attr("cx", function(d) {
					return d.x;
				}).attr("cy", function(d) {
					return d.y;
				});
			});
		//	svg.select("#n22").attr("r", 15).style("fill", "#ff3300")
		});
		
		function changecolor() {
			cur_node_id = keynode[curkeynode]
			var id = "#n" + cur_node_id
			var node = d3.select(id)
			node.attr("r", 12).style("fill", "#ff9922")
			curkeynode = curkeynode + 1
			if (curkeynode >= keynode.length) {
				clearInterval(handle)
				console.log('clear interval')
			}
		}
		function changecolor1() {
			cur_node_id = keynode1[curkeynode1]
			var id = "#n" + cur_node_id
			var node = d3.select(id)
			node.attr("r", 15).style("fill", "#ff3300")
			curkeynode1 = curkeynode1 + 1
			if (curkeynode1 >= keynode1.length) {
				clearInterval(handle1)
				console.log('clear interval')
			}
		}
		
		
		$('#max_spread_of_cascades').on('click',function(){
			var data = 'file='+jsonFile
			$.ajax({
	            cache: true,
	            type: "POST",
	            url:'cascade.do',
	            data:data,
	            async: true,
	            error: function(request) {
	                alert("Connection error");
	            },
	            success: function(data) {
	            	
	            	dataList =  data.list
	            	console.log(dataList)
	            	//alert(dataList)
	            	for(var i=0;i<dataList.length;i++){
	        			var id = "#n" + dataList[i]
	        			var node = d3.select(id)
	        			node.attr("r", 15).style("fill", "#ff3300")
	            	}
	            }
	        });
			$('#outcome').text(' starting!')
//			handle = setInterval(changecolor, 200);
//			handle1 = setInterval(changecolor1,2000);
		})	
		
		
})
=======

/**
 * 
 */
$(document).ready(function(){
        var width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight - 300;

		var color = d3.scale.category20();

		var force = d3.layout.force().charge(-250).linkDistance(100).size(
				[ width, height ]);

		var svg = d3.select("body").append("svg").attr("width", width).attr(
				"height", height);
		var keynode = [63,36,21,56]
		var curkeynode = 0

		d3.json("json/cascades/miserables.json", function(error, graph) {
			force.nodes(graph.nodes).links(graph.links).start();

			var link = svg.selectAll(".link").data(graph.links).enter().append(
					"line").attr("class", "link").style("stroke-width",
					function(d) { /*return Math.sqrt(d.value);*/

						return 1.5;
					});

			var node = svg.selectAll(".node").data(graph.nodes).enter().append(
					"circle").attr("class", "node").attr('id', function(d) {
				console.log(d.id)
						return 'n' + d.id;
			}).attr("r", 9).style("fill", function(d) {
				
				return color(1);
			}).call(force.drag);

			node.append("title").text(function(d) {
				return d.name;
			});

			force.on("tick", function() {
				link.attr("x1", function(d) {
					return d.source.x;
				}).attr("y1", function(d) {
					return d.source.y;
				}).attr("x2", function(d) {
					return d.target.x;
				}).attr("y2", function(d) {
					return d.target.y;
				});

				node.attr("cx", function(d) {
					return d.x;
				}).attr("cy", function(d) {
					return d.y;
				});
			});
		//	svg.select("#n22").attr("r", 15).style("fill", "#ff3300")
		});
		
		function changecolor() {
			cur_node_id = keynode[curkeynode]
			var id = "#n" + cur_node_id
			var node = d3.select(id)
			node.attr("r", 15).style("fill", "#ff3300")
			curkeynode = curkeynode + 1
			if (curkeynode >= keynode.length) {
				clearInterval(handle)
				console.log('clear interval')
			}
		}
		
		$('#max_spread_of_cascades').on('click',function(){

			$('#outcome').text(' starting!')
			var handle = setInterval(changecolor, 1000);
		})
})
>>>>>>> branch 'master' of https://github.com/socialinfo/information-diffusion.git
