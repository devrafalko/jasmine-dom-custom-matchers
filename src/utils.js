class Utils {
  is(getObject, getType) {
    if (getObject === null || typeof getObject === "undefined") return false;
    return getObject.constructor.toString().toLowerCase().search(getType.toLowerCase()) >= 0;
  };

  isHTML(getElem) {
    if (getElem === null || typeof getElem === "undefined") return false;
    return this.is(getElem, "html") && this.is(getElem, "element");
  };

  getType(getValue) {
    if (this.isHTML(getValue)) {
      var id = getValue.id;
      var ret = id.length ? "#" + id : "";
      return getValue.tagName + ret;
    } else {
      return getValue === null ? 'null' : typeof getValue === "undefined" ? 'undefined' : getValue.constructor.name;
    }
  };

  shortenStr(getValue) {
    if (typeof getValue === 'string') {
      return getValue.length > 50 ? getValue.slice(0, 50) + "..." : getValue;
    } else {
      return getValue;
    }
  };

  test(condition, messageNot, messageFail) {
    return {
      pass: condition,
      message: condition ? messageNot : messageFail
    };
  };

  notMsg(isNot) {
    return isNot ? " not" : "";
  };

  returnBlock(fun) {
    return {
      compare: function () {
        return fun(arguments);
      },
      negativeCompare: function () {
        return fun(arguments, true);
      }
    };
  };
}

export default new Utils();