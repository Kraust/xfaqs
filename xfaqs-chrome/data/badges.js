$(function() {
	$("i").tooltip( {
		position: { my: "left+0 center", at: "right+15 center" }, tooltipClass:'tooltip'
	});
});


var msgCount = $("td.msg").length;
var donators = ["King Rial", "-Gavirulax-", "Xero-Apollo", "Kanakiri", "Littlegator", "DespondentDeity", "ArchangelBaruch", "Veliconis"];
var contributors = ["kirbymuncher"];

for( var i = 0; i < msgCount; i++) {
	if($(".name").eq(i).text() == "Judgmenl") {
		$(".name").eq(i).after(" <i class='icon icon-ok-sign' title='xFAQs Creator'></i></a>");
	}
	
	if($(".name").eq(i).text() == "helIy" ) {
		$(".name").eq(i).after(" <i class='icon icon-ok-sign' title='Awesomelord'></i></a>");
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