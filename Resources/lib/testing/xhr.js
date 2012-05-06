function loadDataInternet(inx, pageNumb) {
	/////////aktifasi semua json////
	var startIndex = 1;
	if(pageNumb > 1) {
		startIndex = rowData.length - 1;
	}
	loader.onload = function() {
		var tweets = eval('(' + this.responseText + ')');
		//alert('loading pageNumber = ' + tweets.count);
		for(var i = 0; i < tweets.count; i++) {
			var tweet = tweets.posts[i].excerpt;
			var id = tweets.posts[i].id;
			var date = tweets.posts[i].date;
			var user = tweets.posts[i].title;
			var contents = tweets.posts[i].content;
			var subtitles = tweets.posts[i].subtitle;
			var avatar = tweets.posts[i].thumbnail1;
			var url = tweets.posts[i].url;
			var video_capture = tweets.posts[i].video;
			//Ti.API.info(video_capture);
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
				height : 65,
				textAlign : 'left',
				color : '#000',
				font : {
					fontFamily : 'HelveticaNeue-CondensedBold',
					fontSize : 16,
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
			if(news_thumbnail.text == 0) {
				news_thumbnail.text = 'images/not-connect.jpg';
			}
			post_view.add(news_thumbnail);
			//Ti.API.info(news_thumbnail.text);
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
				text : video_capture, // the image for the image view
				left : 30,
				top : 30,
				height : 0,
				width : 0,
				zIndex : 100
			});
			post_view.add(vid_image);
			post_view.addEventListener('click', function(e) {
				var judul = e.row.children[0].children[1].text;
				var content_web = e.row.children[0].children[3].text;
				var image_awal = e.row.children[0].children[4].text;
				var video_link = e.row.children[0].children[5].text;
				if(video_link != 0) {
					var innerHTML = '<html><link rel="stylesheet" href="lib/style.css"><body> <div id="content"><h1>' + judul + '</h1><video controls><source src="' + video_link + '"></source></video controls>' + content_web + '</div></body></html>';
				} else {
					var innerHTML = '<html><link rel="stylesheet" href="lib/style.css"><body> <div id="content"><h1>' + judul + '</h1>' + content_web + '</div></body></html>';
				}
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
			})
			row.add(post_view);
			// Give each row a class name
			row.className = "item" + i;
			// Add row to the rowData array
			rowData[startIndex + i] = row;
			//db.execute("delete from news where id=?", id);
			//masukkan data ke database
			db.execute("insert or replace into news(id,title,subtitle,content,channel,tanggal,excerpt,images) values(?,?,?,?,?,?,?,?)", id, user, subtitles, contents, inx, date, tweet, avatar);
			//db.close();
			if((i > 0 ) && (i % 4 == 0)) {
				var row = Titanium.UI.createTableViewRow({
					height : 75,
					//backgroundImage : 'images/normal.png',
					//selectedBackgroundImage : 'images/news-column.png',
				});
				//row.show();
				var post_view = Titanium.UI.createWebView({
					height : 75,
					layout : 'vertical',
					width : 320,
				});
				var tweet_lbl = Titanium.UI.createWebView({
					url : 'lib/iklan.html',
					left : -10,
					height : 'auto',
					textAlign : 'left',
					page : pageNumb + 1
				});
				post_view.add(tweet_lbl);
				post_view.addEventListener('click', function(e) {
					alert('iklan');
					//alert('after ' + paging);
				})
				row.add(post_view);
				// Give each row a class name
				row.className = "item" + (rowData.length);
				rowData[rowData.length] = row;
				startIndex++;
				//pageNumb++;
			}
		}
		//load more-------------------------
		var row = Titanium.UI.createTableViewRow({
			height : 40,
			//backgroundImage : 'images/normal.png',
			//selectedBackgroundImage : 'images/news-column.png',
		});
		row.show();
		var post_view = Titanium.UI.createView({
			height : 'auto',
			layout : 'vertical',
			width : '100%',
		});
		var tweet_lbl = Titanium.UI.createLabel({
			text : 'Load More',
			left : 20,
			height : 'auto',
			textAlign : 'left',
			font : {
				fontFamily : 'HelveticaNeue-CondensedBold',
				fontSize : 16,
				fontWeight : 'bold'
			},
			page : pageNumb + 1
		});
		post_view.add(tweet_lbl);
		post_view.addEventListener('click', function(e) {
			var paging = e.row.children[0].children[0].page;
			//alert('before ' + paging);
			loadDataInternet(inx, paging);
			//alert('after ' + paging);
		})
		row.add(post_view);
		// Give each row a class name
		row.className = "item" + (rowData.length);
		rowData[rowData.length] = row;
		tableView.setData(rowData);
		setTimeout(function() {
			progressView.hide();
		}, 1000);
	};
	loader.onerror = function() {
		progressView.change({
			text : "Error On Loading Data From Server",
			//success : true
		});
		setTimeout(function() {
			progressView.hide();
		}, 1000);
		rowData.show();
	};
	if(pageNumb > 1) {
		//alert(url + inx + '/' + pageNumb);
		loader.open("GET", url + inx + '/' + pageNumb);
	} else {
		//alert(url + inx);
		loader.open("GET", url + inx);
	}
	loader.send();
}

