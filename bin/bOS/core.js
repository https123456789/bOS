class Screen {
	/*
		Represents the screen.
	*/
	constructor(domRef) {
		this.domRef = domRef;
	}
	init() {
		bios.load();
		bios.run(this.domRef);
	}
}
class Stream {
	/*
		Represents a IO stream.
	*/
	constructor() {

	}
}