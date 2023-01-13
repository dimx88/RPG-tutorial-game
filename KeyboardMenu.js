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

        // Description box element
        this.descriptionElement = document.createElement('div');
        this.descriptionElement.classList.add('DescriptionBox');
        this.descriptionElement.innerHTML = (`<p>Test description text</p>`);
        this.descriptionElementText = this.descriptionElement.querySelector('p');

    }

    init(container) {
        this.createElement();
        container.appendChild(this.descriptionElement);
        container.appendChild(this.element);
    }
}