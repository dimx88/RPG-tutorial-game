class SubmissionMenu {
    constructor({ caster, enemy, onComplete }) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() {
        const backOption = {
            label: 'Go Back',
            description: 'Return to the previous page',
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        };

        return {
            root: [
                {
                    label: 'Attack',
                    description: 'Choose an attack',
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().attacks);
                    }
                },
                {
                    label: 'Items',
                    // disabled: true,
                    description: 'Choose an item',
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().items);
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
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action);
                        }
                    }
                }),
                backOption
            ],
            items: [
                {
                    label: 'Magic potion',
                    description: 'A colorful ray of light extract from unicorns',
                    handler: () => {

                    }
                },
                backOption
            ]
        }
    }

    menuSubmit(action, instanceId = null) {
        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === 'friendly' ? this.caster : this.enemy
        });
    }

    decide() {
        this.menuSubmit(Actions[this.caster.actions[0]]);
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