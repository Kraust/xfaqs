var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "*.gamefaqs.com",
	contentStyleFile:  [data.url("default.min.css"), 
						data.url("xfaqs-main.css"),
						data.url("spectrum.css")],
	contentScriptFile: [data.url("jquery-2.1.1.min.js"), 
						data.url("jquery-ui.min.js"), 
						data.url("jquery.csv-0.71.min.js"), 
						data.url("highlight.min.js"), 
						data.url("spectrum.js"),
						data.url("filesaver.js"),						
						data.url("storage.js"),
						data.url("filter.js"),
						data.url("modules.js"), 						
						data.url("tti.js"),
						data.url("settings.js"), 
						data.url("gamefaqs-avatars.js"), 
						data.url("quick-topic.js"), 
						data.url("rotating-sigs.js"), 
						data.url("quick-edit.js"), 
						data.url("webm.js"), 
						data.url("youtube.js"),
						data.url("amp.js"),
						data.url("tracked-topics.js"),
						data.url("board-selector.js"),
						data.url("export-import.js"),
						data.url("hotkeys.js"),
						data.url("badges.js")],

	contentScriptWhen: "ready"
});