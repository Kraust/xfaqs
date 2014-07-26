if(enableFilter == "checked") {
	function filterCallback(user) {
		return function() {
			if($(".topmsg").text != "") {
				$(".name:not(:contains('" + user + "'))").parent().parent().parent().toggle()
				$(".name:not(:contains('" + user + "'))").parent().parent().parent().next().toggle();
			} else {
				$(".name:not(:contains('" + user + "'))").parent().parent().parent().parent().toggle();
			}
			
			if($(this).text() == "filter")
				$(this).text("unfilter");
			else
				$(this).text("filter");
		}

	}
	
	var msgCount = $("td.msg").length;

	for( var i = 0; i < msgCount; i++) {
		var user = $(".name").eq(i).text();
		$("a.qq").eq(i).after(" - <a href='#' class='filter-" + i + "'>filter</a>");
		
		$(".filter-" + i).click(filterCallback(user));
		
	}
	
}