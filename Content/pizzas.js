window.PizzaTypes = {
    normal: 'normal',
    spicy: 'spicy',
    veggie: 'veggie',
    fungi: 'fungi',
    chill: 'chill',
}

window.Pizzas = {
    's001': {
        name: 'Slice Samurai',
        type: PizzaTypes.spicy,
        src: '/images/characters/pizzas/s001.png',
        icon: '/images/icons/spicy.png',
        actions: ['clumsyStatus', 'damage1', 'saucyStatus'],
    },
    'v001': {
        name: 'Call Me Kale',
        type: PizzaTypes.veggie,
        src: '/images/characters/pizzas/v001.png',
        icon: '/images/icons/veggie.png',
        actions: ['damage1'],
    },
    'f001': {
        name: 'Portabello Express',
        type: PizzaTypes.fungi,
        src: '/images/characters/pizzas/f001.png',
        icon: '/images/icons/fungi.png',
        actions: ['damage1'],
    },
}