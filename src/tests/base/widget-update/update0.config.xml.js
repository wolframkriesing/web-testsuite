//
//	The real stuff
//
var config = {
	versionString:+new Date(), // So the latest widget has always a newer version and automatically updates when installed.
	widgetIdSuffix: "test-base-widget-update-update-v0",
	widgetName:"update0 (base/widget-update)"
};

var SRC_PATH = "/Users/cain/work/vodafone-jil/src/widget-test-suite/src/";

var features = ["widget", "audioplayer", "multimedia"];
var xml = xmlHelper.getXmlObject(SRC_PATH + "config.xml.tpl-js", features);
xml.@version = "0";
//xml.widget.id =
