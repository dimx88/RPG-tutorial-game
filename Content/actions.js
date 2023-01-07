window.Actions = {
    damage1: {
        name: 'Whomp',
        success: [
            { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
            // { type: 'animation', animation: 'toBeDefined' },
            { type: 'stateChange', damage: 10 }
        ]
    }
};