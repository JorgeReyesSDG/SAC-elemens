(function () {
    let tmpl = document.createElement("template");
    tmpl.innerHTML = 
    `<button type="button" id="myHeaderBtn">v 36</button>` ;   

    class CustomHeaderAps extends HTMLElement {
       constructor() {
            super();
            this.init();
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));     
        }
    }

    customElements.define("com-fd-djaja-sap-sac-header-aps", CustomHeaderAps);
})();
