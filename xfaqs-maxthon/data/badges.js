$(function() {
	$(document).tooltip();
});


var msgCount = $("td.msg").length;
var donators = [ "helly" ];
var contributors = [];

for( var i = 0; i < msgCount; i++) {
	if($(".name").eq(i).text() == "Judgmenl") {
		$(".name").eq(i).after(" <i class='icon icon-ok-sign' title='xFAQs Creator'></i></a>");
	}
	
	if($(".name").eq(i).text() == "HellHole_") {
		$(".name").eq(i).after(" <i class='icon icon-ok-sign' title='xFAQs Chrome Maintainer + Donator'></i></a>");
	}
	
	for( var j = 0; j < donators.length; j++) {
		if($(".name").eq(i).text() == donators[j]) {
			$(".name").eq(i).after(" <i class='icon icon-star-empty' title='xFAQs Donator'></i></a>");
		}
	}

	for( var j = 0; j < contributors.length; j++) {
		if($(".name").eq(i).text() == contributors[j]) {
			$(".name").eq(i).after(" <i class='icon icon-star-empty' title='xFAQs Developer/Contributor'></i></a>");
		}
	}


}