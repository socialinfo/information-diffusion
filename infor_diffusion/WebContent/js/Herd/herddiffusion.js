//height & width of the interactive area
var height = document.getElementById('div_graph').offsetHeight - 100;
var width = document.getElementById('div_graph').offsetWidth - 100;
// var width = 1600;
// var height = 600;
var force = d3.layout.force().charge(-100).linkDistance(30).size(
		[ width, height ])
		.linkStrength(0.1)
	    .friction(0.9)
	    .charge(-100)
	    .gravity(0.1)
	    .theta(0.8)information
	    .alpha(0.1)
console.log(d3.select("div_graph"))
var svg = d3.select("#div_graph").append("svg").attr("width", width).attr(
		"height", height)
var Threshold = 0.5
var cur_node = 0
var nodearray;
var KeyNode;
var nodeMap = {}
var node_id = [];
var cur_node_id
console.log('begin')

function nodes2Map(nodes) {
	nodes.forEach(function(node) {
		nodeMap[node.id] = {
			status : 0,
			pro : node.pro,
			rt : 0
		}
	});
	for ( var key in nodeMap) {
		node_id.push(key);
	}
}

d3.json('json/output1.json', function(error, data) {
	if (error) {
		console.log(error)
	}
	dataset = data

	nodes_data = dataset.nodes
	edges_data = dataset.edges
	force.nodes(nodes_data).links(edges_data)
	force.start()

	edges = svg.append("svg:g").selectAll("line").data(edges_data, function(d) {
		return d.source.id + '-' + d.target.id
	}).enter().append("line").attr('id', function(d) {
		return 'e' + d.source.id + '-' + d.target.id
	}).style("stroke", "#A4D3EE").style("stroke-width", 3);
	// Create nodes as circles
	nodes = svg.append("svg:g").selectAll("circle").data(nodes_data,
			function(d) {
				return d.id;
			}).enter().append("circle").attr('pro', function(d) {
		return d.pro;
	}).attr('class', 'node').attr('status', 0).attr("r", 5).attr('id',
			function(d) {
				return 'n' + d.id
			}).style("fill", '#000000').call(force.drag)
	nodes.append("title").text(function(d) {
		return d.id;
	});

	force.on("tick", function() {

		edges.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		nodes.attr("cx", function(d) {
			return d.x;
		}).attr("cy", function(d) {
			return d.y;
		});
	});
	nodes2Map(nodes_data)
});

function HerDiffusion() {
	cur_node_id = node_id[cur_node]
	while (nodeMap[cur_node_id].status == 1) {
		cur_node++
		cur_node_id = node_id[cur_node]
	}
	var id = "#n" + cur_node_id
	var node = d3.select(id)

	var color_rt = '#FFFF00' /* 黄色 */
	var color_nort = '#00FF00'/* 绿色 */
	var color
	var rt_rt = 2.0 / 3.0;
	var rt_nrt = 1.0 / 3.0;
	var nrt_nrt = 2.0 / 3.0;
	var nrt_rt = 1.0 / 3.0;
	var pinfo_rt = 1.0;
	var pinfo_nrt = 1.0;
	node_id.forEach(function(node) {
		if (nodeMap[node].status == 1) {
			if (nodeMap[node].rt == 1) {
				pinfo_rt = pinfo_rt * rt_rt
				pinfo_nrt = pinfo_nrt * rt_nrt
			} else {
				pinfo_rt = pinfo_rt * nrt_rt
				pinfo_nrt = pinfo_nrt * nrt_nrt
			}
		}
	})
	var prt = pinfo_rt / 2 / (pinfo_rt / 2 + pinfo_nrt / 2)
	console.log(prt)
	if (prt >= 0.5)
		color = color_rt
	else
		color = color_nort
	node.style('fill', color)
	nodeMap[cur_node_id].status = 1
	nodeMap[cur_node_id].rt = 1

	cur_node = cur_node + 1
	if (cur_node >= node_id.length) {
		clearInterval(handle)
		console.log('clear interval')
	}
}

function readKeyNode() {
	d3.json('json/KeyNode1.json', function(error, data) {
		if (error) {
			console.log(error)
		}
		KeyNode = data.nodes
		KeyNode.forEach(function(e) {
			id = '#n' + e.id
			var node = d3.select(id)
			nodeMap[e.id].status = 1
			nodeMap[e.id].rt = 1
			node.style('fill', '#FF0000')/* 红色 */
		})
	})
}

$('#readkeynode').on('click', function() {
	readKeyNode();
})

$('#startdiffusion').on('click', function() {
	var handle = setInterval(HerDiffusion, 100);
})
