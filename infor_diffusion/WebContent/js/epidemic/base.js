function bindEvent(){

	$('#startSimulation').on('click',function(){

		if(!isRun){
			handle = setInterval(simulationSI,1000)
			isRun = true
			$('#startSimulation').text('stop'.toUpperCase())
			$('#startSimulation').removeClass('btn-primary')
			$('#startSimulation').addClass('btn-danger')
		}
		else{
			clearInterval(handle)
			isRun = false
			$('#startSimulation').text('start'.toUpperCase())
			$('#startSimulation').removeClass('btn-danger')
			$('#startSimulation').addClass('btn-primary')
		}
	})
	$("#startFitting").on('click',function(){
		//$.post('/fittingModel.do',function())
		if(isRun){
			alert('please stop the simulation first')
			return
		}
		data = simulateData
		xs  = []
		ys = []
		data.forEach(function(d){
			xs.push(d[0])
			ys.push(d[1])
		})
		postData = ''
		xs.forEach(function(x,i){
			if(i==0){
				postData+='xs='+x
			}
			else{
				postData+='&xs='+x
			}
			
		})
		ys.forEach(function(y){
			postData+='&ys='+y
		})
		$.ajax({
			type : "GET",
			url : "simodel.do",
			data : postData,
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				$('#outcome').text('success fitting with arguments')
				$('#fitargs').text(data.beta)
				showFittingCurve(data.ys)
				
			},
			error:function(e)
			{
				$('#outcome').text('failed due to communication error')
			}
			
		});
		
	});
	$("#uploadFile").on('click',function(){
		//var data = $('#uploadForm').serialize()
		//alert(data)
		alert('123')
	})
}
//draw the fitting line
function showFittingCurve(ys){
	
	var data = []
	for(var i=1;i<=ys.length;i++){
		data.push({x:i,y:ys[i-1]})
	}
	var line = d3.svg.line()
				.x(function(d) { return xScale(d.x); })
				.y(function(d) { return yScale(d.y); });
	svgpanel.select('#fitline').remove()
	svgpanel.append("path")
			.datum(data)
			.attr('id','fitline')
			.attr("class", "line")
			.attr("d", line);
}

