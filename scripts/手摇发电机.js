
let 手摇发电机 = extend(SolarGenerator, '手摇发电机', {
	setBars(){
		//this.bars.add('poweroutput', new Func(){get:entity => new Bar(prov(() => Core.bundle.format("bar.poweroutput", (entity.getPowerProduction() * 60 * entity.timeScale() + '').replace(/(?<=\.\d)\d*/g, ''))), prov(() => Pal.powerBar), new Floatp(){get:() => 1.0})});
	}
});
手摇发电机.localizedName = '手摇发电机';
手摇发电机.buildVisibility = BuildVisibility.shown;
手摇发电机.category = Category.power;
手摇发电机.update = 手摇发电机.configurable = 手摇发电机.hasPower = true;
手摇发电机.powerProduction = 30;//电量上限，1:60
手摇发电机.buildType = prov(() => extend(Building, {
	productionEfficiency:0,
	update(){
		if(this.productionEfficiency > 0) this.productionEfficiency -= 2; // 每帧减少的量
	},
	buildConfiguration(table){
		table.button(Icon.upOpen, Styles.clearTransi, run(() => {
			if(this.productionEfficiency <= 0 ) this.productionEfficiency += 5; // 每下增加的量
		})).size(80);
	},
	getPowerProduction(){
		return this.productionEfficiency;
	},
	write(write){
		this.super$write(write);
		write.f(this.productionEfficiency);
	},
	read(read, revision){
		this.super$read(read, revision);
		this.productionEfficiency = read.f();
	}
}));
