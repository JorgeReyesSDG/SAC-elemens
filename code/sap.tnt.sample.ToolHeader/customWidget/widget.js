(function () {
    let _id;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
        /* Your styles go here */
      </style>
    `;

    class CustomHeader extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

            _id = createGuid();
        }

        // Other lifecycle methods and custom logic

        
    }

    customElements.define("com-fd-djaja-sap-sac-header", CustomHeader);

    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            let r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
})();