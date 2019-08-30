var Util = {

	/* class 鎿嶄綔 */
	addSingleClass: function(node, cls) {
		if (!this.hasClass(node, cls)) {
			node.className += (node.className === '' ? '' : ' ') + cls;
		}
	},
	removeSingleClass: function(node, cls) {
		var reg = new RegExp('\\b' + cls + '\\b', 'g'),
			tmp = node.className.replace(reg, '').replace(/\s{2,}/g, ' ');
		node.className = this.trim(tmp);
	},
	hasClass: function(node, cls) {
		var reg = new RegExp('\\b' + cls + '\\b', 'g');
		return reg.test(node.className);
	},
	addClass: function(nodes, cls) {
		if (nodes.length) {
			for (var i = 0; i < nodes.length; i++) {
				this.addSingleClass(nodes[i], cls);
			}
		} else {
			this.addSingleClass(nodes, cls);
		}
	},
	removeClass: function(nodes, cls) {
		if (nodes.length) {
			for (var i = 0; i < nodes.length; i++) {
				this.removeSingleClass(nodes[i], cls);
			}
		} else {
			this.removeSingleClass(nodes, cls);
		}
	},
	trim: function(str) {
		return str.replace(/(^\s+)|(\s+$)/g, '');
	},


	/*dom 浜嬩欢*/

	bind: function(node, type, handler) {
		if (!node) return false;
		if (node.addEventListener) {
			node.addEventListener(type, handler, false);
			return true;
		} else if (node.attachEvent) {
			node['e' + type + handler] = handler;
			node[type + handler] = function() { //澶勭悊 ie 閲岀殑 this锛屽悓鏃舵柟渚� unbind
				node['e' + type + handler](window.event);
			};
			node.attachEvent('on' + type, node[type + handler]);
			return true;
		}
		return false;
	},

	unbind: function(node, type, handler) {
		if (!node) return false;
		if (node.removeEventListener) {
			node.removeEventListener(type, handler, false);
			return true;
		} else if (node.detachEvent) {
			node.detachEvent('on' + type, node[type + handler]);
			node[type + handler] = null;
		}
		return false;
	},

	//缁檇om鏁扮粍鎵归噺缁戝畾浜嬩欢
	batchBind: function(nodes, type, handler) {
		for (var i = 0; i < nodes.length; i++) {
			this.bind(nodes[i], type, handler);
		}
	},

	batchUnBind: function(nodes, type, handler) {
		for (var i = 0; i < nodes.length; i++) {
			this.unbind(nodes[i], type, handler);
		}
	},

	getEvent: function(e) {
		return e || window.event;
	},

	getTarget: function(e) {
		return e.target || e.scrElement;
	},

	preventDefault: function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	stopPropagation: function(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}

	},

	//杩斿洖涓€涓厓绱犳槸鐖朵翰鐨勭鍑犱釜瀛╁瓙
	index: function(node) {
		var parent = node.parentElement,
			siblings = parent.children;
		for (var i = 0; i < siblings.length; i++) {
			if (node === siblings[i]) return i;
		}
		return -1;
	},

	/*JSON 鎿嶄綔*/
	extend: function(objTarget, objSrc1, objSrc2) {
		if (arguments.length < 2) {
			return;
		}
		var target;
		for (var i = 1; i < arguments.length; i++) {
			target = arguments[i];
			for (var key in target) {
				objTarget[key] = target[key];
			}
		}
	},

	/**
	 * 鏍煎紡鍖栬緭鍑烘棩鏈�
	 * @param  date 鏃ユ湡瀵硅薄
	 * @return  String  鏇挎崲鍚庣殑瀛楃涓�
	 * @eg:  Util.dateFormat(date, '%y-%M-%d %h:%m%s') => 2016-03-10 18:03:09
	 */
	dateFormat: function(date, fmtStr) {
		var y = date.getFullYear(),
			M = date.getMonth() + 1,
			d = date.getDate(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds();
		M = M >= 10 ? M : '0' + M;
		d = d >= 10 ? d : '0' + d;
		h = h >= 10 ? h : '0' + h;
		m = m >= 10 ? m : '0' + m;
		s = s >= 10 ? s : '0' + s;
		var tpl = fmtStr || '%y-%m-%d %h:%m:%s',
			result;
		result = tpl.replace('%y', y).replace('%m', M).replace('%d', d)
			.replace('%h', h).replace('%m', m).replace('%s', s);
		return result;
	},

	ajax: function(opts) {
		opts.success = opts.success || function() {};
		opts.error = opts.error || function() {};
		opts.type = opts.type || 'get';
		opts.dataType = opts.dataType || 'json';
		opts.data = opts.data || {};
		var dataStr = '';
		for (var key in opts.data) {
			dataStr += key + '=' + opts.data[key] + '&';
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {

			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					//濡傛暟鎹被鍨嬫槸 text, 鍒欎笉瑙ｆ瀽
					if (opts.dataType === 'text') {
						opts.success(xmlhttp.responseText);
					}
					if (opts.dataType === 'json') {
						var json = JSON.parse(xmlhttp.responseText);
						opts.success(json);
					}
				} else {
					opts.error();
				}
			}
		};

		dataStr = dataStr.substr(0, dataStr.length - 1);

		if (opts.type.toLowerCase() === 'post') {
			xmlhttp.open(opts.type, opts.url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(dataStr);
		}
		if (opts.type.toLowerCase() === 'get') {
			xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
			xmlhttp.send();
		}
	},

	/**
	 * 閫氳繃浼犻€掓ā鐗堝瓧绗︿覆鍜宩son鏍煎紡鏁版嵁锛岃幏鍙栨浛鎹㈠悗鐨勫瓧绗︿覆
	 * @param  {String} tpl  妯＄増瀛楃涓�;
	 * @param  {JSON} data 浼犻€掔殑json鏍煎紡瀵硅薄
	 * @return {String}      杩斿洖妯＄増鍙橀噺鏇挎崲鍚庣殑瀛楃涓�
	 * @eg:
	 * var str = 'hello {{name}}, My friend is {{friend.name}}';
	 * var data = {name: 'hunger', friend: {name: 'valley'}};
	 * Util.template(str, data);
	 * //杩斿洖瀛楃涓诧細 hello hunger, My friend is valley
	 */
	template: function(tpl, data) {
		var re = /{{([a-zA-Z$_][a-zA-Z$_0-9\.]*)}}/g;
		return tpl.replace(re, function(raw, key, offset, string) {
			var paths = key.split('.'),
				lookup = data;
			while (paths.length > 0) {
				lookup = lookup[paths.shift()];
			}
			return lookup || raw;
		});
	}

};