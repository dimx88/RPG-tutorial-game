class TurnCycle {
    constructor({ battle, onNewEvent }) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = 'player'; // Or 'enemy'
    }

    async turn() {
        // Get the caster
        const casterId = the.battle.activeCombatants[this.currentTeam]
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