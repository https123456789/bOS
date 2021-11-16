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
window.setTimeout(function() {
	var message = {
		
	};
	window.parent.postMessage(message);
}, 3000);