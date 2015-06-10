var simulationX=[]
var simulationY=[]
var svgpanel
var xAxis
var yAxis
var width = 600
var height = 400
var padding = 30
$(document).ready(function(){
	

	svgpanel = d3.select("#svgpanel")
	.append("svg:svg")
	.attr('xmlns','http://www.w3.org/2000/svg')
	.attr("width", width)
	.attr("height", height)
	.attr("pointer-events", "all")

	svgpanel.append('svg:g').append('svg:rect')
	.attr('width', width)
	.attr('height', height)
	.attr('fill', 'none')
	.attr('stroke','#777')
	.attr('stroke-width','2');
	

	
	xScale = d3.scale.linear()
						 .domain([0, d3.max(simulationX, function(d) { return d; })])
						 .range([padding, width - padding * 2]);

	yScale = d3.scale.linear()
						 .domain([0, d3.max(simulationY, function(d) { return d; })])
						 .range([height - padding, padding]);
	//Define X axis
	xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom");
	//Define Y axis
	yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left");

	svgpanel.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (height - padding) + ")")
	.call(xAxis);

	//Create Y axis
	svgpanel.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);
	bindFunc()
	
});
/* 
 * data{x:[],y[[],[]]}
 * 
 * */
function startDraw(data){
	x = eval(data.x)
	ys = eval(data.y)
	var line = d3.svg.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });
	svgpanel.selectAll('.delete').remove()
	
	//different class name
	className = ['lineS','lineI','lineR']
	for(var i=0;i<ys.length;i++){
		data = []
		for(var j=0;j<x.length;j++){
			xx = x[j]
			yy = ys[i][j]
			data.push({x:xx,y:yy})
		}
		//update xScale yScale
		xScale.domain([0, d3.max(data, function(d) { return d.x; })]);
		yScale.domain([0, d3.max(data, function(d) { return d.y; })]);
		svgpanel.select(".x.axis")
			.transition()
			.duration(1000)
			.call(xAxis);
					
		//Update Y axis
		svgpanel.select(".y.axis")
			.transition()
			.duration(1000)
			.call(yAxis);
		svgpanel.append("path")
		.datum(data)
		.attr("class",'delete '+className[i])
		.attr("d", line);
	}
	
	
}
ctrlList = ['#N0','#I0','#R0','#alpha','#beta','#gamma']

func_dict = {"SI":[0,1,4],"SIR":[0,1,2,4,5],"SIS":[0,1,4,5],'SIRS':[0,1,2,3,4,5]}

function bindFunc(){
	$('#startDraw').on('click',function(){
		var data = $('#drawmodelform').serialize()
		//alert(data)
		$.ajax({
            cache: true,
            type: "POST",
            url:'drawmodel.do',
            data:data,
            async: false,
            error: function(request) {
                alert("Connection error");
            },
            success: function(data) {
            	//绘制曲线
            	startDraw(data)
            }
        });
	})
	$('#TYPE').on('change',function(){
		cur = $('#TYPE').val()
		$('#formpanel :text').attr('disabled',true)
		var cur_ctrl = func_dict[cur]
		for(var i=0;i<cur_ctrl.length;i++){
			$(ctrlList[cur_ctrl[i]]).removeAttr('disabled')
		}
		
	})
	var show = false
	$('#tooltips').hover(function(e){
		if(show==false){
			$('#tooltippanel').css('left',e.pageX+'px')
			$('#tooltippanel').css('top',e.pageY+'px')
			$('#tooltippanel').removeClass('hidden')
			src = 'img/'+ $('#TYPE').val().toUpperCase()+'Model.png'
			$("#tooltippanelimg").attr('src',src)
			$('#tooltippanel').addClass('show')
			show=true
		}
	})
	
	$('#tooltips').mouseleave(function(e){
		if(show==true){
			$('#tooltippanel').removeClass('show')
			$('#tooltippanel').addClass('hidden')
			show=false
		}
	})
}
