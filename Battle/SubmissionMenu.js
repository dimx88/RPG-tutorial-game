class SubmissionMenu {
    constructor({ caster, enemy, onComplete }) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() {
        return {
            root: [
                {
                    label: 'Attack',
                    description: 'Choose an attack',
                    handler: () => {
                        console.log('goto attacks page');
                    }
                },
                {
                    label: 'Items',
                    disabled: true,
                    description: 'Choose an item',
                    handler: () => {
                        console.log('goto items page');
                    }
                },
                {
                    label: 'Swap',
                    description: 'Change to another pizza',
                    handler: () => {
                        console.log('goto swap page');
                    }
                }
            ],
            attacks: [

            ]
        }
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster.actions[0]],
            target: this.enemy
        });
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root);
    }


    init(container) {

        if (this.caster.isPlayerControlled) {
            this.showMenu(container);
        } else {
            this.decide();
        }
    }
}