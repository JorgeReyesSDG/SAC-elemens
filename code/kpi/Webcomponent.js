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

            // inherit sap object
                // Create the ComparisonMicroChart
            //const tile = sap.m.GenericTile('tileUniqueID');

                // Attach the chart to the HTML element
            // const chartContainer = shadowRoot.getElementById("comparisonChartDiv");
            // comparisonChart.placeAt(chartContainer);


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