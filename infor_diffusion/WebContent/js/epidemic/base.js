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
				
			},
			error:function(e)
			{
				alert('communication error')
			}
			
		});
		
	})
}
