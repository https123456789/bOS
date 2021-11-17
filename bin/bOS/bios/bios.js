var biosReady = false;
function checkForCollisOnBox(posx, posy) {
	var midWidth = window.innerWidth / 2;
	var midHeight = window.innerHeight / 2;
	var l = midWidth - (0.5 * midWidth);
	var r = midWidth + (0.5 * midWidth);
	var b = midHeight - (0.5 * midHeight);
	var t = midHeight + (0.5 * midHeight);
	if (posx >= l && posx <= r) {
		if (posy >= b && posy <= t) {
			var message = {
				eventType: "message",
				data: {
					senderProg: "bios",
					status: true
				}
			};
			window.parent.postMessage(message);
		}
	}
}
function  checkBrowser() {
	var browsers = {
		count: 0,
		chrome: false,
		edge: false,
		firefox: false,
		opera: false,
		safari: false
	};
	// Check for chrome
	if (window.chrome) {
		browsers.chrome = true;
		browsers.count += 1;
	}
	// Check for opera
	if (window.opera) {
		browsers.opera = true;
		browsers.count += 1;
	}
	// Check for safari
	if (window.safari) {
		browsers.safari = true;
		browsers.count += 1;
	}
	// Check for Edge
	if (window.StyleMedia) {
		browsers.edge = true;
		browsers.count += 1;
	}
	return browsers;
}
var svg = document.getElementById("logo");
svg.style.display = "none";
window.onmessage = function(event) {
	if (event.data.eventType == "click") {
		var payload = event.data.data;
		if (biosReady) {
			checkForCollisOnBox(payload.clientX, payload.clientY);
		}
	}
	if (event.data.eventType == "scroll") {
		var payload = event.data;
		window.scrollBy(payload.data.deltaX, payload.data.deltaY);
	}
}
var stdout = document.getElementById("stdout");
var browser;
var platform;
var stack = [
	2,
	1,
	0
];
var mswait = stack.length * 1000;
while (stack.length > 0) {
	var item = stack[0];
	var sl = stack.length;
	stack.shift();
	var time = 1000 * sl;
	switch (item) {
		case 0:
			window.setTimeout(function() {
				stdout.innerHTML += "Detecting browser...<br>";
				browser = checkBrowser();
				stdout.innerHTML += "Found 0x" + browser.count.toString(16) + " browsers.<br>";
				var browserNames = Object.keys(browser);
				for (var i = 1; i < browserNames.length; i++) {
					stdout.innerHTML += "&emsp;" + browserNames[i] + ": " + browser[browserNames[i]] + "<br>";
				}
			}, time);
			break;
		case 1:
			window.setTimeout(function() {
				stdout.innerHTML += "Detecting platform...<br>";
				var usa = navigator.userAgent;
				var os = [
					
				];
				var osMap = [
					"Chrome OS",
					"Linux",
					"Mac OS",
					"Windows"
				];
				var pats = [
					/CrOS/,
					/Linux/,
					/Macintosh/,
					/Windows/
				];
				for (var i = 0; i < pats.length; i++) {
					os[i] = pats[i].test(usa);
					stdout.innerHTML += "&emsp;" + osMap[i] + ": " + os[i] + "<br>";
					if (os[i]) {
						platform = osMap[i];
					}
				}
			}, time);
			break;
		case 2:
			window.setTimeout(function() {
				stdout.innerHTML += "Configuring drivers...<br>";
				stdout.innerHTML += "&emsp;Configuring click driver...<br>";
				var clickDriver = new Driver(window.parent.screen, "click", [
					"clientX",
					"clientY"
				], [
					"x",
					"y"
				]);
				stdout.innerHTML += "&emsp;&emsp;Created new instance of 'Driver'.<br>";
				clickDriver.handleEvent = function(event) {
					for (var i = 0; i < this.targetAttribs; i++) {
						this.screen[this.interfaceType][this.screenTargets[i]] = event[this.targetAttribs[i]];
					}
					var message = {
						eventType: "click",
						data: {
							clientX: event.clientX,
							clientY: event.clientY
						}
					};
					this.screen.domRef.contentWindow.postMessage(message);
				}
				stdout.innerHTML += "&emsp;&emsp;Configured click driver event handler.<br>";
				window.parent.screen.mouseDriver = clickDriver;
				stdout.innerHTML += "&emsp;&emsp;Wrote driver to 'window.parent.screen' which is an instance of 'Screen'.<br>";
				window.parent.screen.mouseDriver.connect();
				stdout.innerHTML += "&emsp;&emsp;Connected driver.<br>";
				//stdout.innerHTML += "&emsp;Configuring scroll driver...<br>";
				//stdout.innerHTML += "&emsp;&emsp;Created new instance of 'Driver'.<br>";
			}, time);
			break;
	}
}
// Send data to parent window
window.setTimeout(function() {
	var message = {
		eventType: "dataDump",
		data: {
			senderProg: "bios",
			payloadType: "array",
			payload: [
				browser,
				platform
			],
			payloadKeys: [
				"browser",
				"platform"
			]
		},
		authString: "7bu-v0gad9b238ef8293fbuj-b23788g0d2u9jph0d9edjhb80782uj2h3pubg"
	};
	window.parent.postMessage(message);
	biosReady = true;
	svg.style.display = "block";
	window.setInterval(function() {
		//checkForCollisOnBox(window.innerWidth / 2, window.innerHeight / 2);
	}, 5000);
}, mswait + 1000);