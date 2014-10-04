// Avatar Domain selector
// avatarDomain { nostlagiasky.pw | cs.uml.edu/~rdupuis }
var avatarDomain;

if(localStorage.avatarDomain != null) {
	avatarDomain = localStorage.avatarDomain;
} else {
	avatarDomain = "nostlagiasky.pw";
	localStorage.setItem("avatarDomain", "nostlagiasky.pw");	
}

//

if( localStorage.getItem("tcColor") != null) {
	var tcColor = localStorage.getItem("tcColor");
} else {
	localStorage.setItem("tcColor", "");
}

if( localStorage.getItem("adminColor") != null) {
	var adminColor = localStorage.getItem("adminColor");
} else {
	localStorage.setItem("adminColor", "");
}

if( localStorage.getItem("modColor") != null) {
	var modColor = localStorage.getItem("modColor");
} else {
	localStorage.setItem("modColor", "");
}

if( localStorage.getItem("vipColor") != null) {
	var vipColor = localStorage.getItem("vipColor");
} else {
	localStorage.setItem("vipColor", "");
}

if(	localStorage.getItem("sigList") != null ) {
	var sigList = JSON.parse(localStorage.getItem("sigList"));

} else {
 

	var sigList =
	{ 	
		"signatures": [
				{
					"boards": [""],
					"accounts": [""],
					"signature": "powered by xfaqs"
				}
		]
	};
	
	localStorage.setItem("sigList", JSON.stringify(sigList));


}

if(	localStorage.getItem("ignoreList") != null ) {
	var ignoreList = JSON.parse(localStorage.getItem("ignoreList"));

} else {
 

	var ignoreList =
	{ 	
		"users": [
				
		]
	};
	
	localStorage.setItem("ignoreList", JSON.stringify(ignoreList));


}

if(	localStorage.getItem("highlightList") != null ) {
	var highlightList = JSON.parse(localStorage.getItem("highlightList"));

} else {
 

	var highlightList =
	{ 	
		"groups": [
		
			{
				"groupName": "xFAQs Creator",
				"color": "#FFD9D9",
				"userNames": [ "Judgmenl" ] 
			},
			
			{
				"groupName": "Creator's Alt",
				"color": "#FFD9D9",
				"userNames": [ "_SecretDragoon", "1337_FF_GoD" ] 
			}
		
		]
	};
	
	localStorage.setItem("highlightList", JSON.stringify(highlightList));


}



var importSigList = "";

function ignoreCallback(i) {
	return function() {
		ignoreList.users.splice(i, 1);
		localStorage.setItem("ignoreList", JSON.stringify(ignoreList));
		document.location = "/boards/user.php?settings=1#tabs-4";
		location.reload(true);
	}

}

function clickCallback(i) {
	return function() {

		$(".btn").attr("disabled", "disabled");
		
		highlightList.groups.splice((i-1), 1);
	
		var userNameArray = $.csv.toArray($("#userNames-" + i).val());
			
		highlightList.groups.push( 
			{
				"groupName": $("#groupName-" + i).val(),
				"color": $("#color-" + i).val(),
				"userNames": userNameArray
			});

	
		localStorage.setItem("highlightList", JSON.stringify(highlightList));
		document.location = "/boards/user.php?settings=1#tabs-3";
		location.reload(true);
	}
}

function deleteCallback(i) {
	return function() {
		$("#table-" + i).remove();
		$(".btn").attr("disabled", "disabled");
		
		highlightList.groups.splice((i-1), 1);
		localStorage.setItem("highlightList", JSON.stringify(highlightList));

		
		document.location = "/boards/user.php?settings=1#tabs-3";
		location.reload(true);

	}
}

function sigClickCallback(i) {
	return function() {
		var sigText = $("#signature-" + i).val();
		var sigLines = (sigText.match(/\n/g)||[]).length;
		var sigCharacters = sigText.length + sigLines;
	
		if((sigLines <= 1) && (sigCharacters <= 160)) { 

			$(".btn").attr("disabled", "disabled");
			
			sigList.signatures.splice((i-1), 1);	
			
			var boardNameArray = $.csv.toArray($("#boards-" + i).val());
			var accountNameArray = $.csv.toArray($("#accounts-" + i).val());
				
			sigList.signatures.push( 
				{
					"boards": boardNameArray,
					"accounts": accountNameArray,
					"signature": $("#signature-" + i).val()
				});


			localStorage.setItem("sigList", JSON.stringify(sigList));
			document.location = "/boards/user.php?settings=1#tabs-5";
			location.reload(true);
		} else {
			alert("Signature is too long. " + sigLines + " breaks and " + sigCharacters + " characters.");
		}
	}
}

