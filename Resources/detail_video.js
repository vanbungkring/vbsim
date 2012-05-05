// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
Ti.include('lib/tab_strip.js');
Ti.include("lib/progress.js");
Ti.include("lib/kanal_video/database.js");
Ti.include("lib/kanal_video/xhr.js");
var progressView = new ProgressView();
var rowData = [];
var url = "http://www.sportku.com/api/get_video_news/";
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
	title : 'Video Detail',
	barImage : 'images/navbar-blue.png',
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
	barImage : 'images/navbar-blue.png',
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

	var rows = db_kanal_news.execute('SELECT * FROM channel');

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
	Ti.UI.currentTab.open(winzz);
	winzz.title = e.rowData.title
	loadDatabase(index_cat);

});
currentWin.add(tableview);

function loadDatabase(inx) {
	if(inx == 0) {
		var dataBaseDatalastNews = db_kanal_news.execute('select * from video Order By tanggal Desc limit 20');
	} else {
		var dataBaseDatalastNews = db_kanal_news.execute('select * from video where channel=' + inx + ' Order By tanggal Desc limit 20');
	}
	rowData = [];
	var i = 0;
	while(dataBaseDatalastNews.isValidRow()) {
		var tweet = dataBaseDatalastNews.fieldByName('excerpt');
		//tweets.posts[i].excerpt;
		var id = dataBaseDatalastNews.fieldByName('id');
		//tweets.posts[i].id;
		var date = dataBaseDatalastNews.fieldByName('tanggal');
		//tweets.posts[i].date;
		// The tweet message
		var user = dataBaseDatalastNews.fieldByName('title');
		var content = dataBaseDatalastNews.fieldByName('content');
		//tweets.posts[i].title;
		// The screen name of the user
		var avatar = 'images/not-connect.jpg';
		// The profile image
		//var url = dataBaseDatalastNews.fieldByName('excerpt');;
		// Create a row and set its height to auto
		var row = Titanium.UI.createTableViewRow({
			height : 'auto',
			backgroundImage : 'images/normal.png',
			selectedBackgroundImage : 'images/news-column.png',
		});
		row.show();
		// Create the view that will contain the text and avatar
		var post_view = Titanium.UI.createView({
			height : 'auto',
			layout : 'vertical',
			width : '100%',
			height : 75
		});
		// Create image view to hold profile pic
		var av_image = Titanium.UI.createImageView({
			image : avatar, // the image for the image view
			left : 5,
			top : -3,
			height : 80,
			width : 80,
		});
		post_view.add(av_image);
		// Create the label to hold the screen name
		var user_lbl = Titanium.UI.createLabel({
			text : user,
			left : 90,
			width : 205,
			top : -70,
			bottom : 0,
			height : 16,
			textAlign : 'left',
			color : '#000',
			font : {
				fontFamily : 'HelveticaNeue-CondensedBold',
				fontSize : 16,
				fontWeight : 'bold'
			},
		});
		post_view.add(user_lbl);
		var contents = Titanium.UI.createLabel({
			text : content,

			bottom : 0,
			height : 0,

		});
		post_view.add(contents);
		// Create the label to hold the tweet message
		var tweet_lbl = Titanium.UI.createLabel({
			text : tweet,
			left : 90,
			top : -2,
			bottom : 2,
			height : 'auto',
			width : 205,
			height : 50,
			textAlign : 'left',
			font : {
				fontSize : 12
			}
		});
		post_view.add(tweet_lbl);
		post_view.addEventListener('click', function(e) {

			var judul = e.row.children[0].children[1].text;
			var content_web = e.row.children[0].children[2].text;
			var innerHTML = '<html><link rel="stylesheet" href="lib/style.css"><body> <div id="content"><h1>' + judul + '</h1>' + content_web + '</div></body></html>';
			var y = Ti.UI.createWebView({
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				html : innerHTML,
				enableZoomControls : false,
				focusable : true,
			});
			webwin.leftNavButton = close;
			//webwin.setToolbar([b]);
			webwin.add(y);
			webwin.open();

			/*progressView.show({

			 text : "Can't Open Post",
			 error : true
			 });

			 */
		});
		row.add(post_view);
		// Give each row a class name
		row.className = "item" + i;
		// Add row to the rowData array
		rowData[i] = row;
		i++;
		dataBaseDatalastNews.next();
	}
	//LoadDatabaseHeadline(inx);
	dataBaseDatalastNews.close();
	tableView.setData(rowData);
	//Add the table view to the window
	winzz.add(tableView);
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		LoadHeadline(inx);
	} else {
		progressView.show({
			text : "No Internet Connection",
			error : true
		});
		setTimeout(function() {
			progressView.hide();
		}, 2000);
	}
	//db.close();

}

setData();
