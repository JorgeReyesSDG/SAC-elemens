(function () {
    let _id;
    let url = "https://jorgereyessdg.github.io/SAC-elemens/code/sap.tnt.sample.ToolHeader/customWidget/";

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <link rel="stylesheet" type="text/css" href="${url}widget.css"/>
      <div class="header">
        <div class="nav-list">
            <div class="sections">
                <div class="text-wrapper">Home</div>
                <div class="text-wrapper">About</div>
                <div class="link-list">
                    <div class="text-wrapper">Resources</div>
                    <img class="vector" src="${url}resources/arrowDown.svg" />
                </div>
                <div class="text-wrapper">Contact</div>
            </div>
            <div class="master-secondary"><button class="button-text">Login</button></div>
            <div class="master-primary"><button class="div">Get started</button></div>
        </div>
        <img class="logo-style-guide-top" src="${url}resources/logo.svg" />
        </div>
    `;

    class CustomHeader extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

            _id = createGuid();
            const textWrappers = this.shadowRoot.querySelectorAll('.text-wrapper');
            textWrappers.forEach((wrapper) => {
                wrapper.addEventListener('click', () => {
                    const menuId = wrapper.getAttribute('data-menu-id');
                    this.menuSelection(menuId);
                });
            });
        }

        // Other lifecycle methods and custom logic
        menuSelection(menuId) {
            console.log(menuId);
            this.dispatchEvent(new Event("onSelection"));
        }

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