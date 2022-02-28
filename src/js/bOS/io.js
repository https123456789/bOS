class Stream {
	constructor(os) {
		this.os = os;
	}
}

class IStream extends Stream {
	constructor(os) {
		super(os);
		this.buffer = [];
	}
	read() {
		return this.buffer.pop();
	}
}

class OStream extends Stream {
	constructor(os) {
		super(os);
		this.buffer = [];
	}
	write(char) {
		this.buffer.push(char);
	}
}

export {
	IStream,
	OStream
};