////////////////////////////////////////
function LoadHeadline(inx) {
	rowData = [];
	loader.onload = function() {
		var headLines = eval('(' + this.responseText + ')');
		//alert('loading pageNumber = ' + tweets.count);
		var row = Titanium.UI.createTableViewRow({
			height : 188,
			backgroundColor : 'black'
		});
		var scrollViews = [];
		for(var i = 0; i < headLines.count; i++) {
			var tweet = headLines.posts[i].excerpt;
			var id = headLines.posts[i].id;
			var date = headLines.posts[i].date;
			// The tweet message
			var user = headLines.posts[i].title;
			//alert(user);
			var contents = headLines.posts[i].content;
			var subtitles = headLines.posts[i].subtitle;
			// The screen name of the user
			var avatar = headLines.posts[i].thumbnail1;
			// The profile image
			var url = headLines.posts[i].url;
			//var video_capture = headLines.posts[i].video;
			//alert(textJudul)
			var HeadlineContent = Titanium.UI.createView({
				backgroundColor : 'black'
			});
			var labelHeadline = Titanium.UI.createLabel({
				text : user,
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
				text : contents,
			})
			var imageHeadlineContent = Ti.UI.createImageView({
				image : 'lib/img/transparent.png',
				top : 105,
				width : 320,
				height : 90,
				zIndex : 9
			})
			var imageHeadline = Titanium.UI.createImageView({
				image : avatar,
				zIndex : 8,
				width : 320,
				height : 200
			});
			HeadlineContent.addEventListener('click', function(e) {
				alert(e);
			})
			db.execute("insert or replace into news(id,title,subtitle,content,channel,tanggal,excerpt,images,is_headline) values(?,?,?,?,?,?,?,?,?)", id, user, subtitles, contents, inx, date, tweet, avatar, 1);
			HeadlineContent.add(labelHeadline);
			HeadlineContent.add(imageHeadlineContent);
			HeadlineContent.add(imageHeadline);
			scrollViews.push(HeadlineContent);
		}
		var scrollView = Titanium.UI.createScrollableView({
			views : scrollViews,
			showPagingControl : true,
			pagingControlColor : 'black',
			pagingControlHeight : 15
		});
		row.add(scrollView);
		rowData[rowData.length] = row;
		tableView.setData(rowData);
		//Add the table view to the window
		//win.add(tableView);
		loadDataInternet(inx, 1);
	};
	loader.onerror = function() {
		progressView.change({
			text : "Error On Loading Data From Server",
			//success : true
		});
		setTimeout(function() {
			progressView.hide();
		}, 1000);
		rowData.show();
	};
	loader.open("GET", urlHeadline + inx);
	loader.send();
}