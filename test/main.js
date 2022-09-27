import { design } from "../artis";

class NewComponent extends HTMLElement {
  constructor() {
    super();

    this.flexCenter = "display:flex justifyContent:center alignItems:center textColor:rgba(18,161,161,1) bgColor:rgba(27,221,203,1)";

    this.buttonStyle =`p:20 ${this.flexCenter} fontFamily:sans,serif textSize:150 curveRadius:15 curveStyle:inset curveWidth:20 curveColor:rgba(120,255,249,1)`;
  }

  connectedCallback() {
    const template = document.createElement("template");
    template.innerHTML = `
      <button class="${this.buttonStyle}">
        Tests
      </button>
    `;
    this.appendChild(template.content.cloneNode(true));

    design(true);
  }
}
customElements.define("new-component", NewComponent);
