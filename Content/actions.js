window.Actions = {
    // Combatant moves
    damage1: {
        name: 'Whomp',
        success: [
            { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
            { type: 'animation', animation: 'spin' },
            { type: 'stateChange', damage: 10 }
        ],
        description: 'A basic attack'
    },
    saucyStatus: {
        name: 'Tomato Squeeze',
        targetType: 'friendly',
        success: [
            { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
            { type: 'stateChange', status: { type: 'saucy', expiresIn: 3 } }
        ],
        description: 'Revives some HP every turn'
    },
    clumsyStatus: {
        name: 'Olive Oil',
        success: [
            { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
            { type: 'animation', animation: 'glob', color: '#dafd2aַ' },
            { type: 'stateChange', status: { type: 'clumsy', expiresIn: 3 } },
            { type: 'textMessage', text: '{TARGET} is slipping all around!' },
        ],
        description: 'Causes opponent to potentially miss his attacks'
    },

    // Items
    item_recoverStatus: {
        name: 'Energy Snack',
        description: 'Makes life better',
        targetType: 'friendly',
        success: [
            { type: 'textMessage', text: '{CASTER} uses {ITEM}!' },
            { type: 'stateChange', status: null },
            { type: 'textMessage', text: 'Feels good, man' },
        ]
    }
};