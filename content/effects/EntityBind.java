package chiptech.world;

import arc.Events;
import arc.struct.Seq;
import mindustry.game.EventType.Trigger;
import mindustry.gen.Entityc;

public class EntityBind<T extends Entityc> {
	public T bind;
	public Runnable runnable = this::updateBase;
	public static final Seq<EntityBind> all = new Seq<>();

	public EntityBind(T bind) {
		all.add(this);
		this.bind = bind;
		runs.add(runnable);
	}

	public void update() {
	}

	public final void updateBase() {
		if (!bind.isAdded()) remove();
		else update();
	}

	public final void remove() {
		runs.remove(runnable);
	}

	static final Seq<Runnable> runs = new Seq<>();


	static {
		Events.run(Trigger.update, () -> {
			for (Runnable r : runs) r.run();
		});
	}
}
