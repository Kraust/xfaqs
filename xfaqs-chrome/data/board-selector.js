/*if(typeof(Storage)!=="undefined") {
	var enableBoardSelector = localStorage.getItem("enableBoardSelector");
	
} else {
	var enableBoardSelector;
}

if(enableBoardSelector == "checked") {

	var url = "http://www.gamefaqs.com/boards/user.php?";

	var boards = "";
	
	$.ajax({
		type: "POST",
		url: url,
		async: false,
	}).done(function(response) {
		var boardName = $(response).find(".fboards > ul > li > a");
		for(var i = 0; i < boardName.length; i++) {
			boards += "<option value='" + boardName.eq(i).attr('href') + "'>" + boardName.eq(i).text() + "</option>";
		}
	});

	$(".paginate.user").append("<li><select id='boardSelector' value=''>" + boards + "</select></li>");
	
	$("#boardSelector").change(function() {
		window.location = $("#boardSelector").val();
	});

}*/