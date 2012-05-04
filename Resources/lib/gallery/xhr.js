// Function loadTweets()
function loadTweets(inx) {
	// Empty array "rowData" for our tableview
	var rowData = [];
	var x = url + inx;
	var i;
	// Create our HTTP Client and name it "loader"
	var loader = Titanium.Network.createHTTPClient();
	// Sets the HTTP request method, and the URL to get data from
	loader.open("GET", url + inx);
	//alert(loader.open);
	// Runs the function when the data is ready for us to process
	loader.onload = function() {
		var tweets = eval('(' + this.responseText + ')');
		var scrollViews = [];
		//Ti.API.info(tweets);
		for( i = 0; i < tweets.count; i++) {
			var tweet = tweets.albums[i].excerpt;
			var id = tweets.albums[i].id;
			var date = tweets.albums[i].date;
			var user = tweets.albums[i].title;
			var contents = tweets.albums[i].content;
			var subtitles = tweets.albums[i].subtitle;
			var avatar = tweets.albums[i].thumbnail;
			var url = tweets.albums[i].url;
			var video_capture = tweets.albums[i].video;
			//Ti.API.info(video_capture);
			var count_images = tweets.albums[i].count_photos;
			var the_photos = tweets.albums[i].photo;

			var row = Titanium.UI.createTableViewRow({
				height : 'auto',
				top : 30,
				backgroundImage : 'images/normal.png',
				height : 75,
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

			var av_image = Titanium.UI.createImageView({
				image : avatar, // the image for the image view
				left : 5,
				top : -3,
				height : 80,
				width : 80,
			});
			post_view.add(av_image);
			var user_lbl = Titanium.UI.createLabel({
				text : user,
				left : 90,
				width : 205,
				top : -70,
				bottom : 0,
				height : 70,
				textAlign : 'left',
				color : '#000',
				font : {
					fontFamily : 'HelveticaNeue-CondensedBold',
					fontSize : 14,
					fontWeight : 'bold'
				},
			});
			post_view.add(user_lbl);
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
			var contents_crut = Titanium.UI.createLabel({
				text : contents,
				width : 1,
				height : 1
			});
			post_view.add(contents_crut);
			var news_thumbnail = Titanium.UI.createLabel({
				text : avatar,
				width : 0,
				height : 0
			})
			post_view.add(news_thumbnail);
			var vid_image = Titanium.UI.createImageView({
				image : 'images/video-capture.png', // the image for the image view
				left : 30,
				top : 30,
				height : 24,
				width : 24,
				zIndex : 100
				///images/video-capture.png

			});
			var vid_image = Titanium.UI.createLabel({
				text : count_images, // the image for the image view
				left : 0,
				top : 30,
				height : 0,
				width : 0,
				zIndex : 100
			});
			post_view.add(vid_image);

			var test_views = [];
			var photo_index;

			for(photo_index in the_photos) {

				var test_view = Titanium.UI.createImageView({
					backgroundColor : '#000',
					image : the_photos[photo_index].large,
				});

				test_views.push(test_view);
			}

			var scrollView = Titanium.UI.createScrollableView({
				views : test_views,
				showPagingControl : true
			});
			scrollViews[i] = scrollView;

			post_view.addEventListener('click', function(e) {
				var x = e.row.children[0].children[5].text;

				var images = [];
				var close = Titanium.UI.createButton({
					title : 'Close',
					style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
				close.addEventListener('click', function(e) {
					win_gallery.close();
				})
				var win_gallery = Titanium.UI.createWindow({
					navBarHidden : false,
					barColor : 'black',
					modal : true
				});

				win_gallery.add(scrollViews[e.index]);
				win_gallery.leftNavButton = close;
				win_gallery.open();
			})
			row.add(post_view);
			// Give each row a class name
			row.className = "item" + i;
			// Add row to the rowData array
			rowData[i] = row;
		}
		setTimeout(function() {
			progressView.hide();
		}, 2000);
		// Create the table view and set its data source to "rowData" array
		var tableView = Titanium.UI.createTableView({
			top : 30,
			data : rowData
		});

		//Add the table view to the window
		win.add(tableView);
	};
	loader.send();

}

loadTweets();
