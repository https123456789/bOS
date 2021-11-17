window.onmessage = function(message) {
	var payload = message.data;
	switch (payload.eventType) {
		case "scroll":
			// Scroll window
			window.scrollBy(payload.data.deltaX, payload.data.deltaY);
			break;
		case "click":
			// Handle click
			break;
		default:
			break;
	}
}
// Animation
var loadAnm = document.getElementById("loadAnm");
window.setTimeout(function() {
	var arry = [".", ".", "."];
	window.setInterval(function() {
		var cnt = "";
		for (var i = 0; i < arry.length; i++) {
			cnt += arry[i];
		}
		if (arry.length >= 3) {
			arry = ["."];
		} else {
			arry.push(".");
		}
		loadAnm.innerHTML = cnt;
	}, 500);
}, 1);
// Login as Default
window.setTimeout(function() {
	var message = {
		eventType: "message",
		data: {
			senderProg: "login",
			payloadType: "url",
			main: "bin/bOS/desktop/desktop.html"
		}
	};
	window.parent.postMessage(message);
}, 5000);