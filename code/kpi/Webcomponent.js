(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<div id="comparisonChartDiv"></div>` ;   
   
    class KPIElement extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
            // shadow dom
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));

            


            // functionallity
            this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.fireChanged();           
            this.dispatchEvent(event);
            });           
        }

        fireChanged() {
            console.log("OnClick Triggered");     
            
        }        
        
    }

    customElements.define('kpi-custom-widgets', KPIElement);
})();