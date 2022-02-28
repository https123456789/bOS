class Keyboard {
	constructor(inputstream) {
		this.inputstream = inputstream;
		this.keys = {};
		window.addEventListener("keydown", (event) => {
			this.keyDownEvent(event);
		});
		window.addEventListener("keyup", (event) => {
			this.keyUpEvent(event);
		});
	}
	keyDownEvent(event) {
		console.log(event.key);
	}
	keyUpEvent(event) {
		console.log(event.key);
	}
}

export {
	Keyboard
};