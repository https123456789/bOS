class Screen {
	/*
		Represents the screen.
	*/
	constructor(domRef, mesh) {
		this.domRef = domRef;
		this.domMesh = mesh;
		this.authString = "7bu-v0gad9b238ef8293fbuj-b23788g0d2u9jph0d9edjhb80782uj2h3pubg";
		this.click = {
			x: null,
			y: null
		};
		this.wheel = {
			deltaY: 0,
			scaleY: 0,
			scaleX: 0
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
		this.scrollDriver = new Driver(this, "wheel", [
			"deltaY",
			"deltaX"
		], [
			"deltaY",
			"deltaX"
		]);
		// Setup mouse driver
		this.mouseDriver.handleEvent = function(event) {
			for (var i = 0; i < this.targetAttribs.length; i++) {
				//console.log(this.targetAttribs[i] + ": " + event[this.targetAttribs[i]]);
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
		// Setup wheel driver
		this.scrollDriver.handleEvent = function(event) {
			for (var i = 0; i < this.targetAttribs.length; i++) {
				this.screen[this.interfaceType][this.screenTargets[i]] = event[this.targetAttribs[i]];
			}
			this.screen.wheel.scaleY += event.deltaY;
			this.screen.wheel.scaleX += event.deltaX;
			var message = {
				eventType: "scroll",
				data: {
					deltaY: event.deltaY,
					deltaX: event.deltaX,
					scaleY: this.screen.wheel.scaleY,
					scaleX: this.screen.wheel.scaleX
				}
			};
			this.screen.domRef.contentWindow.postMessage(message);
		}
		// Connect drivers
		this.mouseDriver.connect();
		this.scrollDriver.connect();
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
				} else {
					console.log("Bios runtime failed. Diagnostic: " + payload.data.errorDiag);
				}
			}
		}
		if (payload.eventType == "dataDump") {
			console.log("Screen recived a data dump request sent from '" + payload.data.senderProg + "'.");
			if (payload.authString == this.authString) {
				console.log("Data dump request from '" + payload.data.senderProg + "' is authed.");
				if (payload.data.payloadType == "array") {
					for (var i = 0; i < payload.data.payloadKeys.length; i++) {
						console.log("Data dump from '" + payload.data.senderProg + "' wrote data to '" + payload.data.payloadKeys[i] + "' with value '" + payload.data.payload[i] + "'. Original value was: '" + this[payload.data.payloadKeys[i]] + "'.");
						this[payload.data.payloadKeys[i]] = payload.data.payload[i];
					}
				}
			} else {
				console.warn("Warning: a non-authed data dump request was send from '" + payload.data.senderProg + "'.");
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