export default class cc {
	/**
	 * @summary 不为空
	 * @param val
	 * @returns {boolean}
	 */
	static notEmpty(val) {
		return !this.isEmpty(val);
	}

	/**
	 * @summary 是否为定义
	 * @param val
	 * @returns {boolean}
	 */
	static isUndefined(val) {
		return val === null || typeof val === 'undefined';
	}

	/**
	 * @summary 为空
	 * @param val
	 * @returns {boolean}
	 */
	static isEmpty(val) {
		if (
			val === null ||
			typeof val === 'undefined' ||
			(typeof val === 'string' && val === '' && val !== 'undefined')
		) {
			return true;
		}
		return false;
	}


	/**
	 * @summary 对象深拷贝
	 * @param target //传入对象
	 * @returns {Arrat}
	 */
	static deepClone(target) {
		const map = new WeakMap()

		function isObject(target) {
			return (typeof target === 'object' && target) || typeof target === 'function'
		}

		function clone(data) {
			if (!isObject(data)) {
				return data
			}
			if ([Date, RegExp].includes(data.constructor)) {
				return new data.constructor(data)
			}
			if (typeof data === 'function') {
				return new Function('return ' + data.toString())()
			}
			const exist = map.get(data)
			if (exist) {
				return exist
			}
			if (data instanceof Map) {
				const result = new Map()
				map.set(data, result)
				data.forEach((val, key) => {
					if (isObject(val)) {
						result.set(key, clone(val))
					} else {
						result.set(key, val)
					}
				})
				return result
			}
			if (data instanceof Set) {
				const result = new Set()
				map.set(data, result)
				data.forEach(val => {
					if (isObject(val)) {
						result.add(clone(val))
					} else {
						result.add(val)
					}
				})
				return result
			}
			const keys = Reflect.ownKeys(data)
			const allDesc = Object.getOwnPropertyDescriptors(data)
			const result = Object.create(Object.getPrototypeOf(data), allDesc)
			map.set(data, result)
			keys.forEach(key => {
				const val = data[key]
				if (isObject(val)) {
					result[key] = clone(val)
				} else {
					result[key] = val
				}
			})
			return result
		}
		return clone(target)
	}


	/**
	 * @summary 获取树形菜单
	 * @param list //传入后台返回的数组
	 * @param dtoId //每一条数据的主键,可以不传,不传默认值：dtoId
	 * @param parentId //关联父节点的主键,可以不传,不传默认值：parentId
	 * @returns {Array}
	 */
	static getTreeData(list, dtoId, parentId) {
		if ((dtoId == undefined || parentId == undefined) || (this.isEmpty(dtoId) || this.isEmpty(parentId))) {
			dtoId = "id"
			parentId = "parentId"
		}
		var treeData = [];
		var map = {};
		list.forEach(function(item) {
			map[item[dtoId]] = item;
		})
		list.forEach(function(item) {
			var parent = map[item[parentId]];
			if (parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				treeData.push(item);
			}
		})
		return treeData;
	}



	/**
	 * @summary 格式化金额
	 * @param number //Float类型，金额
	 * @returns {Array}
	 */
	static formatPrice(number) {
		(number).toLocaleString(); // 999,999,999
		// 还可以加参数，进行更优雅的做法
		const options = {
			style: 'currency',
			currency: 'CNY',
		};
		return (number).toLocaleString('zh-CN', options);
	}


