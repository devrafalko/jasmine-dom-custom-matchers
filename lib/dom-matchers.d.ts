/// <reference types="jasmine" />

declare namespace jasmine {
    interface Matchers<T> {
        /**
         * Check if actual is [HTML Element] Object.
         *
         * @param {string} [name]
         * @return {boolean}
         */
        toBeHTMLElement(name?: string): boolean;

        /**
         * Check if actual is [HTML Text] Object.
         *
         * @param {string|RegExp} [content]
         * @return {boolean}
         */
        toBeHTMLText(content?: string | RegExp): boolean;

        /**
         * Check if actual is a [HTML Element] Object or [HTML Text] Object appended into DOM Tree.
         *
         * @return {boolean}
         */
        toBeDocumentNode(): boolean;

        /**
         * Check if actual HTML Element contains expected descendant.
         *
         * @param {HTMLElement} descendant
         * @return {boolean}
         */
        toContainHTMLElement(descendant: HTMLElement): boolean;

        /**
         * Check if actual [HTML Element] Object and all its descendants contain or match expected textual content.
         *
         * @param {string|RegExp} content
         * @return {boolean}
         */
        toContainText(content: string | RegExp): boolean;

        /**
         * Check if actual [HTML Element] Object or [HTML Text] Object is a children of parent [HTML Element] Object.
         *
         * @param {HTMLElement} parent
         * @return {boolean}
         */
        toBeChildOf(parent: HTMLElement): boolean;

        /**
         * Check if actual [HTML Element] Object has expected index in the collection of child nodes of actual's parent [HTML Element] Object.
         *
         * @param {number|string} index
         * @return {boolean}
         */
        toBeNthChild(index: number | 'last'): boolean;

        /**
         * Check if actual [HTML Element] Object is a parent of child [HTML Element] Object or [HTML Text] Object.
         *
         * @param {HTMLElement|Text} child
         * @return {boolean}
         */
        toBeParentOf(child: HTMLElement | Text): boolean;

        /**
         * Check if actual and node are the children of the same [HTML Element] Object.
         *
         * @param {HTMLElement|Text} node
         * @return {boolean}
         */
        toHaveSameParent(node: HTMLElement | Text): boolean;

        /**
         * Check if actual [HTML Element] Object contains any [HTML Element] child nodes.
         *
         * @param {number} [numOfChildren]
         * @param {string} [operator]
         * @return {boolean}
         */
        toHaveChildren(numOfChildren?: number, operator?: 'or more' | 'or less' | 'more than' | 'less than'): boolean;

        /**
         * Check if actual [HTML Element] Object is the next element sibling of expected [HTML Element] Object.
         *
         * @param {HTMLElement} expected
         * @return {boolean}
         */
        toBeNextSiblingOf(expected: HTMLElement): boolean;

        /**
         * Check if actual [HTML Element] Object is the previous element sibling of expected [HTML Element] Object.
         *
         * @param {HTMLElement} expected
         * @return {boolean}
         */
        toBePreviousSiblingOf(expected: HTMLElement): boolean;

        /**
         * Eheck if actual [HTML Element] Object has not got any [HTML Element] or [HTML Text] child nodes.
         *
         * @return {boolean}
         */
        toBeEmpty(): boolean;

        /**
         * Check if actual [HTML Element] Object has got any attribute defined.
         *
         * @return {boolean}
         */
        toHaveAnyAttribute(): boolean;

        /**
         * Check if actual [HTML Element] Object has expected attribute name of expected value.
         *
         * @param {string} name
         * @param {string|RegExp} [value]
         * @return {boolean}
         */
        toHaveAttribute(name: string, value?: string | RegExp): boolean;

        /**
         * Check if actual [HTML Element] Object has got class attribute with expected value class from among the list of classes.
         *
         * @param {string} cssClass
         * @return {boolean}
         */
        toHaveClass(cssClass: string): boolean;

        /**
         * Check if actual [HTML Element] Object's computed prop style is of expected value.
         *
         * @param {string} prop
         * @param {string|RegExp} value
         * @return {boolean}
         */
        toHaveComputedStyle(prop: string, value: string | RegExp): boolean;

        /**
         * Check if actual [HTML Element] Object's computed prop style is of expected value.
         *
         * @param {string} prop
         * @param {string} value
         * @return {boolean}
         */
        toHaveComputedColor(prop: string, value: string): boolean;

        /**
         * Check if actual [HTML Element] Object has got expected event attached.
         *
         * @param {string} event
         * @return {boolean}
         */
        toHaveEvent(event: string): boolean;
    }
}

declare module 'jasmine-dom-custom-matchers' {
    export default {};
}
