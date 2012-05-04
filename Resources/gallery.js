Ti.include('lib/tab_strip.js');
Ti.include("lib/progress.js");
Ti.include("lib/gallery/database.js");
Ti.include("lib/gallery/xhr.js");

var progressView = new ProgressView();
var win = Titanium.UI.currentWindow;
var dbx = Titanium.Database.install('lib/sportkus.sqlite', 'sportkusgallery');
var rowData = [];
var url = "http://www.sportku.com/api/get_gallery/";
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
	barColor : '#000',
	backgroundImage : 'images/bg.gif',
	backgroundRepeat : true,
	navBarHidden : false,
})
var close = Titanium.UI.createButton({
	title : 'Button',
	style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
close.addEventListener('click', function(e) {
	webwin.close();
})
var rows = dbx.execute('SELECT id,name from channel where parent_id=0');
var crit = dbx.execute('SELECT count(*) from news');
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
			loadTweets(index_brita);
			//LoadDatabaseHeadline(index_brita);
		}
	});
	win.add(tabStripView);
	tabStripView.selectTab(0);
}

loadTabStripData();
