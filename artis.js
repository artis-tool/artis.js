/*
 * Artis Utilities API
 * A functional low-level virtual CSS without CSS payload.
 * Inspired by Virtual DOM.
 * @params {Bool} .... set `true` to enable
 */
import { typography } from "./utilities/typography";
import { layouts } from "./utilities/layouts";
import { interactivity } from "./utilities/interactivity";
import { flex } from "./utilities/flex";
import { backgrounds } from "./utilities/backgrounds";
import { borders } from "./utilities/borders";
import { spacing } from "./utilities/spacing";
import { sizing } from "./utilities/sizing";
import { others } from "./utilities/others";

import { filteredUtils } from "./utilities/filteredUtils";

export const design = (initStyle) => {

  const cssUtilities = {
    ...typography,
    ...layouts,
    ...interactivity,
    ...flex,
    ...backgrounds,
    ...borders,
    ...spacing,
    ...sizing,
    ...others,
  };

  const observer = new MutationObserver((mutations, observer2) => {
    mutations.forEach((mutation) => {
      const target = mutation.target;
      target.lastClassName !== target.className && styleElement(target);
      target.lastClassName = target.className;
    });
  });

  const styleElement = (element) => {
    const classNames = element && element.className && element.className.split(" ") || [];
    classNames.forEach((className) => {
      const cssObject = extractStyleObjects(className);
      return cssObject && cssObject.key && (element.style[cssObject.key] = cssObject.value);
    });
  };

  const extractStyleObjects = (className) => {
    try {
      const notUnitUtils = [...filteredUtils];
      const classNameObjects = className.match(/(^[a-z-A-Z]{1,23}):([a-z-A-Z-0-9-%-.,(%)]{1,23})?/);
      const cssProperty = classNameObjects && cssUtilities[classNameObjects[1]];
      const utilClassName = classNameObjects[1];
      const utilClassValue = classNameObjects[2];
      const unit = (classNameObjects && classNameObjects[3]) || "px";
      // filter not unit utils
      if (notUnitUtils.indexOf(utilClassName) > -1) {
        return cssProperty && {
          key: cssProperty,
          value: utilClassValue,
        };
      }
      // otherwise use unit
      return cssProperty && {
        key: cssProperty,
        value: utilClassValue + unit,
      };
    } catch(error) {
      return error;
    };
  }

  if (initStyle === true) {
    const scope = window.document;
    const elements = scope.getElementsByTagName("*");
    for (let i in elements) {
      const element = elements[i];
      if (typeof element === "object") {
        styleElement(element);
        observer.observe(element, {
          attributes: true,
          attributeFilter: ["class"]
        });
      }
    }
    console.log("[artis] is running");
  }
};