function sigDeleteCallback(i) {
	return function() {
		$("#sigTable-" + i).remove();
		$(".btn").attr("disabled", "disabled");
		
		sigList.signatures.splice((i-1), 1);
		localStorage.setItem("sigList", JSON.stringify(sigList));

		
		document.location = "/boards/user.php?settings=1#tabs-5";
		location.reload(true);

	}
}

var aboutBody =
				"<p>xFAQs - GameFAQs Improvements created by <a href='http://www.gamefaqs.com/users/Judgmenl/boards'>Judgmenl</a>.</p>" +
				"<h3>Credits</h3>" +
				"<p>Judgmenl (Developer)<br>HellHole_ (Hosting the Chrome version)<br>kirbymuncher (Quick Edit source code) <br>The TTI team for the Text-to-image and Text-to-video concept.</p>" +
				"<p>The xFAQs site can be located at <a href='http://xfaqs.nostlagiasky.pw/'>nostlagiasky</a>";

//var sigBody = "<span style='float:right;'><input type='file' class='btn' id='importSigFiles' name='files[]'> <button class='btn' id='importSigs' disabled>Import</button> <button class='btn' id='exportSigs'>Export</button></span><p>1 line break and 160 characters allowed. Just like with regular sigs.<br> If you want a signature to apply to all boards or accounts leave the field blank.<br>Multiple boards and accounts are separated by commas.</p>";
var sigBody = "<p style='float:left'>1 line break and 160 characters allowed. Just like with regular sigs.<br> If you want a signature to apply to all boards or accounts leave the field blank.<br>Multiple boards and accounts are separated by commas.</p>";
sigBody += "<button style='float:right' class='btn btn_primary' id='sig_export'>Export Signature Data</button>";


// Sig Export Widget.
$("body").append("<div id='sigWidget' style='display:none'><textarea id='sigbackup' style='width:100%; height:500px;' readonly>" + JSON.stringify(JSON.parse(localStorage.sigList),null,"\t") + "</textarea></div>");
$("#sigWidget").dialog({
	 autoOpen: false,
	 height: "auto",
	 width: 1100,
});

$("#sigWidget").parent().addClass("reg_dialog");
$("button").addClass("btn");

var sigNumber = 0;

for( sigNumber; sigNumber < sigList.signatures.length; sigNumber++) {

	sigBody +=	"<table id='sigTable-" + (sigNumber + 1) + "'>" +
							"<tr><th colspan='2'>Signature " + (sigNumber + 1) + " <input type='submit' class='btn' id='sigBtn-" + (sigNumber + 1) + "' style='float:right; margin-left:10px;' value='Update'><input type='submit' class='btn' id='sigDeleteBtn-" + (sigNumber + 1) + "' style='float:right' value='Delete'></th></tr>" +
							"<tr><td>Board Names</td><td><input id='boards-" + (sigNumber + 1) + "' style='width:100%' value=\"" + sigList.signatures[sigNumber].boards + "\"></td></tr>" +
							"<tr><td>Accounts</td><td><input id='accounts-" + (sigNumber + 1) + "' style='width:100%' value=\"" + sigList.signatures[sigNumber].accounts + "\"></td></tr>" +
							"<tr><td>Signature</td><td><textarea id='signature-" + (sigNumber + 1) + "' style='width:100%'>" + sigList.signatures[sigNumber].signature + "</textarea></td></tr>" +
						"</table>";

}

