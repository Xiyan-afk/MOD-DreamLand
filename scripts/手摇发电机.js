
const 手摇发电机 = extend(SolarGenerator, '手摇发电机', {
/*    setBars(){
        this.super$setBars();
        this.bars.add("Power", func(entity => {
            var bar = new Bar(prov(() => Core.bundle.get("bar.power")), prov(() => pal.power), floatp(() => entity.getPowerProduction()));
            return bar;
        }));
    },*/
});
手摇发电机.localizedName = '手摇发电机';
手摇发电机.buildVisibility = BuildVisibility.shown;
手摇发电机.category = Category.power;
手摇发电机.update = 手摇发电机.configurable = 手摇发电机.hasPower = true;
手摇发电机.powerProduction = 50;//电量上限，1:60
手摇发电机.buildType = prov(() => {
    var productionEfficiency = 0
    const max = 3000;
    return new JavaAdapter(SolarGenerator.SolarGeneratorBuild, {
	update(){
		if(this.productionEfficiency > 0) this.productionEfficiency -= 0.0001; // 每帧减少的量
	},
	buildConfiguration(table){
		table.button(Icon.upOpen, Styles.defaulti, run(() => {
			if(this.productionEfficiency < max) this.productionEfficiency += 1; // 每下增加的量
		})).size(100);
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
},手摇发电机);
});




