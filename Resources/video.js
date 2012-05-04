Ti.include('lib/tab_strip.js');
Ti.include("lib/progress.js");
Ti.include("lib/video/database.js");
Ti.include("lib/video/xhr.js");

var progressView = new ProgressView();
var win = Titanium.UI.currentWindow;
var db = Titanium.Database.open('sportkus');
var rowData = [];
var url = "http://www.sportku.com/api/get_video_news/";
var urlHeadline = "http://www.sportku.com/api/get_headline_news/";
var loader = Titanium.Network.createHTTPClient();
var zzz = [];
var yyy = [];
var tabs;
var x = [];
var tableView = Titanium.UI.createTableView({
	top : 30,
	separatorColor : '#ccc',
	//data : rowData,
});
var webwin = Ti.UI.createWindow({
	modal : true,
	//barColor : '#000',
	backgroundImage : 'images/bg.gif',
	backgroundRepeat : true,
	title : 'News Detail',
	barImage : 'images/navbar.png',
	navBarHidden : false,
})
var close = Titanium.UI.createButton({
	backgroundImage : 'images/back.png',
	top : 5,
	width : 24,
	height : 24
});
close.addEventListener('click', function(e) {
	webwin.close();
})
var rows = db.execute('select id,name from channel where parent_id=0 order by id');
//var crit = db.execute('SELECT count(*) from news');
while(rows.isValidRow()) {
	zzz.push(rows.fieldByName('name'));
	yyy.push(rows.fieldByName('id'));
	rows.next();
}
rows.close();

function loadTabStripData() {

	var tabStripView = createTabStrip({

		labels : zzz,
		onselect : function(index) {
			progressView.show({
				text : "Loading Data From Server",
			});
			var index_brita = yyy[index];
			loadDatabase(index_brita);
			//LoadDatabaseHeadline(index_brita);
		}
	});
	win.add(tabStripView);
	tabStripView.selectTab(0);
}

loadTabStripData();
