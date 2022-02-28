import {
	ActionsBarItem
} from "./items.js";

class power extends ActionsBarItem {
	constructor(actionsBar) {
		super(actionsBar);
		this.iconSrc = "src/res/icons/power.svg";
		this.sideAttach = {
			side: "right"
		};
		this.iconRender = true;
	}
}

export {
	power
};