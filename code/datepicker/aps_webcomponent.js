(function () {
    let version = "2.5.1";
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
        jorge-datepicker-aps * {
            box-sizing: border-box;
        }
        jorge-datepicker-aps > p {
            margin: 16px 0 4px 0;
            line-height: 22px;
            font-size: 0.875rem;
            color: #999999;
        }
        jorge-datepicker-aps > p:first-of-type {
            margin-top: 0;
        }
        jorge-datepicker-aps > label {
            color: #333333 !important;
            font-size: 0.875rem;
        }
        jorge-datepicker-aps select {
            border: 1px solid rgb(191, 191, 191);
            padding: 3px 5px;
            width: calc(100% + 20px);
        }
        jorge-datepicker-aps select:hover,
        jorge-datepicker-aps select:focus {
            border: 1px solid #346187;
            cursor: pointer;
        }
        jorge-datepicker-aps > div.select {
            position: relative;
            overflow: hidden;
        }
        jorge-datepicker-aps > div.select::after {
            content: "\ue7ac";
            font-family: "fpa-icons";
            color: #346187;
            position: absolute;
            right: 0;
            height: 100%;
            width: 34px;
            line-height: 22px;
            text-align: center;
            border: 1px solid transparent;
            border-right: 1px solid rgb(191, 191, 191);
            pointer-events: none;
        }
        jorge-datepicker-aps > div.select:focus-within::after,
        jorge-datepicker-aps > div.select:hover::after {
            background-color: rgba(179, 179, 179, 0.5);
            border: 1px solid #346187;
            border-left-color: transparent;
        }
        jorge-datepicker-aps .checkbox {
            position: relative;
            display: flex;
            align-items: center;
            height: 22px;
        }
        jorge-datepicker-aps .checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }
        jorge-datepicker-aps .checkbox div.checkmark {
            position: relative;
            height: 16px;
            width: 16px;
            background-color: #fff;
            border: 0.125rem solid #bfbfbf;
            margin-right: 0.5rem;
        }
        jorge-datepicker-aps .checkbox div.checkmark:hover {
            cursor: pointer;
            border-color: #427cac;
        }
        jorge-datepicker-aps .checkbox input:checked ~ div.checkmark:after {
            content: "\ue614";
            font-family: "fpa-icons";
            color: #427cac;
            position: absolute;
            width: 100%;
            height: 100%;
            font-size: 0.625rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        jorge-datepicker-aps .checkbox input:focus ~ div.checkmark {
            outline: 1px dotted #333;
        }
        jorge-datepicker-aps p.info {
            background-color: #e78c0744;
            border: 1px solid #e78c07;
            white-space: normal;
            padding: 5px;
            width: 100%;
        }

        </style>
        <p>Date Format</p>
        <div class="select">
            <select id="select">
                <option name="aps_format" value="">Automatic</option>
                <option name="aps_format" value="MM-YYYY">MM-YYYY</option>
                <option name="aps_format" value="YYYY-MM-dd">YYYY-MM-DD</option>
                <option name="aps_format" value="MM/dd/YYYY">MM/DD/YYYY</option>
                <option name="aps_format" value="dd.MM.YYYY">DD.MM.YYYY</option>
            </select>
        </div>
        <p>Theme</p>
        <label class="checkbox"><input type="checkbox" id="theme" /><div class="checkmark" ></div>Use dark theme</label>
        <p>Miscellaneous</p>
        <label class="checkbox"><input type="checkbox" id="range" /><div class="checkmark" ></div>Enable date range selection</label>
        <p>Minimum Date Value</p>
        <div id="dateMin" ></div>
        <p>Maximum Date Value</p>
        <div id="dateMax" ></div>
    `;

    class DatePickerAps extends HTMLElement {
        constructor() {
            super();
            this.appendChild(tmpl.content.cloneNode(true));
            // Create the HTML element
            const element = document.createElement('div');

            // Set attributes or properties of the element
            element.id = 'myElement';
            element.textContent = 'Hello, World!';

            // Append the element to the desired parent element
            this.appendChild(element);
            if (sap.ui.getCore().byId("dateMin")) {
                sap.ui.getCore().byId("dateMin").destroy();
            }
            this.minDP = new sap.m.DatePicker({
                id: "dateMin",
                change: function (event) {
                    this.minDateVal = event.oSource.getDateValue();
                    this._submit(event);
                }.bind(this)
            });
            this.minDP.placeAt(this.querySelector("#dateMin"));

            if (sap.ui.getCore().byId("dateMax")) {
                sap.ui.getCore().byId("dateMax").destroy();
            }
            this.maxDP = new sap.m.DatePicker({
                id: "dateMax",
                change: function (event) {
                    this.maxDateVal = event.oSource.getDateValue();
                    this._submit(event);
                }.bind(this)
            });
            this.maxDP.placeAt(this.querySelector("#dateMax"));
            ["select", "theme", "range"].forEach(id =>
                this.querySelector("#" + id).addEventListener("change", this._submit.bind(this)));
        }

        async _checkForUpdates() {
            try {
                // const contribution = await (await fetch("http://widgets.nkappler.de/datepicker/releases/latest/datepicker.json")).json();
                // if (contribution.version > version) {
                //     const updateInfo = document.createElement("div");
                //     updateInfo.innerHTML = `
                //         <p class="info">
                //             A newer version of this Custom Widget is available.
                //             Please contact your system administrator
                //         </p>
                //     `;
                //     this.prepend(updateInfo);
                // }
            } catch (error) { }
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        format: this.format,
                        darktheme: this.darktheme,
                        enablerange: this.enablerange,
                        minDateVal: this.minDateVal,
                        maxDateVal: this.maxDateVal
                    }
                }
            }));
            return false;
        }

        get format() {
            return this.querySelector("option[name='aps_format']:checked").value;
        }

        set format(value) {
            this.querySelector("option[name='aps_format'][value='" + value + "']").checked = "checked";
        }

        get darktheme() {
            return this.querySelector("#theme").checked;
        }

        set darktheme(value) {
            this.querySelector("#theme").checked = value
        }

        get enablerange() {
            return this.querySelector("#range").checked;
        }

        set enablerange(value) {
            this.querySelector("#range").checked = value
        }

        get minDateVal() {
            return this.minDP.getDateValue();
        }

        set minDateVal(date) {
            this.minDP.setDateValue(date);
            this.maxDP.setMinDate(date)
        }

        get maxDateVal() {
            return this.maxDP.getDateValue();
        }

        set maxDateVal(date) {
            this.maxDP.setDateValue(date);
            this.minDP.setMaxDate(date);
        }
    }

    customElements.define('jorge-datepicker-aps', DatePickerAps);
})();