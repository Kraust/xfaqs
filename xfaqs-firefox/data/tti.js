/****************************************************************************
* Please Note: The URL parsing on this is not 100%. Some characters         *
* (namely ()'s) will not parse.												*
****************************************************************************/
if(typeof(Storage)!=="undefined") {
	var enableTTI = localStorage.getItem("enableTTI");
	var maxWidth = localStorage.getItem("maxWidth");
	var maxHeight = localStorage.getItem("maxHeight");
	
} else {
	var enableTTI;
	var maxWidth;
	var maxHeight;
}


if (enableTTI === "type-1") {
	/*$('td.msg').each(function() {
			var text = $(this).html();
			var regex = /http:\/\/[^"]*\.png|https:\/\/[^"]*\.png|http:\/\/[^"]*\.jpg|https:\/\/[^"]*\.jpg|http:\/\/[^"]*\.gif|https:\/\/[^"]*\.gif/g;
			var	matches = regex.exec(text);				
			
			while(matches = regex.exec(text)) {
				var text = $(this).html();
				if ( matches !== null) {
					if ( matches !== null) {
						if( matches !== undefined) {
							console.log(matches);
							var video_regex = new RegExp('<a href="' + matches + '">' + matches + '<\/a>');
							
							console.log(video_regex);
						
							var result = matches[0];

						
							$(this).html(text.replace(video_regex, "<a target='_blank' href='" + result + "'><img src='"+ result + "' alt='Broken TTI Image' style='max-height:" + maxHeight + "px;max-width:" + maxWidth + "px;'></a>"));
						}
					}

				}

			}
			
			
			
	});*/
}

if (enableTTI === "type-2") {

	$('a[href$=".gif"], a[href$=".jpg"], a[href$=".png"], a[href$=".bmp"]').each(function(index, value) {
		var href = $(this).attr("href");
		
		$(this).after(" <button id='tti-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-picture'></i></button><div id='tti-image-" + index + "'><a href='" + href + "'><img src='" + href +"' alt='TTI Image' style='max-height:" + maxHeight + "px;max-width:" + maxWidth + "px;'></a></div>");
		//$("#tti-" + index).tooltip({ content: "<img src='" + href + "' alt='TTI image'>" });
		
		$("#tti-image-" + index).hide();
		
		$("#tti-" + index).click(function() {
			$("#tti-image-" + index).toggle();
		});
		
	});

}