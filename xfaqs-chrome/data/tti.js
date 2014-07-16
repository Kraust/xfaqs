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


if (enableTTI === "checked") {
	$('td.msg').each(function() {
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
			
			
			
	});
}