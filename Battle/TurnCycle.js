class TurnCycle {
    constructor({ battle, onNewEvent }) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = 'player'; // Or 'enemy'
    }

    async turn() {
        // Get a reference to the caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];

        // Get a reference to the enemy
        const enemyId = this.battle.activeCombatants[this.currentTeam];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: 'submissionMenu',
            caster,
            enemy
        }); 

        const resultingEvents = submission.action.success;
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