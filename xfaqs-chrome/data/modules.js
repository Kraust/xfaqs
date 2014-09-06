function txtTagEdit(tag) {
	var msgAreaEdit = document.getElementsByName('messagetext')[0];
	var currTag = document.getElementsByName(tag)[0];
	var tagStart = "<"+tag+">";
	var tagEnd = "</"+tag+">";
	var c = msgAreaEdit.selectionStart;
	var selPre = msgAreaEdit.value.substr(0,c);
	var selPost = msgAreaEdit.value.substr(msgAreaEdit.selectionEnd);
	var selTxt;

	if(c!=undefined)
	{
		selTxt = msgAreaEdit.value.substr(c,msgAreaEdit.selectionEnd-c);
	}
	if(selTxt.length<1)
	{
		if(currTag.className.indexOf('active')>0)
		{
			msgAreaEdit.value = [msgAreaEdit.value.slice(0,c),tagEnd,msgAreaEdit.value.slice(c)].join('');
			var rm = currTag.className.indexOf(' active');
			var p = c+tagEnd.length;
			currTag.className = currTag.className.substr(0,rm);
			currTag.style.color = '#000';
			setPos(msgAreaEdit,p);
		}
		else
		{
			msgAreaEdit.value = [msgAreaEdit.value.slice(0,c),tagStart,msgAreaEdit.value.slice(c)].join('');
			var p = c+tagStart.length;
			currTag.className += " active";
			currTag.style.color = '#6564ff';
			setPos(msgAreaEdit,p);
		}
	}
	else
	{
		msgAreaEdit.value = selPre+tagStart+selTxt+tagEnd+selPost;
		var p = c+tagStart.length+selTxt.length+tagEnd.length;
		setPos(msgAreaEdit,p);
	}
}



if(typeof(Storage)!=="undefined") {
	var storage = localStorage.getItem("avatar");
	var enableWebm = localStorage.getItem("enableWebm");
	var enableCode = localStorage.getItem("enableCode");
	var enableQuickEdit = localStorage.getItem("enableQuickEdit");
	var enableAvatars = localStorage.getItem("enableAvatars");
	var enableHighlight = localStorage.getItem("enableHighlight");
	var searchTopics = localStorage.getItem("searchTopics");
	
} else {
	var storage = "left";
	var enableWebm;
	var enableCode;
	var enableQuickEdit;
	var enableAvatars;
	var searchTopics;
	var enableHighlight;

}

var formatter = '<span class="tagbuttons"> \
					<input type="button"  value="Bold" class="btn btn_mini btnbold" name="b" tabindex="-1"> \
					<input type="button"  value="Italic" class="btn btn_mini btnitalic" name="i" tabindex="-1"> \
					<input type="button"  value="Spoiler" class="btn btn_mini" name="spoiler" tabindex="-1"> \
					<input type="button"  value="Cite" class="btn btn_mini btncite" name="cite" tabindex="-1"> \
					<input type="button"  value="Quote" class="btn btn_mini" name="quote" tabindex="-1"> \
					<input type="button"  value="Code" class="btn btn_mini btncode" name="code" tabindex="-1"> \
				</span>';


if(searchTopics == "checked") {
	$(".board_nav").prepend($(".searchtopics").css("margin", "0"));
}

// <code> tag module.
/*if (enableCode === "checked") {
	//$("code").wrap("<pre></pre>");
	//hljs.initHighlightingOnLoad();
	
	$("code").each(function(i, block) {
		if($(this).text().length < 40) {

		} else {
			$(this).wrap("<pre></pre>");
			hljs.highlightBlock(block);
		}
		
	});

}*/
// Does not pass mozilla, need to find another js library for this.


// Highlighting
// I should really put this in its own file
// Currently only works with V13 and V12.

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
			//$("td.msg").eq(i).css("background-color", tcColor);	
		}				

		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Topic Creator)") {
			$("td.author").eq(i).css("background-color", tcColor);	
			//$("td.msg").eq(i).css("background-color", tcColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(VIP)") {
			$("td.author").eq(i).css("background-color", vipColor);	
			//$("td.msg").eq(i).css("background-color", vipColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Moderator)") {
			$("td.author").eq(i).css("background-color", modColor);	
			//$("td.msg").eq(i).css("background-color", modColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Admin)") {
			$("td.author").eq(i).css("background-color", adminColor);	
			//$("td.msg").eq(i).css("background-color", adminColor);	
		}
		
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] === $(".name").eq(i).text()) {
					$("span.author_data:nth-child(2)").eq(i).after("<span class='author_data'>" + highlightList.groups[j].groupName + "</span>");	
					$("td.author").eq(i).css("background-color", highlightList.groups[j].color);	
					//$("td.msg").eq(i).css("background-color", highlightList.groups[j].color);	
				}
				
			}
		}

	}
	
	for( var i = 0; i < topicCount; i++) {
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] == $(".tauthor").eq(i).text()) {
					$(".tauthor").eq(i).css("background-color", highlightList.groups[j].color);	
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

// Spoilers Test

/*$("s").replaceWith(function(index) {
	return $("<div class='spoiler spoiler-" + index + "'>").append($(this).contents());
});

$(".spoiler").each(function(index) {
	$(this).before("<button id='spoilerButton-" + index + "' >Spoilers (click to view)</button>");
	$("spoilerButton-" + index).click(function() {
			$(".spoiler-" + index).toggle();
	});
});*/

