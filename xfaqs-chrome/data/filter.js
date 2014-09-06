// Note: Filters only work on retro skins if "Message Poster Display" Above Message is enabled in
// http://www.gamefaqs.com/user/options_advanced.html

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
		if($(".msg_stats_left").size() !== 0) {
			$("a.qq").eq(i).after(" - <a href='#' class='filter-" + i + "'>filter</a>");
		} else {
			$("a.qq").eq(i).after(" | <a href='#' class='filter-" + i + "'>filter</a>");
		}
		
		$(".filter-" + i).click(filterCallback(user));
		
	}
	
}