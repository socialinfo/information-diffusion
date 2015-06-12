		console.log("Begin!");
		var width = 1200, height = 600
		var force = d3.layout.force().charge(-120).linkDistance(30).size(
				[ width, height ])
		var svg = d3.select("body").append("svg").attr("width", width).attr(
				"height", height)
		var CountThreshold = 0.5
		var cur_node = 0
		var datainfo
		var nodes_info
		var edges_info
		var nodearray;

		d3.json('json/output2.json', function(error, data) {
			if (error) {

				console.log(error)
			}
		force
      .nodes(data.nodes)
      .links(data.links)
      .start();
  
  var link = svg.selectAll(".link")
      .data(data.links)
      .enter().insert("line", ".node")
      .attr("class", "link").style("stroke", "#A4D3EE").style("stroke-width", 3);;
  

  var node = svg.selectAll(".node")
      .data(data.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr('id',
					function(d) {
						return 'n' + d.name
					})
      .style("fill", '#000000')
      .call(force.drag);
		
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
		});

		readAction();

		function readAction() {
			d3.json('json/Action.json', function(error, data) {
				Action = data
			})
		}

		var handle = setInterval(Cascade, 2000);
		function Cascade() {
			cur = Action[cur_node]
			var color_active = '#00FF00'/* 红色 */
			var color_stop = '#FF0000'/* 绿色 */
			var color
			$.each(cur, function(i, value) {
				var color
				var status
				id = '#n' + value[0]
				var selectnode = d3.select(id)
				if (value[1] == '65') {color = color_active}
					else
						{color = color_stop;}
				selectnode.style('fill', color);

			});
			cur_node = cur_node + 1
			console.log(cur_node + '  ' + Action.length)
			if (cur_node >= Action.length) {
				clearInterval(handle)
				console.log('clear interval')
			}
		}