	/**
	 * @summary 对象深拷贝替换，已有属性替换，没有则添加到新数组
	 * @param {Object} source  需要拷贝的JSON对象
	 * @param {Object} target  拷贝进去后返回出去的JSON对象
	 */
	static copyProperties(source, target) {
		this.notNull(source, "Source must not be null")
		this.notNull(target, "Target must not be null")
		let sourceType = this.typeOf(source) != 'Object';
		let targetType = this.typeOf(target) != 'Object';
		if (sourceType) {
			throw new Error("The incoming type does not match,'" + source + "' type is:" + this.typeOf(source) +
				",must be Object");
		} else if (targetType) {
			throw new Error("The incoming type does not match,'" + target + "' type is:" + this.typeOf(target) +
				",must be Object");
		}


		let key;
		for (key in target) {
			// 如果target(也就是source[key])存在，且是对象的话再去调用deepMerge，否则就是source[key]里面没这个对象，需要与target[key]合并
			// 如果target[key]没有值或者值不是对象，此时直接替换source[key]
			source[key] = source[key] && source[key].toString() === "[object Object]" && (target[key] && target[key]
				.toString() ===
				"[object Object]") ? this.copyProperties(source[key], target[key]) : (source[key] = target[key]);
		}
		return source;
	}

	/**
	 * @summary 判断类型,String、Number、Float、Array、Object
	 * @param {Object} source
	 * @returns {String} //返回类型为字符串,返回传入的类型
	 */
	static typeOf(source) {
		let type = Object.prototype.toString.call(source)
		type = type.slice(8, type.length - 1)

		if (type === 'Number' && (source + "").indexOf('.') != -1) {
			type = "Float"
		}
		return type;
	}

	/**
	 * @summary 断言不为空
	 * @param {Object} object
	 * @param {Object} message
	 */
	static notNull(object, message) {
		if (object == null && object == undefined) {
			throw new Error(message);
		}
	}


