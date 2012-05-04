function createTabStrip(options) {
	options = options || {};
	params = {
		labels : options.labels || [],
		onselect : options.onselect || null,
		top : options.top || 0,
		height : options.height || 30,
		backgroundColor : options.backgroundColor || '#1a1a1a',
		gradientColor : options.gradientColor || '#000',
		selectedColor : options.selectedColor || '#fff',
		unselectedColor : options.unselectedColor || '#fff',
		fontSize : options.fontSize || 14,

	}

	var labelViews = [];
	var lastSelectedLabel = null;
	var totalWidth = 0;

	var containerView = Titanium.UI.createView({
		top : params.top,
		height : 30,
		width : 320,
		zIndex : 100,
		backgroundImage : 'img/bg.gif',
		backgroundRepeat : true
	});

	var leftArrow = Ti.UI.createLabel({
		text : String.fromCharCode(171),
		font : {
			fontSize : params.height / 2,
			fontWeight : 'bold'
		},
		color : params.selectedColor,
		height : params.height,
		width : 15,
		top : params.top,
		left : 2,
		textAlign : 'left',
		visible : false
	});
	//containerView.add(leftArrow);

	var scrollView = Titanium.UI.createScrollView({
		layout : 'horizontal',
		top : params.top,
		height : params.height,
		width : 320,
		font : {
			fontFamily : 'HelveticaNeue-CondensedBold'
		}
	});
	containerView.add(scrollView);

	var rightArrow = Ti.UI.createLabel({
		text : String.fromCharCode(187),
		font : {
			fontSize : params.height / 2,
			fontWeight : 'bold'
		},
		color : params.selectedColor,
		height : params.height,
		width : 15,
		top : params.top,
		right : 2,
		textAlign : 'right',
		visible : false
	});
	//containerView.add(rightArrow);

	scrollView.addEventListener('scroll', function(e) {
		leftArrow.visible = e.x > 5;
		rightArrow.visible = e.x < scrollView.contentWidth - scrollView.width;
	});

	containerView.labels = function(labels) {
		params.labels = labels;

		resetLabels();
	}
	containerView.selectTab = function(index) {

		select(labelViews[index]);
	}
	function resetLabels() {
		totalWidth = 0;
		labelViews = [];
		var oldLabels = scrollView.children;
		if(oldLabels) {
			for(var i = 0, count = oldLabels.length; i < count; i++) {
				scrollView.remove(oldLabels[i]);
			}
		}

		var labels = params.labels;
		for(var i = 0, count = labels.length; i < count; i++) {
			var button = createButton(labels[i], i);
			scrollView.add(button);
		}
		scrollView.contentWidth = totalWidth;
		rightArrow.visible = totalWidth > scrollView.width;
	}

	function createButton(title, index) {
		var buttonView = Ti.UI.createView({
			top : params.top,
			height : params.height
		});

		var label = Ti.UI.createLabel({
			text : title,
			font : {
				fontSize : params.fontSize,
				fontStyle : 'bold',
				fontFamily : 'HelveticaNeue-CondensedBold'
			},
			width : 'auto',
			textAlign : 'center',
			height : params.height,
			touchEnabled : false
		});
		label.index = index;
		labelViews.push(label);
		buttonView.add(label);
		showAsUnSlected(label);
		buttonView.addEventListener('click', function(e) {
			select(e.source.children[0]);
		});
		buttonView.width = 50 + 20;
		totalWidth += buttonView.width;

		if(index == 0) {
			showAsSelected(label);
		}
		return buttonView;
	}

	function select(label) {
		if(lastSelectedLabel) {
			showAsUnSlected(lastSelectedLabel);
		}
		showAsSelected(label)
		if(params.onselect) {
			params.onselect(label.index);
		}
	}

	function showAsSelected(label) {
		label.color = params.selectedColor;

		label.getParent().borderWidth = 0;
		lastSelectedLabel = label;
		label.getParent().backgroundColor = '#fff';
		label.getParent().fontWeight = 'Bold';
		label.color = "#000";
	}

	function showAsUnSlected(label) {
		label.color = params.unselectedColor;
		label.getParent().borderWidth = 0;
		label.getParent().backgroundColor = 'none';

	}

	resetLabels();
	return containerView;
}