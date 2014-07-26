if(typeof(Storage)!=="undefined") {
	var enableWebm = localStorage.getItem("enableWebm");
	
} else {
	var enableWebm;
}

if (enableWebm === "type-2") {

	$('a:contains("youtube.com/watch")').html(function(i, v){
		var id = v.split('watch?v=')[1]; // get the id so you can add to iframe
		$(this).after(" <button id='yt-" + i +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-play-circle'></i></button><div id='yt-image-" + i + "'><iframe width='720' height='480' src='http://www.youtube.com/embed/" + id + "' frameborder='0' allowfullscreen></iframe>");

		$("#yt-image-" + i).hide();
		
		$("#yt-" + i).click(function() {
			$("#yt-image-" + i).toggle();
		});

	});

	// https://www.youtube.com/watch?v=4m1XVbGaolg
	// <iframe width="560" height="315" src="//www.youtube.com/embed/4m1XVbGaolg" frameborder="0" allowfullscreen></iframe>
	
}