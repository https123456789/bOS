import { Screen } from "./screen.js";
import { Mouse } from "./mouse.js";
import { Keyboard } from "./keyboard.js";
import { IStream, OStream } from "./io.js";
import { AppBar } from "./appBar.js";
import { ActionsBar } from "./actionsBar.js";
import { Desktop } from "./desktop.js";

class bOS {
	constructor() {
		this.screen = new Screen();
		this.stdi = new IStream(this);
		this.stdo = new OStream(this);
		this.keyboard = new Keyboard(this.stdi);
		this.mouse = new Mouse(this.screen);
		this.loaded = false;
	}
	init() {
		// Connect devices
		this.screen.connect();
		this.mouse.connect();
		// Create updater
		window.setInterval(() => {
			this.update();
		}, 1);
		// Load
		window.setTimeout(() => {
			this.load();
		}, 1);
	}
	load() {
		/*
			Try to load resources:
			- Cursors
		*/
		// Load cursors
		for (var i = 0; i < this.mouse.cursorsSrc.length; i++) {
			var request = new XMLHttpRequest();
			request.open("GET", this.mouse.cursorsSrc[i]);
			request.send();
			if (request.status != 200 && request.status != 0) {
				// Resource failed to load
				console.log(`failed to load ${this.mouse.cursorsSrc[i]}: ${request.status}`);
			} else {
				// Resource loaded
			}
		}
		// Setup app bar
		this.appBar = new AppBar(this);
		// Setup actions bar
		this.actionsBar = new ActionsBar(this);
		// Setup desktop
		this.desktop = new Desktop(this);
		this.loaded = true;
	}
	update() {
		if (!this.loaded) {
			this.drawLoadingScreen();
			return;
		}
		// Clear screen and render mouse
		this.screen.clear();
		this.appBar.update();
		this.actionsBar.update();
		this.mouse.update();
	}
	drawLoadingScreen() {
		// Clear screen
		this.screen.clear();
		// Write to screen
		this.screen.connection.textAlign = "center";
		this.screen.connection.fillStyle = "rgb(255, 255, 255)";
		this.screen.connection.fillText(
			"bOS - Loading...",
			this.screen.connection.canvas.width - (
				0.5 * this.screen.connection.canvas.width
			),
			this.screen.connection.canvas.height / 2,
			this.screen.connection.canvas.width
		);
		// Update mouse
		this.mouse.update();
	}
}

export {
	bOS
};