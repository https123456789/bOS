class Screen {
	/*
		Represents the screen.
	*/
	constructor(domRef, mesh) {
		this.domRef = domRef;
		this.domMesh = mesh;
		this.click = {
			x: null,
			y: null
		};
		this.wheel = {
			deltaY: 0,
			scale: 0
		}
	}
	init() {
		bios.load();
		bios.run(this.domRef);
		this.mouseDriver = new Driver(this, "click", [
			"clientX",
			"clientY"
		], [
			"x",
			"y"
		]);
		this.scroolDriver = new Driver(this, "wheel", [
			"deltaY"
		], [
			"deltaY"
		]);
		// Setup mouse driver
		this.mouseDriver.handleEvent = function(event) {
			for (var i = 0; i < this.targetAttribs.length; i++) {
				console.log(this.targetAttribs[i] + ": " + event[this.targetAttribs[i]]);
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
		// Connect drivers
		this.mouseDriver.connect();
		this.scroolDriver.connect();
	}
	main() {
		console.log("Entered main.");
		window.addEventListener("message", this);
	}
	handleEvent(message) {
		var payload = message.data;
		if (payload.eventType == "message") {
			console.log("Screen recived a message.");
			if (payload.data.senderProg == "bios") {
				if (payload.data.status) {
					console.log("Bios runtime finished.");
					this.domRef.src = "bin/bOS/login/login.html";
					//console.log(this.domRef.contentDocument.body.innerHTML);
				} else {
					console.log("Bios runtime failed. Diagnostic: " + payload.data.errorDiag);
				}
			}
		}
	}
}

class Driver {
	/*
		Represents a driver.
	*/
	constructor(screen, interfaceType, targetAttribs, screenTargets) {
		this.screen = screen;
		this.interfaceType = interfaceType;
		this.targetAttribs = targetAttribs;
		this.screenTargets = screenTargets;
		console.log(targetAttribs);
		console.log(this.targetAttribs);
		if (typeof(targetAttribs) != "object") {
			throw "Driver Error: Invalid driver arguments: targetAttribs is not an array.";
		}
	}
	handleEvent(event) {
		for (var i = 0; i < this.targetAttribs.length; i++) {
			console.log(this.targetAttribs[i] + ": " + event[this.targetAttribs[i]]);
			this.screen[this.interfaceType][this.screenTargets[i]] = event[this.targetAttribs[i]];
		}
	}
	connect() {
		this.screen.domMesh.addEventListener(this.interfaceType, this);
		console.log("Connected driver.");
	}
	disconnect() {
		this.screen.domMesh.removeEventListener(this.interfaceType);
		console.log("Disconnected driver.");
	}
}

class Stream {
	/*
		Represents a IO stream.
	*/
	constructor(screen, eventType) {
		this.screen = screen;
		this.eventType = eventType;
	}
	connect() {
		this.screen.domMesh.addEventListener(this.eventType, this);
	}
	disconnect() {
		this.screen.domMesh.removeEventListener(this.eventType);
	}
	handleEvent(event) {
		console.log(event);
	}
}