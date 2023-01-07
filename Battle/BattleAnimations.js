window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.pizzaElement;
        const animationClassName = event.caster.team === 'player' ? 'battle-spin-right' : 'battle-spin-left';
        element.classList.add(animationClassName);

        // Remove class when animation is done
        element.addEventListener('animationend', () => {
            element.classList.remove(animationClassName);
        }, { once: true });

        // Continue battle cycle around the time when the pizza's collide
        await utils.wait(1000);
        onComplete();
    }
};