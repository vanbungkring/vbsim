function loadDatabase(inx) {

	var dataBaseDatalastNews = dbx.execute('select * from gallery where channel=' + inx + ' Order By tanggal Desc limit 20');
	//rowData = [];
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
			height : 60,
			textAlign : 'left',
			color : '#000',
			font : {
				fontFamily : 'HelveticaNeue-CondensedBold',
				fontSize : 14,
				fontWeight : 'bold'
			},
		});
		post_view.add(user_lbl);
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
			progressView.show({
				text : "Can't Open Post'",
				error : true
			});
			setTimeout(function() {
				progressView.hide();
			}, 2000);
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
		//return loadDatabase(inx);
		loadDataInternet(inx);
	} else {
		progressView.show({
			text : "No Internet Connection or Sportku Server is Down",
			error : true
		});
		setTimeout(function() {
			progressView.hide();
		}, 2000);
	}

}

