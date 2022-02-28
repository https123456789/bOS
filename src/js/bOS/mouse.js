class Mouse {
	constructor(screen) {
		this.screen = screen;
		this.x = 0;
		this.y = 0;
		this.width = 10;
		this.height = 10;
		this.cursorsSrc = [
			"src/res/mouse/basic.svg"
		];
		this.cursors = [
			"basic"
		];
		this.cursorIndex = 0;
		this.imageChanged = true;
	}
	connect() {
		// Create update event
		this.screen.domReference.addEventListener("mousemove", (event) => {
			this.mousemove(event);
		})
	}
	mousemove(event) {
		var rect = this.screen.domReference.getBoundingClientRect();
		var scaleX = this.screen.domReference.width / rect.width;
		var scaleY = this.screen.domReference.height / rect.height;
		this.x = (event.clientX - rect.left) * scaleX;
		this.y = (event.clientY - rect.top) * scaleY;
		if (!this.x) {
			this.x = 0;
		}
		if (!this.y) {
			this.y = 0;
		}
		//console.log([this.x, this.y]);
	}
	update() {
		// Check if image needs to be loaded
		if (this.imageChanged) {
			this.currentImage = new Image();
			this.currentImage.src = this.cursorsSrc[this.cursorIndex];
			this.imageChanged = false;
			this.imageLoaded = false;
			this.currentImage.onload = () => {
				this.imageLoaded = true;
			}
		}

		if (!this.imageLoaded) {
			// Use default white square because image hasn't loaded
			this.screen.connection.fillStyle = "0xffffff";
			this.screen.connection.fillRect(this.x, this.y, this.width, this.height);
		} else {
			this.screen.connection.drawImage(
				this.currentImage,
				0,
				0,
				this.currentImage.width,
				this.currentImage.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}
}

export {
	Mouse
};