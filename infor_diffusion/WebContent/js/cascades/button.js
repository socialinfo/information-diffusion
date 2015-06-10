/**
 * 
 */
$(document).ready(function(){
	bindEvent()
});
function bindEvent(){

	$('#max_spread_of_cascades').on('click',function(){

		$('#outcome').text('button clicked!')
	
//		$.ajax({
//			type : "GET",
//			url : "simodel.do",
//			data : postData,
//			dataType : 'json',
//			success : function(data, textStatus, jqXHR) {
//				$('#outcome').text('success fitting with arguments')
//				$('#fitargs').text(data.beta)
//				showFittingCurve(data.ys)
//				
//			},
//			error:function(e)
//			{
//				$('#outcome').text('failed due to communication error')
//			}
//			
//		});
	})	
}