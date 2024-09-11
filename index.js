class index {
  constructor() {
    //#region errors elements
    this.prErrorFistNameEl = document.querySelector("#error-first-name");
    this.prFistNameEl = document.querySelector("#first-name");
    this.prErrorLastNameEl = document.querySelector("#error-last-name");
    this.prErrorInvalidEmailEl = document.querySelector("#error-valid-email");
    this.prErrorEmailEl = document.querySelector("#error-email");
    this.prErrorTypeQueryEl = document.querySelector("#error-query-type");
    this.prErrorMessageEl = document.querySelector("#error-message");
    this.prErrorConsentEl = document.querySelector("#error-consent");
    //#endregion

    //#region inputs elements
    this.inputFirstNameEl = document.getElementById("first-name");
    this.inputLastNameEl = document.getElementById("last-name");
    this.inputEmailEl = document.getElementById("email");
    this.inputMessageEl = document.getElementById("message");
    this.inputFormEl = document.getElementById("form");
    this.inputTypeEl = this.inputFormEl.type;
    this.inputConsentEl = document.querySelector("#consent");
    //#endregion

    this.btnSubmitEl = document.querySelector("#submit");
    this.init();
  }

  init() {
    this.clearInitialErrorMessage();
    this.onChange();
    this.validateForm();
  }

  onChange() {
    this.inputFirstNameEl.onchange = () => {
      const DIV = this.inputFirstNameEl.parentElement;
      let pErro = DIV.querySelector(".error");
      if (this.inputFirstNameEl.value.length == 0) {
        pErro.style.display = "block";
      } else {
        pErro.style.display = "none";
      }
    };

    this.inputLastNameEl.onchange = () => {
      const DIV = this.inputLastNameEl.parentElement;
      let pErro = DIV.querySelector(".error");
      if (this.inputLastNameEl.value.length == 0) {
        pErro.style.display = "block";
      } else {
        pErro.style.display = "none";
      }
    };

    this.inputEmailEl.onchange = () => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const DIV = this.inputEmailEl.parentElement;
      let pErroEmail = DIV.querySelector("#error-email");
      let pErroValidEmail = DIV.querySelector("#error-valid-email");
      if (this.inputEmailEl.value.length == 0) {
        pErroEmail.style.display = "block";
        pErroValidEmail.style.display = "none";
      } else if (!pattern.test(this.inputEmailEl.value)) {
        pErroEmail.style.display = "none";
        pErroValidEmail.style.display = "block";
      } else {
        pErroValidEmail.style.display = "none";
        pErroEmail.style.display = "none";
      }
    };

    this.inputTypeEl.forEach((e) => {
      e.onchange = () => {
        if (e.value == "enquiry") {
          e.parentElement.parentElement.parentElement.querySelector(".error").style.display = "none";
          e.parentElement.style["background-color"] = "hsl(148, 38%, 91%)";
          document.querySelector('.div-request').style["background-color"] = "white";
        } else if(e.value == "request") {
          e.parentElement.parentElement.parentElement.querySelector(".error").style.display = "none";
          e.parentElement.style["background-color"] = "hsl(148, 38%, 91%)";
          document.querySelector('.div-enquiry').style["background-color"] = "white";
        }
      };
    });

    this.inputMessageEl.onchange = () => {
      if (this.inputMessageEl.value.length > 0) {
        this.inputMessageEl.parentElement.querySelector(
          ".error"
        ).style.display = "none";
      } else {
        this.inputMessageEl.parentElement.querySelector(
          ".error"
        ).style.display = "block";
      }
    };

    this.inputConsentEl.onchange = () => {
      if (this.inputConsentEl.checked) {
        this.inputConsentEl.parentElement.querySelector(".error").style.display = "none";
      } else {
        this.inputConsentEl.parentElement.querySelector(
          ".error"
        ).style.display = "block";
      }
    };
  }

  clearInitialErrorMessage() {
    this.prErrorFistNameEl.style.display = "none";
    this.prErrorLastNameEl.style.display = "none";
    this.prErrorInvalidEmailEl.style.display = "none";
    this.prErrorEmailEl.style.display = "none";
    this.prErrorTypeQueryEl.style.display = "none";
    this.prErrorMessageEl.style.display = "none";
    this.prErrorConsentEl.style.display = "none";
    this.clearStyleDivs();
  }

  clearStyleDivs(){
    document.querySelector('.div-request').style["background-color"] = "white";
    document.querySelector('.div-enquiry').style["background-color"] = "white";
  }

  validateForm() {
    this.inputFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.findDivs(document.forms[0].querySelectorAll("div"));
    });
  }

  findDivs(element) {
    let resp = false;
    if (element.length > 0 || element.length != undefined) {
      element.forEach((div) => {
        if (div.querySelectorAll("div").length > 1) {
          this.findDivs(div);
        } else if (div.querySelectorAll("div")) {
          let p = div.querySelectorAll(".error");
          if (p.length == 0) {
            p = div.parentNode.parentNode.querySelectorAll(".error");
          }
          let input = div.querySelector("input");
          if (input) {
            let value = input.value;

            if (!this.inputTypeEl.value) {
              value = this.inputTypeEl.value;
            }

            if (input.id == "consent") {
              value = input.checked;
            }

            switch (value) {
              case false:
              case "":
              case null:
              case undefined:
                this.alterStyleParagraph(p, false);
                resp = false;
                break;

              case "enquiry":
                this.alterStyleParagraph(p);
                resp = false;
                break;

              case "request":
                this.alterStyleParagraph(p);
                return false;
                break;

              default:
                this.alterStyleParagraph(p);
                resp = true;
                break;
            }
          } else {
            if (this.inputMessageEl.value) {
              this.inputMessageEl.parentElement.querySelector(".error").style.display = "none";
            } else {
              this.inputMessageEl.parentElement.querySelector(".error").style.display = "block";
              resp = false;
            }
          }
        }
      });
    }
    if (resp) {
      this.clearInitialErrorMessage();
        setTimeout(() => {
          if(window.screen.availWidth > 600){
            document.querySelector("#modalMain").style.display = "block";
            document.querySelector("#modalMain").style.animationName = "modalDiv";
          } else {
            document.querySelector("#modalMain").style.display = "block";
            document.querySelector("#modalMain").style.animationName = "modalDiv600";
          }
          this.inputFormEl.reset();
        }, 1);
        setTimeout(() => {
          document.querySelector("#modalMain").style.animationName = "";
          document.querySelector("#modalMain").style.display = "";
        }, 4900);
      return false;
    } else {
      return false;
    }
  }

  alterStyleParagraph(p, isValid = true) {
    if (p.length > 0) {
      if (isValid) {
        p[0].style.display = "none";
      } else {
        p[0].style.display = "block";
      }
    }
  }
}

let app = new index();