sigBody +=	"<table id='sigTable-'" + (sigNumber + 1) + ">" +
						"<tr><th colspan='2'> New Signature <input type='submit' class='btn' id='sigBtn-" + (sigNumber + 1) + "' style='float:right' value='Add'></th></tr>" +
						"<tr><td>Board Names</td><td><input id='boards-" + (sigNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></td></tr>" +
						"<tr><td>Accounts</td><td><input id='accounts-" + (sigNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></td></tr>" +
						"<tr><td>Signature</td><td><textarea id='signature-" + (sigNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></textarea></td></tr>" +
					"</table>";


var ignoreBody = "<table><tr><th>Ignore List+</th></tr>";
var ignoreNumber = 0;

for( ignoreNumber; ignoreNumber < ignoreList.users.length; ignoreNumber++) {
	ignoreBody += "<tr><td>" + ignoreList.users[ignoreNumber] + " - <a id='ignore-" + ignoreNumber + "'>remove</a></tr></td>";
}

ignoreBody += "</table>";


var highlightBody = "<p>Note: No spaces between user names - just commas.</p>" +
					"<table>" +
					"<tr><th>Special Highlights</th><th><input style='float:right' type='submit' id='updateHighlightSpecial' class='btn' value='Update Special Highlights'></th></tr>" +
					"<tr><td>Highlight Topic Creator</td><td><input id='color-tc' value=\"" + tcColor + "\"></td></tr>" +
					"<tr><td>Highlight Admins</td><td><input id='color-admin' value=\"" + adminColor + "\"></td></tr>" +
					"<tr><td>Highlight Mods</td><td><input id='color-mod' value=\"" + modColor + "\"></td></tr>" +										
					"<tr><td>Highlight VIPs</td><td><input id='color-vip' value=\"" + vipColor + "\"></td></tr>" +										
					"</table>";
					
var groupNumber = 0;

for( groupNumber; groupNumber < highlightList.groups.length; groupNumber++) {

	highlightBody +=	"<table id='table-" + (groupNumber + 1) + "'>" +
							"<tr><th colspan='2'>Highlight Group " + (groupNumber + 1) + " <input type='submit' class='btn' id='highlightBtn-" + (groupNumber + 1) + "' style='float:right; margin-left:10px;' value='Update'><input type='submit' class='btn' id='deleteBtn-" + (groupNumber + 1) + "' style='float:right' value='Delete'></th></tr>" +
							"<tr><td>Name</td><td><input id='groupName-" + (groupNumber + 1) + "' style='width:100%' value=\"" + highlightList.groups[groupNumber].groupName + "\"></td></tr>" +
							"<tr><td>Color</td><td><input id='color-" + (groupNumber + 1) + "' value=\"" + highlightList.groups[groupNumber].color + "\"></td></tr>" +
							"<tr><td>Users</td><td><input id='userNames-" + (groupNumber + 1) + "' style='width:100%' value=\"" + highlightList.groups[groupNumber].userNames + "\"></td></tr>" +
						"</table>";
						

}

highlightBody +=	"<table id='table-'" + (groupNumber + 1) + ">" +
						"<tr><th colspan='2'> New Highlight Group <input type='submit' class='btn' id='highlightBtn-" + (groupNumber + 1) + "' style='float:right' value='Add'></th></tr>" +
						"<tr><td>Name</td><td><input id='groupName-" + (groupNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></td></tr>" +
						"<tr><td>Color</td><td><input id='color-" + (groupNumber + 1) + "' ></td></tr>" +
						"<tr><td>Users</td><td><input id='userNames-" + (groupNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></td></tr>" +
					"</table>";


					
						
//$(".masthead_user").prepend("<a href='/boards/565885-blood-money/'>xFAQs Help</a> <a href='/boards/user.php?settings=1'>xFAQs Settings <i class='icon icon-cog'></i></a> ");
$(".masthead_user").prepend("<span class='masthead_mygames_drop'><a href='/boards/user.php?settings=1'>xFAQs Settings <i class='icon icon-cog'></i></a><ul class='masthead_mygames_subnav' style='width:200px;left:-1px;'><li class='masthead_mygames_subnav_item'><a href='/boards/565885-blood-money/'>xFAQs Help</a></li></ul></span> ");


if((decodeURIComponent((new RegExp('[?|&]' + "settings" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) == "1") && (location.pathname == "/boards/user.php")) {
	
	var user = $("html.js body.wf-active div.wrapper div#mantle_skin div#content.container div.main_content div.span8 div.body table.board tbody tr td").eq(0).text();
	$(".span4").remove();
	$(".span8").css("width", "100%");
	
	// GameWeasel Fix
	if( user == "") {
		var user = $("#content > div > div > div.body > table > tbody > tr:nth-child(1) > td").text();
	}	
	
	var upload_user = user + " ";

	$(".page-title").html("xFAQs Settings");
	$(".userinfo").css("border", "none");
	$(".title").remove();
	$(".head").remove();
	
	// Preparing for the UI
	$("tbody").empty();    
		
	// Renders the Upload UI	
	if( user ) {
	
		$("tbody").append( "<div id='xfaqs-tabs'>" +
							   "<ul class='content_nav content_nav_wrap'>" +
							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-0'>News</a></li>" +
							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-1'>General Settings</a></li>" +
							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-2'>Avatar Settings</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-3'>User Highlighting</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-4'>Ignore List+</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-5'>Rotating Signatures</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-6'>About</a></li>" +
							   "</ul>" +
							   
							   // WIP Ajax Generated News Spot.
							   "<div id='tabs-0' style='padding-top:20px'></div>" +
							   
							   "<div id='tabs-1' style='padding-top:20px'>" +
							   "<table class='contrib'>" +
							   "<tr><th colspan='2'>General Settings</th></tr>" +
							   "<tr style='display:none;'><td>Improved code tags</td><td><select id='enableCode'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Quick Edit</td><td><select id='enableQuickEdit'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Quick Topic</td><td><select id='enableQuickTopic'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>GameFAQs Avatars <i class='icon icon-question-sign' title='GameFAQs Avatars is a third party system that gives users a custom avatar of their choice.'></i></td><td><select id='enableAvatars'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Avatars domain <i class='icon icon-question-sign' title='only change this if you are having issues with seeing avatars'></i></td><td><select id='avatarDomain'><option>nostlagiasky.pw</option><option>cs.uml.edu/~rdupuis</option></td>" +
							   "<tr><td>User Highlighting <i class='icon icon-question-sign' title='Works in V12 and V13 only'></i></td><td><select id='enableHighlight'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Ignore+ <i class='icon icon-question-sign' title='Ignore+ provides unlimited ignored users and the ability to ignore Mods/Admins'></i></td><td><select id='enableIgnore'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Rotating Signatures <i class='icon icon-question-sign' title='Signatures are taken randomly from a list of signatures that you provide'></i></td><td><select id='enableRotatingSigs'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>AMP in Board Navigation</td><td><select id='enableAMP'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Tracked Topics in Board Navigation</td><td><select id='enableTracked'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Search Topics at top of Board</td><td><select id='searchTopics'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Message Filtering <i class='icon icon-question-sign' title='Note: filters only work on retro skins if Message Poster Display: Above Message is selected in the Advanced Site Settings'></i></td><td><select id='enableFilter'><option value='checked'>Enabled</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><th colspan='2'>Replace Links with Media</th></tr>" +
							   "<tr><td colspan='2'>Note: These options only work if you've enabled clickable links in the gamefaqs advanced site settings</td></tr>" +
							   "<tr><td>Embedded Videos <i class='icon icon-question-sign' title='Supported Formats: WebM, Youtube'></i></td><td><select id='enableWebm'><option value='type-2'>Enabled (Toggle)</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Images <i class='icon icon-question-sign' title='Use Thumbnails if you don&#39;t want to toggle to see images. Use Toggle otherwise.'></i></td><td><select id='enableTTI'><option value='type-1'>Thumbnails</option><option value='type-2'>Toggle</option><option value='not-checked'>Disabled</option></select></td>" +
							   "<tr><td>Image thumbnails maximum height</td><td><input id='maxHeight' value=''>px</td>" +
							   "<tr><td>Image thumbnails maximum width</td><td><input id='maxWidth' value=''>px</td>" +
							   "<tr><td colspan='2'><input type='submit' id='updateGeneral' class='btn' value='Update xFAQs Settings'><span style='float:right;'><form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='XABH3W5N9JNCQ'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='paypal' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form></span></td></tr>" +
							   "</table>" +
							   "</div>" +
							   
							   
							   "<div id='tabs-2' style='padding-top:20px'>" +
									
									"<div style='float:left; width:100px; height:100px;'><img class='avatar' src='http://www." + avatarDomain + "/gamefaqs-avatars/avatars/" + user + ".png' alt='' ></div>" +
									"<div style='float:left; padding-left:10px'><h4>Global Avatar Settings</h4> <ul id=settings class='paginate user' style='margin:0;padding:0;'> \
										<li><a href='' id='av_left'>Avatars to the Left</a></li><li><a href='' id='av_right'>Avatars to the Right</a></li><li><a href='' id='av_no'>No Avatars</a></li></ul> \
										<form id='submit' method='POST' enctype='multipart/form-data' > \
										<input class='btn' type='file' name='file' accept='image/*' id='file'> \
										<input class='btn btn_primary' type='button' id='submit_btn' value='Upload'> \
										<input style='display:none' type='text' name='dest' value='GameFAQs-Avatars'> \
										<input style='display:none' type='text' name='user' value='" + upload_user + "'> \
										<span id='server_message'>Maximum File Size: 200KB</span> \
										</form></div>" +
										
										"<div style='clear:both;padding-top:30px;'>- Before uploading an avatar, you must change your Signature to upload:ok (<a href='http://puu.sh/9yTZJ/3acde356e0.png' target='_blank'>Example</a>). \
											You can do that on <a href='http://www.gamefaqs.com/boards/sigquote.php' target='_blank'>this</a> page.<br>- You can change your signature back after the avatar is uploaded.<br> \
											- Avatars are loosely moderated and at any time you may see the gallery <a href='http://www.nostlagiasky.pw/gamefaqs-avatars/avatars/'>here</a>.<br> \
											- PM Judgmenl with any concerns.</div>" +
											
							   "</div>" +
   							   "<div id='tabs-3' style='padding-top:20px'>" + highlightBody + "</div>" +
   							   "<div id='tabs-4' style='padding-top:20px'>" + ignoreBody + "</div>" +
   							   "<div id='tabs-5' style='padding-top:20px'>" + sigBody + "</div>" +
   							   "<div id='tabs-6' style='padding-top:20px'>" + aboutBody + "</div>" +
							"</div>");
						   
		$(function() {
			$("#xfaqs-tabs").tabs();
		});
				
		for(var i = 0; i < groupNumber; i++) {
				
			$("#highlightBtn-" + (i + 1)).button();
			$("#highlightBtn-" + (i + 1)).click(clickCallback(i + 1));

			$("#deleteBtn-" + (i + 1)).button();
			$("#deleteBtn-" + (i + 1)).click(deleteCallback(i + 1));
			
			$("#color-" + (i + 1)).spectrum({
				color: highlightList.groups[i].color,
				preferredFormat: "hex",
				showInput: true,
				allowEmpty:true
			});

		
		}
		
		$("#color-" + (groupNumber + 1)).spectrum({
			preferredFormat: "hex",
			showInput: true,
			allowEmpty:true
		});
		
		$("#color-tc").spectrum({
			color: tcColor,
			preferredFormat: "hex",
			showInput: true,
			allowEmpty:true
		});
		
		$("#color-admin").spectrum({
			color: adminColor,
			preferredFormat: "hex",
			showInput: true,
			allowEmpty:true
		});
		
		$("#color-mod").spectrum({
			color: modColor,
			preferredFormat: "hex",
			showInput: true,
			allowEmpty:true
		});
		
		$("#color-vip").spectrum({
			color: vipColor,
			preferredFormat: "hex",
			showInput: true,
			allowEmpty:true
		});

		
		for(var i = 0; i < ignoreNumber; i++) {				
			$("#ignore-" + i).click(ignoreCallback(i));		
		}
		
		
		$("#highlightBtn-" + (groupNumber + 1)).button();
		$("#highlightBtn-" + (groupNumber + 1)).click(function() {
			$(".btn").attr("disabled", "disabled");
			
			var userNameArray = $.csv.toArray($("#userNames-" + (groupNumber + 1)).val());
			
			highlightList.groups.push( 
				{
					"groupName": $("#groupName-" + (groupNumber + 1)).val(),
					"color": $("#color-" + (groupNumber + 1)).val(),
					"userNames": userNameArray
				});
				
			localStorage.setItem("highlightList", JSON.stringify(highlightList));
			
			document.location = "/boards/user.php?settings=1#tabs-3";
			location.reload(true);
		});
		


		for(var i = 0; i < sigNumber; i++) {
				
			$("#sigBtn-" + (i + 1)).button();
			$("#sigBtn-" + (i + 1)).click(sigClickCallback(i + 1));

			$("#sigDeleteBtn-" + (i + 1)).button();
			$("#sigDeleteBtn-" + (i + 1)).click(sigDeleteCallback(i + 1));

		
		}
		
		$("#sigBtn-" + (sigNumber + 1)).button();
		$("#sigBtn-" + (sigNumber + 1)).click(function() {
			var sigText = $("#signature-" + (sigNumber + 1)).val();
			var sigLines = (sigText.match(/\n/g)||[]).length;
			var sigCharacters = sigText.length + sigLines;
		
			if((sigLines <= 1) && (sigCharacters <= 160)) { 
				$(".btn").attr("disabled", "disabled");
				
				var boardNameArray = $.csv.toArray($("#boards-" + (sigNumber + 1)).val());
				var accountNameArray = $.csv.toArray($("#accounts-" + (sigNumber + 1)).val());
				
				sigList.signatures.push( 
					{
						"boards": boardNameArray,
						"accounts": accountNameArray,
						"signature": sigText
					});
					
				localStorage.setItem("sigList", JSON.stringify(sigList));
				
				document.location = "/boards/user.php?settings=1#tabs-5";
				location.reload(true);
			} else {
				alert("Signature is too long. " + sigLines + " breaks and " + sigCharacters + " characters.");
			}
		});

		
		/*
		
		$("#exportSigs").click(function() {
			var oMyBlob = new Blob([localStorage.sigList], {type : 'application/octet-stream'});
			var url = URL.createObjectURL(oMyBlob);
			
			window.open(url, '_blank');
		});
		
		
		// This is off of SO: http://stackoverflow.com/questions/11046919/how-do-i-read-a-text-file-on-my-local-disk-into-a-variable-in-javascript
		function handleFileSelect(evt) {
			var files = evt.target.files; // FileList object

			// Loop through the FileList
			for (var i = 0, f; f = files[i]; i++) {

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				return function(e) {
					importSigList = e.target.result;
					$("#importSigs").removeAttr("disabled");
				};
			})(f);

			// Read in the file
			//reader.readAsDataText(f,UTF-8);
			//reader.readAsDataURL(f);

			reader.readAsText(f);
			}
		}
		document.getElementById('importSigFiles').addEventListener('change', handleFileSelect, false);
		
		// This is off of SO
		
		$("#importSigs").click(function() {
			localStorage.setItem("sigList", importSigList);
			document.location = "/boards/user.php?settings=1#tabs-5";
			location.reload(true);
		});
		
		*/
		
		// sets options.		 
		$("#enableWebm").val(enableWebm);
		$("#enableCode").val(enableCode);
		$("#enableQuickEdit").val(enableQuickEdit);
		$("#enableQuickTopic").val(enableQuickTopic);
		$("#enableAvatars").val(enableAvatars);
		$("#avatarDomain").val(avatarDomain);
		$("#enableHighlight").val(enableHighlight);
		$("#enableIgnore").val(enableIgnore);
		//$("#enableBoardSelector").val(enableBoardSelector);
		$("#enableTTI").val(enableTTI);
		$("#maxWidth").val(maxWidth);
		$("#maxHeight").val(maxHeight);
		$("#enableRotatingSigs").val(enableRotatingSigs);
		$("#enableAMP").val(enableAMP);
		$("#enableTracked").val(enableTracked);
		$("#color-tc").val(enableTracked);
		$("#color-admin").val(enableTracked);
		$("#color-mod").val(enableTracked);
		$("#color-vip").val(enableTracked);
		$("#searchTopics").val(searchTopics);
		$("#enableFilter").val(enableFilter);


		// Updates General Settings	
		$("#updateGeneral").button();
		$("#updateGeneral").click(function(event) {
			$("#updateGeneral").attr("disabled", "disabled");
			$("#updateGeneral").val("Updating Settings. Please Wait.");
			
			localStorage.setItem("enableWebm", $("#enableWebm").val());
			localStorage.setItem("enableCode", $("#enableCode").val());
			localStorage.setItem("enableQuickEdit", $("#enableQuickEdit").val());
			localStorage.setItem("enableQuickTopic", $("#enableQuickTopic").val());
			localStorage.setItem("enableAvatars", $("#enableAvatars").val());
			localStorage.setItem("avatarDomain", $("#avatarDomain").val());
			localStorage.setItem("enableHighlight", $("#enableHighlight").val());
			localStorage.setItem("enableIgnore", $("#enableIgnore").val());
			//localStorage.setItem("enableBoardSelector", $("#enableBoardSelector").val());
			localStorage.setItem("enableTTI", $("#enableTTI").val());
			localStorage.setItem("maxWidth", $("#maxWidth").val());
			localStorage.setItem("maxHeight", $("#maxHeight").val());
			localStorage.setItem("enableRotatingSigs", $("#enableRotatingSigs").val());
			localStorage.setItem("enableAMP", $("#enableAMP").val());
			localStorage.setItem("enableTracked", $("#enableTracked").val());
			localStorage.setItem("tcColor", $("#color-tc").val());
			localStorage.setItem("adminColor", $("#color-admin").val());
			localStorage.setItem("modColor", $("#color-mod").val());
			localStorage.setItem("vipColor", $("#color-vip").val());
			localStorage.setItem("searchTopics", $("#searchTopics").val());
			localStorage.setItem("enableFilter", $("#enableFilter").val());
			document.location = "/boards/user.php?settings=1#tabs-1";
			location.reload(true);
		});
		
		$("#updateHighlightSpecial").click(function(event) {
			localStorage.setItem("tcColor", $("#color-tc").val());
			localStorage.setItem("adminColor", $("#color-admin").val());
			localStorage.setItem("modColor", $("#color-mod").val());
			localStorage.setItem("vipColor", $("#color-vip").val());
			document.location = "/boards/user.php?settings=1#tabs-3";
			location.reload(true);
		});

		$("#color-tc").val(tcColor);
		$("#color-admin").val(adminColor);
		$("#color-mod").val(modColor);
		$("#color-vip").val(vipColor);

	}
	
	
	/* error checking when handling the upload */	

	$("#file").change(function() {
	
		var file = this.files[0];
		var size = file.size;
		var type = file.type;
		
		if( !type.match(/image.*/) ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Invalid File Type");
			return;		
		}
		
		if( size > 204800 ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Image is too big (" + size/1024 + "KB). 200KB maximum.");
			return;
		}
		
		if( !user ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Log in to upload avatars.");
		}
		
		$("#submit_btn").css("display", "inline");
		$("#server_message").html("OK");
	
		

	});
	
	// Signature Export
	
	$("#sig_export").click(function() {
		$("#sigWidget").dialog("open");
	});
	
	/* ajax request to handle the upload */

		$("#submit_btn").click( function() {
		
		
		
			var formData = new FormData($('#submit')[0]);
		
			$("#server_message").html("Uploading...");
		
			$.ajax( {
				url: "http://www.nostlagiasky.pw/gamefaqs-avatars/upload-v2.php",
				dataType: "html",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				async: false
			}).done(function( data ) {
				if( data == 'Upload Successful! Refreshing to apply changes...') {
					$("#server_message").html("[1/2] Upload Successful!");
				} else {
					$("#server_message").html(data);
				}
			}).error(function() {
				$("#server_message").html("[1/2] ERROR: Avatar not uploaded to nostlagiasky domain.");
			});
			
			$.ajax( {
				url: "http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/upload-v2.php",
				dataType: "html",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				async: false
			}).done(function( data ) {
				if( data == 'Upload Successful! Refreshing to apply changes...') {
					$("#server_message").html("[2/2] Upload Successful! Refreshing to apply changes...");
					location.reload(true);
				} else {				
					$("#server_message").html(data);
					location.reload(true);
				}
			}).error(function() {
				$("#server_message").html("[2/2] ERROR: Avatar not uploaded to weblab domain. Refreshing to apply changes...");
				location.reload(true);

			});

			
		});
	
	
	/* storage setters */
	$("#av_left").click( function() {
		localStorage.setItem("avatar", "left");
	});
	
	$("#av_right").click( function() {
		localStorage.setItem("avatar", "right");
	});
	
	$("#av_no").click( function() {
		localStorage.setItem("avatar", "no");
	});
	
	$.ajax( {
		url: "http://nostlagiasky.pw/xfaqs/xfaqsnews.php",
		dataType: "html",
		type: "GET",
	}).done(function( data ) {
		$("#tabs-0").html(data);
	}).error(function() {
		$("#tabs-0").html("unable to get xfaqs news - your ISP could be blacklisting nostlagiasky.pw");
	});

	

}