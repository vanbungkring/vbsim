function loadDataInternet(inx, pageNumb) {
	progressView.show({
		text : "Loading Data From Server",
	});
	var startIndex = 1;
	if(pageNumb > 1) {
		startIndex = rowData.length;
	}
	rowData = [];
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
			db_kanal_news.execute("insert or replace into news(id,title,subtitle,content,channel,tanggal,excerpt,images) values(?,?,?,?,?,?,?,?)", id, user, subtitles, contents, inx, date, tweet, avatar);
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
			height : 65,
			//backgroundImage : 'images/normal.png',
			//selectedBackgroundImage : 'images/news-column.png',
		});
		row.show();
		var post_view = Titanium.UI.createView({
			height : 'auto',
			layout : 'vertical',
			width : '100%',
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
		});

		row.add(post_view);
		// Give each row a class name
		row.className = "item" + (rowData.length);
		rowData[rowData.length] = row;
		tableView.setData(rowData);
		winzz.add(tableView);
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