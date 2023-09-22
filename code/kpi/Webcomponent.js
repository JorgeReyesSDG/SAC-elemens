(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   
   
    class PerformanceHelp extends HTMLElement {
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
            const comparisonChart = new sap.suite.ui.microchart.ComparisonMicroChart({
                id: "comparisonChart", // Assign an ID to the chart
                    // Set other chart properties and data here
                });

                // Attach the chart to the HTML element
            const chartContainer = shadowRoot.getElementById("comparisonChart");
            comparisonChart.placeAt(chartContainer);


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

    customElements.define('custom-button', PerformanceHelp);
})();