// App Bar (Bottom of Screen)

class AppBarBackground {
	constructor(appBar, color = "rgb(100, 100, 100)") {
		this.appBar = appBar;
		this.color = color;
		this.height = this.appBar.os
			.screen.connection.canvas.height * 0.1;
	}
	update() {
		this.appBar.os
			.screen.connection.fillStyle = this.color;
		this.appBar.os.screen.connection.fillRect(
			0,
			this.appBar.os
				.screen.connection.canvas.height - this.height,
			this.appBar.os.screen.connection.canvas.width,
			this.height
		);
	}
}

class AppBar {
	constructor(os) {
		this.os = os;
		this.background = new AppBarBackground(this);
	}
	update() {
		this.background.update();
	}
}

export {
	AppBar
};