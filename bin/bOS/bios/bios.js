var bios = {
	assets: {
		logoPath: "bin/bOS/res/core/imgs/logo.svg",
		loadScreenPath: "bin/bOS/bios/bios.html"
	},
	load: function() {
		
	},
	run: function(screen) {
		screen.src = this.assets.loadScreenPath;
	}
}