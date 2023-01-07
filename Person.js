class Person extends GameObject {
    constructor(config) {
        super(config);

        this.movingProgressRemaining = 0;
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.motionPerUpdate = 1;
        this.directionUpdate = {
            'up': ['y', -1],
            'down': ['y', 1],
            'left': ['x', -1],
            'right': ['x', 1]
        };
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // More cases for walking will come here

            // Case: Wer'e keyboard-ready and an arrow is pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: 'walk',
                    direction: state.arrow
                });
            }
            this.updateSprite(state);
        }

    }

    startBehavior(state, behavior) {
        // Set character direction to whatever is passed in the behavior
        this.direction = behavior.direction;

        if (behavior.type === 'walk') {

            // Stop here if the cell wer'e walking towards isn't free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {  
                // Retry walking after being blocked if 'retry' was set to true
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior);
                }, 500);

                return;
            }

            // Start walk
            this.movingProgressRemaining = 16;
            state.map.moveWall(this.x, this.y, this.direction);
            this.updateSprite(state);
        }

        if (behavior.type === 'stand') {
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent('personStandComplete', { whoId: this.id });
                this.isStanding = false;
            }, behavior.time);
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            // Finished walk
            utils.emitEvent('personWalkingComplete', { whoId: this.id });
        }
    }

    updateSprite(state) {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation('walk-' + this.direction);
            return;
        }

        this.sprite.setAnimation('idle-' + this.direction);
    }
}