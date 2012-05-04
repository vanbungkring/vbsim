function loadDatabase(inx) {
	progressView.show({
		text : "Loading Data From Server",
	});
	if(inx == 0) {
		var dataBaseDatalastNews = db.execute('select * from video Order By tanggal Desc limit 100');
	} else {
		var dataBaseDatalastNews = db.execute('select * from video where channel=' + inx + ' Order By tanggal Desc limit 20');
	}
	rowData = [];
	var i = 0;
	while(dataBaseDatalastNews.isValidRow()) {
		//tweets.posts[i].excerpt;
		var id = dataBaseDatalastNews.fieldByName('id');
		//tweets.posts[i].id;
		var date = dataBaseDatalastNews.fieldByName('tanggal');
		//tweets.posts[i].date;
		// The tweet message
		var user = dataBaseDatalastNews.fieldByName('title');
		//var content = dataBaseDatalastNews.fieldByName('content');
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
		// Create the label to hold the tweet message
	
		post_view.addEventListener('click', function(e) {
			var judul = e.row.children[0].children[1].text;
		//	var content_web = e.row.children[0].children[2].text;
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
	win.add(tableView);
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

/*
 function LoadDatabaseHeadline(inx) {
 if(inx == 0) {
 var databaseHeadline = db.execute('select * from news where is_headline=1 Order By tanggal Desc limit 20');
 } else {
 var databaseHeadline = db.execute('select * from news where channel=' + inx + ' and is_headline=1 Order By tanggal Desc limit 20');
 }
 rowData = [];
 var i = 0;
 var scrollViews = [];
 var row = Titanium.UI.createTableViewRow({
 height : 188,
 backgroundColor : 'black'
 });
 var scrollViews = [];
 while(databaseHeadline.isValidRow()) {
 var id = databaseHeadline.fieldByName('id');
 var tanggal = databaseHeadline.fieldByName('tanggal');
 var title = databaseHeadline.fieldByName('title');
 var subtitle = databaseHeadline.fieldByName('subtitle');
 var excerpt = databaseHeadline.fieldByName('excerpt');
 var content = databaseHeadline.fieldByName('content');
 var imagesData = 'images/not-connect.jpg';
 var HeadlineContent = Titanium.UI.createView({
 backgroundColor : 'black'
 });
 var labelHeadline = Titanium.UI.createLabel({
 text : title,
 zIndex : 10,
 top : 108,
 color : '#ffffff',
 backgroundRepeat : true,
 backgroundPadding : 5,
 width : 310,
 font : {
 fontFamily : 'HelveticaNeue-CondensedBold',
 fontSize : 14,
 fontWeight : 'bold',
 },
 height : 75,
 left : 5,
 right : 5
 });
 var contentHeadline = Ti.UI.createLabel({
 text : content,
 })
 var imageHeadlineContent = Ti.UI.createImageView({
 image : 'lib/img/transparent.png',
 top : 105,
 width : 320,
 height : 90,
 zIndex : 9
 })
 var imageHeadline = Titanium.UI.createImageView({
 image : imagesData,
 zIndex : 8,
 width : 320,
 height : 200
 });
 HeadlineContent.addEventListener('click', function(e) {
 alert(e);
 });
 HeadlineContent.add(labelHeadline);
 HeadlineContent.add(imageHeadlineContent);
 HeadlineContent.add(imageHeadline);
 scrollViews.push(HeadlineContent);
 };
 var scrollView = Titanium.UI.createScrollableView({
 views : scrollViews,
 showPagingControl : true,
 pagingControlColor : 'black',
 pagingControlHeight : 15
 });
 row.add(scrollView);
 rowData[rowData.length] = row;
 tableView.setData(rowData);
 }
 */