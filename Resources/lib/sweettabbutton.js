// you must set a path from Resource folder
var PATH_FROM_RESOURCE = "lib/";

exports.addSweetTabButton = function(tabGroup) {
	tabGroup.bt = new SweetTabButton(tabGroup);
};
//

function SweetTabButton(tabGroup) {
	var TYPE_BLACK = 0, TYPE_ORANGE = 1, TYPE_GREEN = 2;
	var tg, bgV, iconV, pressV, textV;
	var props;

	_init();

	return {
		init : _initButton,
		getProps : _getProps,
		show : _show,
		hide : _hide,
		isVisible : _isVisible,
		TYPE_BLACK : TYPE_BLACK,
		TYPE_ORANGE : TYPE_ORANGE,
		TYPE_GREEN : TYPE_GREEN,
	};

	function _init() {
		tg = tabGroup;
		btV = Ti.UI.createView({
			backgroundImage : PATH_FROM_RESOURCE + "img/button_black.png",
			width : 68,
			height : 55,
			bottom : 0,
			visible : false
		});
		btV.addEventListener("touchstart", _touch);
		btV.addEventListener("touchend", _touch);
		var v = Ti.UI.createView({
			width : 46,
			height : 46,
			top : 0
		});
		iconV = Ti.UI.createImageView();
		v.add(iconV);
		btV.add(v);
		textV = Ti.UI.createLabel({
			font : {
				fontFamily : "Helvetica-Bold",
				fontSize : 10,
				weight : "bold"
			},
			color : "#aaa",
			textAlign : "center",
			height : 14,
			bottom : 1
		})
		btV.add(textV);
		pressV = Ti.UI.createView({
			backgroundImage : PATH_FROM_RESOURCE + "img/button_press_flash.png",
			width : 40,
			height : 45,
			top : 0,
			visible : false
		});
		btV.add(pressV);
		tg.add(btV);
	}

	function _initButton(args_type_icon_title) {
		var args = args_type_icon_title;

		args.type = args.type || TYPE_BLACK;

		btV.backgroundImage = PATH_FROM_RESOURCE + "img/button_" + ["black", "orange", "green"][args.type] + ".png";
		iconV.image = args.icon;
		textV.text = args.title;
		textV.color = args.type == TYPE_BLACK ? "#aaa" : "#fff";

		btV.visible = true;
		props = args;
	}

	function _touch(e) {
		switch(e.type) {
			case "touchstart":
				//=== for SDK1.8
				_touch.isTouching = true;

				pressV.opacity = 1.0;
				pressV.visible = true;
				break;
			case "touchend":
				//=== for SDK1.8
				if(!_touch.isTouching)
					return;
				delete _touch.isTouching;

				_animate(pressV, {
					duration : 300,
					opacity : 0.0,
					opaque : true,
				}, function() {
					pressV.visible = false;
				});
				if((e.x >= 0 && e.x <= btV.width) && (e.y >= 0 && e.y <= btV.height)) {
					tg.fireEvent("bt:click");
				}
				break;
			case "click":
				break;
		}

	}

	function _show() {
		btV.visible = true;
	}

	function _hide() {
		btV.visible = false;
	}

	function _isVisible() {
		return btV.visible;
	}

	function _animate(view, def, cb_func) {
		var a = Ti.UI.createAnimation(def);
		a.addEventListener("complete", cb_func);
		view.animate(a);
	}

	function _getProps() {
		return props;
	}

}