class ButtonCount extends HTMLElement{

    constructor(){
        //Inherit extended attributes
        super();

        const button = document.createElement('button');
        button.innerText = 'Times Clicked: ';

        const number = document.createElement('span');
        number.innerText = '0';
        button.appendChild(number);

        button.addEventListener('click', () =>
            {
                let numClicks = parseInt(number.innerText);
                number.innerText = numClicks + 1;
            }
        )

        const shadowDOM = this.attachShadow({mode: 'open'});
        shadowDOM.appendChild(button);
    }
}

//Register in custom elements registry
customElements.define('button-count', ButtonCount);