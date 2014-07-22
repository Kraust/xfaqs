if(typeof(Storage)!=="undefined") {
	var storage = localStorage.getItem("avatar");
	var enableWebm = localStorage.getItem("enableWebm");
	var enableCode = localStorage.getItem("enableCode");
	var enableQuickEdit = localStorage.getItem("enableQuickEdit");
	var enableAvatars = localStorage.getItem("enableAvatars");
	var enableHighlight = localStorage.getItem("enableHighlight");
	
} else {
	var storage = "left";
	var enableWebm;
	var enableCode;
	var enableQuickEdit;
	var enableAvatars;
	var enableHighlight;

}

// boards fix 7/22/14

if($(".span4 > .pod_gameinfo").text() != "") {
	$(".span4").hide();
	$(".span8").css("width", "100%");
}


// <code> tag module.
if (enableCode === "checked") {
	$("code").wrap("<pre></pre>");
	hljs.initHighlightingOnLoad();
}


// Highlighting

if(typeof(Storage)!=="undefined") {
	var enableHighlight = localStorage.getItem("enableHighlight");
	var tcColor = localStorage.getItem("tcColor");
	var adminColor = localStorage.getItem("adminColor");
	var modColor = localStorage.getItem("modColor");
	var vipColor = localStorage.getItem("vipColor");
	
} else {
	var enableHighlight;
}


if (enableHighlight === "checked") {
	var highlightList = JSON.parse(localStorage.getItem("highlightList"));

	var msgCount = $("td.msg").length;
	var topicCount = $(".tauthor").length;

	for( var i = 0; i < msgCount; i++) {

		if($("span.author_data:nth-child(1)").eq(i).text() === "#1") {
			$("td.author").eq(i).css("background-color", tcColor);	
			$("td.msg").eq(i).css("background-color", tcColor);	
		}				

		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Topic Creator)") {
			$("td.author").eq(i).css("background-color", tcColor);	
			$("td.msg").eq(i).css("background-color", tcColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(VIP)") {
			$("td.author").eq(i).css("background-color", vipColor);	
			$("td.msg").eq(i).css("background-color", vipColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Moderator)") {
			$("td.author").eq(i).css("background-color", modColor);	
			$("td.msg").eq(i).css("background-color", modColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Admin)") {
			$("td.author").eq(i).css("background-color", adminColor);	
			$("td.msg").eq(i).css("background-color", adminColor);	
		}
		
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] === $(".name").eq(i).text()) {
					$("span.author_data:nth-child(2)").eq(i).after("<span class='author_data'>" + highlightList.groups[j].groupName + "</span>");	
					$("td.author").eq(i).css("background-color", highlightList.groups[j].color);	
					$("td.msg").eq(i).css("background-color", highlightList.groups[j].color);	
				}
				
			}
		}

	}
	
	for( var i = 1; i < topicCount; i++) {
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] === $(".tauthor").eq(i).text()) {
					$(".topics").eq(i).css("background-color", highlightList.groups[j].color);	
				}				
			}
		}
	}
	
	
	
}

// Highlighting






// Ignore+

if(typeof(Storage)!=="undefined") {
	var enableIgnore = localStorage.getItem("enableIgnore");
	
} else {
	var enableIgnore;
}

if (enableIgnore === "checked") {
	var user = $(".welcome").text().slice(0, -1);
	var ignoreList = JSON.parse(localStorage.getItem("ignoreList"));

	function editCallback(i) {
		return function() {
			ignoreList.users.push($(".name").eq(i-1).text());
			localStorage.setItem("ignoreList", JSON.stringify(ignoreList));
			location.reload(true);
		}
	}



	var msgCount = $("td.msg").length;

	for( var i = 0; i < msgCount; i++) {
		for( var j = 0; j < ignoreList.users.length; j++ ) {
			if( $(".name").eq(i).text() == ignoreList.users[j] ) {			
				$("tr.msg").eq(i).css("display", "none");		
			}		
		}
		
		if( $(".name").eq(i).text() !== user ) {
				$("a.qq").eq(i).after(" - <a class='ignore' id='ignore-" + (i+1) + "'>ignore</a> ");
				$("#ignore-" + (i+1)).click(editCallback(i+1));
		}
	}
	
	var topicCount = $("tr.topics").length;
	
	for( var i = 0; i < topicCount; i++) {
		for( var j = 0; j < ignoreList.users.length; j++ ) {
			if( $("td.tauthor").eq(i).text() == ignoreList.users[j] ) {			
				$("tr.topics").eq(i).css("display", "none");		
			}		
		}
	}	

}

// Ignore+