	/**
	 * @summary 日期格式化
	 * @param {Date} time //日期
	 * @param {Object} format //格式，YY:年 MM:月 DD:日  hh:时 mm:分 ss:秒
	 * 
	 */
	static formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
		var date = new Date(time);
		var year = date.getFullYear(),
			month = date.getMonth() + 1, //月份是从0开始的
			day = date.getDate(),
			hour = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
		var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
			return '0' + index;
		});
		var newTime = format.replace(/YY/g, year)
			.replace(/MM/g, preArr[month] || month)
			.replace(/DD/g, preArr[day] || day)
			.replace(/hh/g, preArr[hour] || hour)
			.replace(/mm/g, preArr[min] || min)
			.replace(/ss/g, preArr[sec] || sec);
		return newTime;
	}


	/**
	 * @summary JS格式化现在距${endTime}的剩余时间
	 * @param  {Date} endTime
	 * @return {String}
	 */
	static formatRemainTime(endTime) {
		var startDate = new Date(); //开始时间
		var endDate = new Date(endTime); //结束时间
		var t = endDate.getTime() - startDate.getTime(); //时间差
		var d = 0,
			h = 0,
			m = 0,
			s = 0;
		if (t >= 0) {
			d = Math.floor(t / 1000 / 3600 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}
		return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
	}


	/**
	 * @summary JS格式化${startTime}距现在的已过时间
	 * @param  {Date} startTime
	 * @return {String}
	 */
	static formatPassTime(startTime) {
		var currentTime = Date.parse(new Date()),
			time = currentTime - new Date(startTime),
			day = parseInt(time / (1000 * 60 * 60 * 24)),
			hour = parseInt(time / (1000 * 60 * 60)),
			min = parseInt(time / (1000 * 60)),
			month = parseInt(day / 30),
			year = parseInt(month / 12);
		if (year) return year + "年前";
		if (month) return month + "个月前";
		if (day) return day + "天前";
		if (hour) return hour + "小时前";
		if (min) return min + "分钟前";
		else return '刚刚';
	}


	/**
	 * @summary 获取随机uuid
	 * @returns {string}
	 */
	static uuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}


	/**
	 * @summary Base64加密
	 * @param str
	 * @returns {string}
	 */
	static base64Encode(str) {
		return btoa(unescape(encodeURIComponent(str)));
	}

	/**
	 * @summary Base64解密
	 * @param str
	 * @returns {string}
	 */
	static base64Decode(str) {
		return decodeURIComponent(escape(atob(str)));
	}










	/**
	 * @summary 判断是否为移动端
	 * @returns {boolean}
	 */
	static isMobile() {
		return /Android|webOS|iPhone|iPod|BlackBerry|SymbianOS|Windows Phone/i.test(navigator.userAgent);
	}


	/**
	 * @summary 判断是否为微信
	 * @returns {boolean}
	 */
	static isFromWeiXin() {
		const ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) === 'micromessenger') {
			return true;
		}
	}

	/**
	 * @summary 是否为安卓
	 */
	static isAndroid() {
		return /android/i.test(navigator.userAgent);
	}

	/**
	 * @summary 是否为IOS
	 */
	static isIOS() {
		/ipad|iphone|mac/i.test(navigator.userAgent);
	}


	/**
	 * @summary 检测是否为PC端浏览器
	 */
	static isPCBroswer() {
		let e = window.navigator.userAgent.toLowerCase(),
			t = "ipad" == e.match(/ipad/i),
			i = "iphone" == e.match(/iphone/i),
			r = "midp" == e.match(/midp/i),
			n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
			a = "ucweb" == e.match(/ucweb/i),
			o = "android" == e.match(/android/i),
			s = "windows ce" == e.match(/windows ce/i),
			l = "windows mobile" == e.match(/windows mobile/i);
		return !(t || i || r || n || a || o || s || l)
	}


	/**
	 * @summary 判断当前设备
	 * @returns
	 */
	static handleCurBrowser() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
		var isIE = userAgent.indexOf("compatible") > -1 &&
			userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
		var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
		var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
		var isSafari = userAgent.indexOf("Safari") > -1 &&
			userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
		var isChrome = userAgent.indexOf("Chrome") > -1 &&
			userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return "IE7";
			} else if (fIEVersion == 8) {
				return "IE8";
			} else if (fIEVersion == 9) {
				return "IE9";
			} else if (fIEVersion == 10) {
				return "IE10";
			} else if (fIEVersion == 11) {
				return "IE11";
			} else {
				return "0";
			} //IE版本过低
			return "IE";
		}
		if (isOpera) {
			return "Opera";
		}
		if (isEdge) {
			return "Edge";
		}
		if (isFF) {
			return "FF";
		}
		if (isSafari) {
			return "Safari";
		}
		if (isChrome) {
			return "Chrome";
		}
	}


	/**
	 * @summary 随机数字
	 * @param min 最小值
	 * @param max 最大值
	 * @returns {number} 随机数字,取值范围[min, max]
	 */
	static randomNumber = (min = 0, max = 1000) => Math.ceil(min + Math.random() * (max - min));


	/**
	 * @summary 对象属性剔除
	 * @param {object} object
	 * @param {string[]} props
	 * @return {object}
	 */
	static omit(object, props = []) {
		let res = {}
		Object.keys(object).forEach(key => {
			if (props.includes(key) === false) {
				res[key] = typeof object[key] === 'object' && object[key] !== null ?
					jsON.parse(jsON.stringify(object[key])) :
					object[key]
			}
		})
		return res
	}


	/**
	 * 数据导出
	 * @summary 将json数据导出为xls表格
	 * @param {string} filename - 下载时的文件名
	 * @param {string} option - 导出配置，表头与数据
	 * 参数示例：	let option={
					header:['测试','哈哈','呵呵','好'],
					hbody:[
						{
						 f:"a",
						 s:"b",
						 t:"c",
						 fo:"d"
						}]
				}
	 */
	static exportExcel(option, filename) { // option:需要导出的配置
		let JSONData = option.hbody;

		let ShowLabel = option.header; // 导出的excel的表头数据
		//先转化json
		let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		// 给数组内容换好位置
		let finalData = []; // 最终要导出的json数据，其中json数据顺序要和表头数据顺序一致
		arrData.forEach(item => {
			let hbodyKey = Object.keys(item);
			let obj = {};
			hbodyKey.forEach(it => {
				obj[it] = item[it]
			})
			finalData.push(obj);
		});
		let excel = '<table>';
		//设置表头
		let row = '<tr>';
		for (let i = 0; i < ShowLabel.length; i++) {
			row += '<td>' + ShowLabel[i] + '</td>';
		}
		//换行
		excel += row + '</tr>';
		//设置数据
		for (let i = 0; i < finalData.length; i++) {
			let row = '<tr>';
			for (let index in finalData[i]) {
				let value = finalData[i][index];
				if (index === 'number' || index === 'code') {
					// 当数字超过一定长度就科学计数法可以使用style='mso-number-format:"\@"'
					// 这个属性指定某单元格的数据格式，避免Excel自动转换格式
					row += `<td style='mso-number-format:\"\\@\"'>${value}</td>`;
				} else {
					row += '<td>' + value + '</td>';
				}
			}
			excel += row + '</tr>';
		}
		excel += '</table>';
		let excelFile =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		excelFile +=
			'<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
		excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
		excelFile += '; charset=UTF-8">';
		excelFile += '<head>';
		excelFile += '<!--[if gte mso 9]>';
		excelFile += '<xml>';
		excelFile += '<x:ExcelWorkbook>';
		excelFile += '<x:ExcelWorksheets>';
		excelFile += '<x:ExcelWorksheet>';
		excelFile += '<x:Name>';
		excelFile += '{worksheet}';
		excelFile += '</x:Name>';
		excelFile += '<x:WorksheetOptions>';
		excelFile += '<x:DisplayGridlines/>';
		excelFile += '</x:WorksheetOptions>';
		excelFile += '</x:ExcelWorksheet>';
		excelFile += '</x:ExcelWorksheets>';
		excelFile += '</x:ExcelWorkbook>';
		excelFile += '</xml>';
		excelFile += '<![endif]-->';
		excelFile += '</head>';
		excelFile += '<body>';
		excelFile += excel;
		excelFile += '</body>';
		excelFile += '</html>';
		let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
		let link = document.createElement('a');
		link.href = uri;
		link.style = 'visibility:hidden';
		link.download = (filename || 'TempFile') + '.xls';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		// message.success('下载成功！');
		// this.setState({
		// 	errorMsgVisible: false,
		// });
		
		return 'Sucess'
		
	};



	/**
	 * @summary JS将手机号格式化，中间部分以 * 号代替
	 * @param phone
	 * @returns {string | * | void}
	 */
	static phoneToStar(phone) {
		return (phone + "").replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
	}


	/**
	 * @summary JS将身份证格式化，中间部分以 * 号代替
	 * @param identity
	 * @returns {string | * | void}
	 */
	static identityToStar(identity) {
		return identity.replace(/(\w{4})\w*(\w{3})/, '$1******$2')
	}

	/**
	 * @summary JS将名字格式化，中间部分以 * 号代替
	 * @param name
	 * @returns {string | * | void}
	 */
	static nameToStar(name) {
		if (null != name && name != undefined) {
			let star = '' //存放名字中间的*
			//名字是两位的就取姓名首位+*
			if (name.length <= 2) {
				return name.substring(0, 1) + "*";
			} else {
				for (var i = 0; i < name.length - 2; i++) {
					star = star + '*'
				}
				return name.substring(0, 1) + star + name.substring(name.length - 1, name.length);
			}
		}
	}



	/**
	 * @summary 对象key按ascii码深度排序，可以传Object或Array
	 * @param {Object} o
	 * @return {Object | Array} 
	 */
	static ksort(o) {
		if (typeof o != "object") {
			return o;
		}
		let sorted = {};
		if (Array.isArray(o)) {
			sorted = [];
			o.forEach(obj => {
				sorted.push(this.ksort(obj));
			})
			return sorted;
		}
		let keys = Object.keys(o);
		keys.sort();
		keys.forEach((key) => {
			if (o[key] && typeof o[key] == "object" && Array.isArray(o[key])) {
				sorted[key] = [];
				o[key].forEach((item, index) => {
					sorted[key].push(this.ksort(o[key][index]));
				})
			} else if (o[key] && typeof o[key] == "object" && !Array.isArray(o[key])) {
				sorted[key] = this.ksort(o[key]);
			} else {
				sorted[key] = o[key];
			}
		})
		return sorted;
	}


	
	/**
	 * @summary MD5加密
	 * @param {String} string  加密文本
	 * @param {String} bit  加密位数
	 * @return {String} 
	 */
	static md5(string, bit) {
		function md5_RotateLeft(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
	
		function md5_AddUnsigned(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
	
		function md5_F(x, y, z) {
			return (x & y) | ((~x) & z);
		}
	
		function md5_G(x, y, z) {
			return (x & z) | (y & (~z));
		}
	
		function md5_H(x, y, z) {
			return (x ^ y ^ z);
		}
	
		function md5_I(x, y, z) {
			return (y ^ (x | (~z)));
		}
	
		function md5_FF(a, b, c, d, x, s, ac) {
			a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
			return md5_AddUnsigned(md5_RotateLeft(a, s), b);
		};
	
		function md5_GG(a, b, c, d, x, s, ac) {
			a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
			return md5_AddUnsigned(md5_RotateLeft(a, s), b);
		};
	
		function md5_HH(a, b, c, d, x, s, ac) {
			a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
			return md5_AddUnsigned(md5_RotateLeft(a, s), b);
		};
	
		function md5_II(a, b, c, d, x, s, ac) {
			a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
			return md5_AddUnsigned(md5_RotateLeft(a, s), b);
		};
	
		function md5_ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};
	
		function md5_WordToHex(lValue) {
			var WordToHexValue = "",
				WordToHexValue_temp = "",
				lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
			}
			return WordToHexValue;
		};
	
		function md5_Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		};
		var x = Array();
		var k, AA, BB, CC, DD, a, b, c, d;
		var S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22;
		var S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20;
		var S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23;
		var S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21;
		string = md5_Utf8Encode(string);
		x = md5_ConvertToWordArray(string);
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;
		for (k = 0; k < x.length; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = md5_AddUnsigned(a, AA);
			b = md5_AddUnsigned(b, BB);
			c = md5_AddUnsigned(c, CC);
			d = md5_AddUnsigned(d, DD);
		}
	
		function md_32a() {
			return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
		}
	
		function md_16a() {
			return (md5_WordToHex(b) + md5_WordToHex(c)).toLowerCase();
		}
		if (bit == 32 || bit == "32a") {
			return md_32a();
		}
		if (bit == 16 || bit == "16a") {
			return md_16a();
		}
		if (bit == '32A') {
			return md_32a().toUpperCase();
		}
		if (bit == '16A') {
			return md_16a().toUpperCase();
		}
		return md_32a();
	}
	



}







/**
 * *****防抖****
 *
 * 在连续的操作中，无论进行了多长时间，
 * 只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效
 * @param fn
 * @param t
 * @returns {function(...[*]=)}
 * @constructor
 */
let timer = null;
const debounce = function(fn, t) {
	let delay = t || 300;
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		fn.apply(this, arguments);
	}, delay);

}



/**
 * @summary 节流
 * 一定时间内一定执行而且只执行一次。我们通常规定300ms执行一下的话，
 * 那不管你持续不断的点击，一到300ms就执行一次了。
 * 所以你持续不断的点击足够久的话，那就执行很多次了。
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 * @constructor
 */
let canRun = true; // 通过闭包保存一个标记
const throttle = function(fn, delay = 300) {
	if (!canRun) return; //在delay时间内，直接返回，不执行fn
	canRun = false;
	setTimeout(() => {
		fn.apply(this, arguments);
		canRun = true; //直到执行完fn,也就是delay时间后，打开开关，可以执行下一个fn
	}, delay);
}



export {
	debounce,
	throttle
}