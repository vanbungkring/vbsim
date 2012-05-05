/*
 author: arie prasetyo
 company: 513
 */
var tabGroup;
(function() {
	// 1. create tab group
	tabGroup = Ti.UI.createTabGroup({
		activeTabBackgroundColor : '#fff'
	});

	// 2. add SweetTabButton and setup event listener
	require("lib/sweettabbutton").addSweetTabButton(tabGroup);
	tabGroup.addEventListener("bt:click", _clickButton);

	// 3. init tab button
	tabGroup.bt.init({
		type : tabGroup.bt.TYPE_BLACK,
		icon : "images/tengah.png"
	});

	// 4. add tabs *** NOTE: You MUST have just 5 tabs (3rd tab will be ignored) ***
	tabGroup.addTab(_createNews());
	tabGroup.addTab(_createTab_video());
	tabGroup.addTab(Ti.UI.createTab());
	tabGroup.addTab(_createTab_Gallery());
	tabGroup.addTab(_createTab_Schedule());

	// 5. open tab group
	//checkDirectory();
	tabGroup.open();
})();
//

// init tab button

// click behavior of tab button
function _clickButton() {
	var w = Titanium.UI.createWindow({
		height : 0,
		backgroundColor : '#000',
		opacity : 0.9,
		bottom : 0
	});

	// create window open animation
	var a = Titanium.UI.createAnimation();
	a.height = 460;
	a.duration = 300;

	// create a button to close window
	var b = Titanium.UI.createButton({
		title : 'Close',
		height : 30,
		width : 150
	});
	w.add(b);
	b.addEventListener('click', function() {
		a.height = 0;
		w.close(a);
	});

	w.open(a);
}

// create demo tab
function _createNews() {
	Titanium.UI.iPhone.showStatusBar();
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	var win = Ti.UI.createWindow({
		title : 'News',
		barImage : 'images/navbar.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'news.js',

		backgroundRepeat : false
	});
	var buttonNav = Ti.UI.createButton({
		width : 24,
		//title : 'Setting',
		height : 24,
		//backgroundImage : 'images/my-button.png'
		backgroundImage : 'images/gear.png',
	});
	win.rightNavButton = buttonNav;
	var backbutton = Titanium.UI.createButton({
		backgroundImage : 'images/back.png',
		top : 5,
		width : 24,
		height : 24
	});
	var pengaturan = Ti.UI.createWindow({
		title : "Pilih Kanal",
		barImage : 'images/navbar.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'detail_news.js',
	});
	pengaturan.setLeftNavButton(backbutton);
	backbutton.addEventListener('click', function(e) {
		pengaturan.close();
	});
	buttonNav.addEventListener("click", function() {
		tab.open(pengaturan);
	});
	var tab = Ti.UI.createTab({
		icon : 'images/World.png',
		backgroundImage : 'images/news.png',
		title : 'News',
		window : win,
	});
	return tab;
}

// create other tabs
function _createTab_video() {
	Titanium.UI.iPhone.showStatusBar();
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	var win = Ti.UI.createWindow({
		title : 'Video',
		barImage : 'images/navbar-blue.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'video.js',

		backgroundRepeat : true
	});
	var buttonNav = Ti.UI.createButton({
		width : 24,
		//title : 'Setting',
		height : 24,
		//backgroundImage : 'images/my-button.png'
		backgroundImage : 'images/gear.png',
	});
	win.rightNavButton = buttonNav;
	var backbutton = Titanium.UI.createButton({
		backgroundImage : 'images/back.png',
		top : 5,
		width : 24,
		height : 24
	});
	var pengaturan = Ti.UI.createWindow({
		title : "Pilih Kanal",
		barImage : 'images/navbar-blue.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'detail_video.js',
	});
	pengaturan.setLeftNavButton(backbutton);
	backbutton.addEventListener('click', function(e) {
		pengaturan.close();
	});
	buttonNav.addEventListener("click", function() {
		tab.open(pengaturan);
	});
	var tab = Ti.UI.createTab({
		icon : 'images/Video.png',
		backgroundImage : 'images/news.png',
		title : 'video',
		window : win,
	});
	return tab;
}

function _createTab_Gallery() {
	Titanium.UI.iPhone.showStatusBar();
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	var win = Ti.UI.createWindow({
		title : 'Gallery',
		url : 'gallery.js',
		barImage : 'images/navbar-kuning.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
	});
	var tab = Ti.UI.createTab({
		icon : 'images/Camera.png',
		title : 'Gallery',
		window : win,
		backgroundColor : 'white'
	});

	return tab;
}

function _createTab_Schedule() {
	Titanium.UI.iPhone.showStatusBar();
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	var win = Ti.UI.createWindow({
		title : 'Maps',
		barImage : 'images/navbar-blue.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'testing.js',

		backgroundRepeat : true
	});
	var buttonNav = Ti.UI.createButton({
		width : 24,
		//title : 'Setting',
		height : 24,
		//backgroundImage : 'images/my-button.png'
		backgroundImage : 'images/gear.png',
	});
	win.rightNavButton = buttonNav;
	var backbutton = Titanium.UI.createButton({
		backgroundImage : 'images/back.png',
		top : 5,
		width : 24,
		height : 24
	});
	var pengaturan = Ti.UI.createWindow({
		title : "Pilih Kanal",
		barImage : 'images/navbar-blue.png',
		backgroundImage : 'images/bg.gif',
		backgroundRepeat : true,
		url : 'testing_detail.js',
	});
	pengaturan.setLeftNavButton(backbutton);
	backbutton.addEventListener('click', function(e) {
		pengaturan.close();
	});
	buttonNav.addEventListener("click", function() {
		tab.open(pengaturan);
	});
	var tab = Ti.UI.createTab({
		icon : 'images/Compass.png',
		backgroundImage : 'images/news.png',
		title : 'Maps',
		window : win,
	});
	return tab;

	return tab;
}

