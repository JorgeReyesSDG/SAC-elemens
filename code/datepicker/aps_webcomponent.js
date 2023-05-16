(function () {
    let version = "3.0.0";
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   

    class DatePickerAps extends HTMLElement {
        constructor() {
            super();
            this.init();
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.fireChanged();           
            this.dispatchEvent(event);
            });           
        }
    }

    customElements.define('jorge-datepicker-aps', DatePickerAps);
})();