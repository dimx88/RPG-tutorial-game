class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve) {
        // console.log('a battle message');
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => {
                resolve();
            }
        });

        message.init(this.battle.element);
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                // Submission { what move to use, who to use it on }
                resolve(submission);
            }
        });
        menu.init(this.battle.element);
    }

    init(resolve) {
        console.log(this.event);
        this[this.event.type](resolve);
    }
}