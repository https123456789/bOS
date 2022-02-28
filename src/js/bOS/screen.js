class Screen {
	constructor() {
		this.domReference = document.getElementById("screen");
		this.pixels = [];
	}
	connect() {
		this.connection = this.domReference.getContext("2d");
		this.connection.canvas.width = window.innerWidth;
		this.connection.canvas.height = window.innerHeight;
		this.connection.fillStyle = "rgb(0, 0, 0)";
		this.connection.fillRect(
			0,
			0,
			this.connection.canvas.width,
			this.connection.canvas.height
		);
	}
	clear() {
		this.connection.fillStyle = "rgb(0, 0, 0)";
		this.connection.fillRect(
			0,
			0,
			this.connection.canvas.width,
			this.connection.canvas.height
		);
	}
}

export {
	Screen
};