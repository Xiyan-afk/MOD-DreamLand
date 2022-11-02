//guiY     For 梦境
const lib = require('fhsnlib');
const c1 = Color.valueOf("ffccff");
const tailEffect = lib.newEffect(12, e => {
        Draw.color(Color.white, c1, Math.max(0, e.fout() * 2 - 1));
        Drawf.tri(e.x, e.y, 10 * e.fout(), 16, e.rotation);
        Drawf.tri(e.x, e.y, 10 * e.fout(), 30 * Math.min(1, e.data.time / 8 * 0.8 + 0.2), e.rotation - 180);
});
const tailEffectS = lib.newEffect(12, e => {
        Draw.color(Color.white, c1, Math.max(0, e.fout() * 2 - 1));
        Drawf.tri(e.x, e.y, 4 * e.fout(), 16, e.rotation);
        Drawf.tri(e.x, e.y, 4 * e.fout(), 30 * Math.min(1, e.data.time / 8 * 0.8 + 0.2), e.rotation - 180);
});
const rankB = extend(BasicBulletType, {
    update(b){
        if (this.homingPower > 0.0001 && b.time > 20) {
            var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange,
            boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)),
            boolf(t => this.collidesGround)
                    );
            if (target != null) {
                b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower));
            }
        }
        if (b.timer.get(1, 1)) {
            tailEffectS.at(b.x, b.y, b.rotation(), c1, { time: ((v) => v)(b.time) });
        }
    },
    draw(b) {
        Draw.color(c1);
        Drawf.tri(b.x, b.y, 4, 8, b.rotation());
        Drawf.tri(b.x, b.y, 4, 12, b.rotation() - 180);
        Draw.reset();
     },
});
rankB.speed = 4;
rankB.lifetime = 180;
rankB.damage = 450;
rankB.homingPower = 0.1;
rankB.homingRange = 150;
rankB.width = 1;
rankB.backColor = c1;
rankB.frontColor = Color.white;

const rankS = new JavaAdapter(BasicBulletType, {
    update(b){
        if (b.timer.get(1, 1)) {
            tailEffect.at(b.x, b.y, b.rotation(), c1, { time: ((v) => v)(b.time) });
        }
    },
    despawned(b){
        for(var i = 0; i < this.fragBullets; i++){
            rankB.create(b, b.x, b.y, (360/this.fragBullets) * (Math.floor(this.fragBullets/2) - i), 1, 1);
        }
    }
});
rankS.speed = 7;
rankS.lifetime = 120;//这个地方改1就原地分
rankS.damage = 1200;
rankS.width = 25;
rankS.height = 25;
rankS.backColor = c1;
rankS.frontColor = Color.white;
rankS.fragBullets = 9;//分散数量，不建议太大
const rankT = extendContent(Turret, 'rankT', {
    setStats(){
		this.super$setStats();
		
		this.stats.add(Stat.damage, "1200/单发\n800/碎片(x9)");
	},
});

lib.setBuildingSimple(rankT, Turret.TurretBuild, {
    updateShooting(){
        this.super$updateShooting();
        if(this.reload == 0){
            this.consume();
        }
    },
    hasAmmo() { return this.consValid(); },
    peekAmmo() { return rankS; },
    useAmmo() { return rankS; },
});
rankT.reloadTime = 20;
rankT.size = 3;
rankT.rotateSpeed = 15;
rankT.inaccuracy = 0;
rankT.range = 800;
rankT.shootCone = 80;
//rankT.shootSound = Sounds.laser;
rankT.shootEffect = lib.newEffect(10, (e) => {
  Draw.color(c1, c1, e.fin());
  Drawf.tri(e.x, e.y, 28 * e.fin(), 28 * e.fin(), e.rotation);
});
exports.rankT = rankT;
