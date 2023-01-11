class TurnCycle {
    constructor({ battle, onNewEvent }) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = 'player'; // Or 'enemy'
    }

    async turn() {
        console.log('current turn', this.currentTeam);
        // Get a reference to the caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];

        // Get a reference to the enemy
        const enemyId = this.battle.activeCombatants[this.currentTeam === 'player' ? 'enemy' : 'player'];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: 'submissionMenu',
            caster,
            enemy
        }); 

        const resultingEvents = caster.getReplacedEvents(submission.action.success);
        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        // Check for post-turn events
        // (Do things after original turn submission)
        const postEvents = caster.getPostEvents();
        for (let i = 0; i < postEvents.length; i++) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            };
            await this.onNewEvent(event);
        }

        // Check for status expire
        const expiredEvent = caster.decrementStatus();
        if (expiredEvent) {
            await this.onNewEvent(expiredEvent);
        }


        // Toggle current team between ( player | enemy )
        this.currentTeam = this.currentTeam === 'player' ? 'enemy' : 'player';
        this.turn();
    }

    async init() {
        await this.onNewEvent({
            type: 'textMessage',
            text: 'A new battle begins!'
        });

        // Start the first turn
        this.turn();
    }
}