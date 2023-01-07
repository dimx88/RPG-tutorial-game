class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.map = {
            'ArrowUp' : 'up',
            'ArrowDown' : 'down',
            'ArrowLeft' : 'left',
            'ArrowRight' : 'right',
            'KeyW' : 'up',
            'KeyS' : 'down',
            'KeyA' : 'left',
            'KeyD' : 'right',
        };

    }

    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', e => {
            const dir = this.map[e.code];
            if (dir && !this.heldDirections.includes(dir)) { // If user presses a valid direction and it's not in the heldDirection array yet
                this.heldDirections.unshift(dir);    // Add the direction to the beginning of the array
                // console.log(this.heldDirections);
            }
        });

        document.addEventListener('keyup', e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
                // console.log(this.heldDirections);
            }
        });
    }
}