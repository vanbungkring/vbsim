// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
Ti.include('lib/tab_strip.js');
Ti.include("lib/progress.js");
Ti.include("lib/kanal/database.js");
Ti.include("lib/kanal/xhr.js");
var progressView = new ProgressView();
var rowData = [];
var url = "http://www.sportku.com/api/get_latest_news/";
var urlHeadline = "http://www.sportku.com/api/get_headline_news/";
var loader = Titanium.Network.createHTTPClient();
var tableView = Titanium.UI.createTableView({
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
var tableview = Ti.UI.createTableView({
});

var winzz = Ti.UI.createWindow({
	barImage : 'images/navbar.png',
	backgroundImage : 'images/bg.gif',
	backgroundRepeat : true,
});
var backbutton = Titanium.UI.createButton({
	backgroundImage : 'images/back.png',
	top : 5,
	width : 24,
	height : 24
});
winzz.setLeftNavButton(backbutton);
backbutton.addEventListener('click', function(e) {
	winzz.close();
})
var db_kanal_news = Titanium.Database.open('sportkus');
// set the data from the database to the array
function setData() {

	var rows = db_kanal_news.execute('SELECT id,name FROM channel where id !=0');

	// create the array
	var dataArray = [];

	while(rows.isValidRow()) {
		dataArray.push({
			title : '' + rows.fieldByName('name') + '',
			id : rows.fieldByName('id'),
			hasChild : true,
			path : 'news_kanal.js',
			borderColor : '#000',
			font : {
				fontFamily : 'HelveticaNeue-CondensedBold',
				fontSize : 16,
				fontWeight : 'bold'
			},
		});
		rows.next();
	};
	// set the array to the tableView
	rows.close();

	tableview.setData(dataArray);
};

// create table view

tableview.addEventListener('click', function(e) {
	var index_cat = e.rowData.id;
	winzz.title = e.rowData.title
	Ti.UI.currentTab.open(winzz);
	;
	loadDatabase(index_cat);

});
currentWin.add(tableview);

setData();
/////database///
