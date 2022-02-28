class DesktopBackground {
	constructor(desktopMain) {
		this.desktopMain = desktopMain;
	}
	update() {
		
	}
}

class DesktopMain {
	constructor(desktop) {
		this.desktop = desktop;
		this.background = new DesktopBackground(this);
	}
	update() {
		
	}
}

export {
	DesktopMain
};