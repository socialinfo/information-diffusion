
$(document).ready(function(){
	bindFunc()
})
function bindFunc(){
	var func_dict = {'SIR':[1,2],'SIS':[1,2],'SIRS':[0,1,2]}
	var args = ['alpha','beta','gamma']
	$("#startSimulation").on('click',function(){
		var data = $("#dynamicform").serialize()
		$.ajax({
            cache: true,
            type: "POST",
            url:'dynamicmodel.do',
            data:data,
            async: true,
            error: function(request) {
                alert("Connection error");
            },
            success: function(data) {
            	if(data.status==1){
            		//alert(data.message)
            	}
            	else{
            		//alert(data.message)
            		$("#dynamicimg").attr('src',data.message)
            	}
            }
        });
		
	})
	$('#type').on('change',function(){
		var type = $('#type').val()
		$("#dynamicform :text").attr('disabled',true)
		for(var i=0;i<func_dict[type].length;i++){
			$("#"+args[func_dict[type][i]]).attr("disabled",false)
		}
	})
}
