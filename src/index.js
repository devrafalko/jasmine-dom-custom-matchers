import Matchers from './matchers.js';

class DOMCustomMatchers extends Matchers {
	constructor() {
		super();
		this.toBeHTMLElement = this._toBeHTMLElement;
		this.toBeHTMLText = this._toBeHTMLText;
		this.toBeDocumentNode = this._toBeDocumentNode;
		this.toContainHTMLElement = this._toContainHTMLElement;
		this.toContainText = this._toContainText;
		this.toBeChildOf = this._toBeChildOf;
		this.toBeNthChild = this._toBeNthChild;
		this.toBeParentOf = this._toBeParentOf;
		this.toHaveSameParent = this._toHaveSameParent;
		this.toHaveChildren = this._toHaveChildren;
		this.toBeNextSiblingOf = this._toBeNextSiblingOf;
		this.toBePreviousSiblingOf = this._toBePreviousSiblingOf;
		this.toBeEmpty = this._toBeEmpty;
		this.toHaveAnyAttribute = this._toHaveAnyAttribute;
		this.toHaveAttribute = this._toHaveAttribute;
		this.toHaveClass = this._toHaveClass;
		this.toHaveComputedStyle = this._toHaveComputedStyle;
		this.toHaveComputedColor = this._toHaveComputedColor;
		this.toHaveEvent = this._toHaveEvent;
	}
}

export default new DOMCustomMatchers();