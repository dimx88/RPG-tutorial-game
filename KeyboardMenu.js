class KeyboardMenu {
    constructor(container) {
        this.options = []; // Set by the updater method
        this.up = null;
        this.down = null;
        this.prevFocus = null;
    }

    setOptions(options) {
        this.options = options;
        this.element.innerHTML = this.options.map((option, index) => {
            const disabledAttr = option.disabled ? 'disabled' : '';
            return (`
            <div class="option">
                <button ${disabledAttr} data-button="${index}" data-description="${option.description}">
                 ${option.label}
                </button>
                <span class="right">${option.right ? option.right() : ''}</span>
            </div>
            `);
        }).join('');
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('KeyboardMenu');
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}