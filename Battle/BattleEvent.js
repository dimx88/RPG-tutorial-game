class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve) {
        const text = this.event.text
            .replace('{CASTER}', this.event.caster?.name)
            .replace('{TARGET}', this.event.target?.name)
            .replace('{ACTION}', this.event.action?.name);

        const message = new TextMessage({
            text,
            onComplete: () => {
                resolve();
            }
        });

        message.init(this.battle.element);
    }

    async stateChange(resolve) {
        const { caster, target, damage, recover, status, action } = this.event;
        let who = this.event.onCaster ? caster : target;

        if (damage) {
            console.log('target is', target);
            // Reduce HP of target
            target.update({
                hp: target.hp - damage
            });

            // Start blinking
            target.pizzaElement.classList.add('battle-damage-blink');
        }

        if (recover) {
            let newHp = who.hp + recover;
            newHp = Math.min(newHp, who.maxHp); // Constrain to max hp
            who.update({ hp: newHp });
        }

        if (status) {
            who.update({
                status: { ...status }
            });
        }

        if (status === null) {
            who.update({
                status: null
            });
        }


        // Wait a bit
        await utils.wait(600);

        // Stop blinking
        target.pizzaElement.classList.remove('battle-damage-blink');

        resolve();


    }


    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            onComplete: submission => {
                // Submission { what move to use, who to use it on }
                resolve(submission);
            }
        });
        menu.init(this.battle.element);
    }

    animation(resolve) {
        const fn = BattleAnimations[this.event.animation];
        fn(this.event, resolve);
    }

    init(resolve) {
        this[this.event.type](resolve);
    }
}