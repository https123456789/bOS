// Actions Bar (Top of Screen)

// Imports
import { power as powerBarItem } from "../../../bOS/global/actionsBar/power.js";

class ActionsBarBackground {
	constructor(actionsBar, color = "rgb(100, 100, 100)") {
		this.actionsBar = actionsBar;
		this.height = this.actionsBar.os
			.screen.connection.canvas.height * 0.05;
		this.color = color;
	}
	update() {
		this.actionsBar.os
			.screen.connection.fillStyle = this.color;
		this.actionsBar.os
			.screen.connection.fillRect(
				0,
				0,
				this.actionsBar.os.screen.connection.canvas.width,
				this.height
			);
	}
}

class ActionsBar {
	constructor(os) {
		this.os = os;
		this.background = new ActionsBarBackground(this);
		// Init Global Bar Items
		this.barItems = {
			powerBarItem: new powerBarItem(this)
		};
	}
	update() {
		this.background.update();
	}
}

export {
	ActionsBar
};