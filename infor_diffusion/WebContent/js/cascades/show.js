
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
