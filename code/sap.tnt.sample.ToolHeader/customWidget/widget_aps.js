(function () {
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
          h2 {
              font-size: 18px;
              margin-bottom: 10px;
          }
      </style>
      <h2>My Widget Settings</h2>
    `;

    class MyWidgetAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }

        connectedCallback() {
            // Add any additional initialization logic here
        }
    }

    customElements.define("com-fd-djaja-sap-sac-header-aps", MyWidgetAps);
})();