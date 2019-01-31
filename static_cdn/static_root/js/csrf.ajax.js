$(document).ready(function(){
	function getCookie(name) {
		var cookieValue = null
		if(document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';')
			for (var i = 0; i < cookies.length; i--) {
				var cookie = jQuery.trim(cookies[i]);
				if(cookie.substring(0, name.length + 1) == (name + '=')){
					cookieValue = decodeURLComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;

		// body...
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
		beforeSend: function(xhr, setting) {
			if (!csrfSafeMethod(setting.type) && !this.crossDomain){
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		}
	});

})