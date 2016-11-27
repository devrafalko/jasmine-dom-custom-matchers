### In This Documentation
1. [Description](#description)
2. [Browser Support](#browser-support)
3. [Methods](#methods)
4. [Tips](#tips)
5. [Implementation](#implementation)
5. [Usage](#usage)
6. [License](#license)

# Description

##### How does **DOMCustomMatchers** work?
A custom matcher setting up has changed with the release of **jasmine 2.0**. This library provides **13 custom matchers** adjusted to the new way of matchers constructing, let to compare DOM Objects relations and states.

##### What can I use **DOMCustomMatchers** for?
 * to check if the actual parameter is HTML Element *[[see below]](#expectactualtobehtmlelementname)*
 * to check if the actual parameter is HTML Text *[[see below]](#expectactualtobehtmltextcontent)*
 * to check if the HTML Element or HTML Text is appended to the document *[[see below]](#expectactualtobedocumentnode)*
 * to check if the expected HTML Element is a descendant of actual HTML Element *[[see below]](#expectactualtocontainhtmlelementdescendant)*
 * to check if actual HTML Element or its HTML Element descendants contain expected text *[[see below]](#expectactualtocontaintextcontent)*
 * to check if expected Node is a child of actual Node *[[see below]](#expectactualtobechildofparent)*
 * to check if expected Node is a parent of actual Node *[[see below]](#expectactualtobeparentofchild)*
 * to check if actual HTML Element has got any HTML Element children *[[see below]](#expectactualtohavechildrennumofchildren)*
 * to check if HTML Element is empty (has not got any HTML ELement and HTML Text nodes) *[[see below]](#expectactualtobeempty)*
 * to check if HTML Element has got expected attribute (or expected attribute of expected value) *[[see below]](#expectactualtohaveattributenamevalue)*
 * to check if HTML Element has got expected class *[[see below]](#expectactualtohaveclassclass)*
 * to check if HTML Element (DOM node) has got expected style (computed style) *[[see below]](#expectactualtohavecomputedstylepropvalue)*
 * to check if HTML Element (DOM node) has got expected color (computed style) *[[see below]](#expectactualtohavecomputedcolorpropvalue)*

##### **DOM Custom Matchers** list
 * `expect(actual).toBeHTMLElement(name)` *[[see below]](#expectactualtobehtmlelementname)*
 * `expect(actual).toBeHTMLText(content)` *[[see below]](#expectactualtobehtmltextcontent)*
 * `expect(actual).toBeDocumentNode()` *[[see below]](#expectactualtobedocumentnode)*
 * `expect(actual).toContainHTMLElement(descendant)` *[[see below]](#expectactualtocontainhtmlelementdescendant)*
 * `expect(actual).toContainText(content)` *[[see below]](#expectactualtocontaintextcontent)*
 * `expect(actual).toBeChildOf(parent)` *[[see below]](#expectactualtobechildofparent)*
 * `expect(actual).toBeParentOf(child)` *[[see below]](#expectactualtobeparentofchild)*
 * `expect(actual).toHaveChildren(numOfChildren)` *[[see below]](#expectactualtohavechildrennumofchildren)*
 * `expect(actual).toBeEmpty()` *[[see below]](#expectactualtobeempty)*
 * `expect(actual).toHaveAttribute(name,value)` *[[see below]](#expectactualtohaveattributenamevalue)*
 * `expect(actual).toHaveClass(class)` *[[see below]](#expectactualtohaveclassclass)*
 * `expect(actual).toHaveComputedStyle(prop,value)` *[[see below]](#expectactualtohavecomputedstylepropvalue)*
 * `expect(actual).toHaveComputedColor(prop,value)` *[[see below]](#expectactualtohavecomputedcolorpropvalue)*

##### Where can I check how **DOMCustomMatchers** work?
Examine the *[Samples of usage](#usage)* described below to find out how you can use DOM custom matchers.
 
# Browser Support
|Chrome|Firefox|IE|Edge|Safari|Opera|iOS Safari|Opera Mini
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|4+|2+|9-11|12+|3.1+|9+|3.2+|all|

# Methods

##### `expect(actual).toBeHTMLElement(name)`
* check if `actual` is [HTML Element] Object.
* `name` parameter is optional
* `name` parameter *if passed*, must be of type [String]
* `name` parameter *if passed*, the matcher checks if `actual` is a [HTML Element] Object of expected **tag name** `name`
* `name` parameter *if passed but not of type [String]*, is ignored as if it was not passed (matcher checks if `actual` is [HTML Element] Object regardless its tag name)
* returns **false** if `actual` is not the [HTML Element] Object
* returns **false** if `actual` is [HTML Element] Object but of not expected tag name `name` *(if passed)*
* return **true** if `actual` is [HTML Element] Object
* return **true** if `actual` is [HTML Element] Object of expected `name` *(if passed)*
* return **true** regardless `actual` [HTML Element] Object is appended to the DOM or not

##### `expect(actual).toBeHTMLText(content)`
* check if `actual` is [HTML Text] Object.
* `content` parameter is optional
* `content` parameter *if passed*, must be of type [String] or [RegExp]
* if the `content` is of type [String] the matcher checks the equality of the `actual` text content and expected `content`
* if the `content` is of type [RegExp] the matcher use String.prototype.match() to check if the `actual` text content matches the expected `content` regular expression
* `content` parameter *if passed but not of type [String] or [RegExp]*, is ignored as if it was not passed (matcher checks if `actual` is [HTML Text] Object regardless its content)
* returns **false** if `actual` is not the [HTML Text] Object
* returns **false** if `actual` is [HTML Text] Object but does not match expected `content` *(if passed)*
* return **true** if `actual` is [HTML Text] Object
* return **true** if both `actual` is [HTML Text] Object and matches expected `content` *(if passed)*
* return **true** regardless `actual` [HTML Text] Object is appended to the DOM or not

##### `expect(actual).toBeDocumentNode()`
* check if `actual` is a [HTML Element] Object or [HTML Text] Object **appended into DOM Tree**
* return **false** if `actual` is not [HTML Element] Object or [HTML Text] Object or if it is not appended into DOM Tree
* returns **true** if `actual` is [HTML Element] Object or [HTML Text] Object appended into DOM Tree

##### `expect(actual).toContainHTMLElement(descendant)`
* check if `actual` HTML Element **contains** expected `descendant`
* both `actual` and `descendant` must be [HTML Element] Object
* return **false** if `actual` or `descendant` is not the [HTML Element] Object
* return **false** if `actual` does not contain `descendant`
* return **false** if `actual` and `descendant` is the same object
* return **true** if `descendant` is a child node of `actual`
* return **true** if `descendant` is a farther descendant of `actual`
* return **true** regardless `actual` [HTML Element] Object and its expected descendant are appended to the DOM or not

##### `expect(actual).toContainText(content)`
* check if `actual` [HTML Element] Object and all its descendants contain or match expected textual `content`
* `content` must be of type [String] or [RegEx]
* if `actual` contains multiple of [HTML Text] descendants, it is normalized (empty [HTML Text] nodes and multi spaces are removed from the text) before being compared with expected `content` text
* return **false** if `actual` is not [HTML Element] Object or if `content` is not of type [String] or [RegEx]
* return **false** if `actual` does not contain or match the text or regular expression passed in `content`
* return **true** if `actual` contains or matches the text or regular expression passed in `content`
* return **true** regardless `actual` [HTML Element] Object is appended to the DOM or not

> to check whether the [HTML Text] Object **equals** text content, use `toBeHTMLText(content)` with expected text `content`

##### `expect(actual).toBeChildOf(parent)`
* check if `actual` [HTML Element] Object or [HTML Text] Object is a **children** of `parent` [HTML Element] Object
* return **false** if `actual` is not [HTML Element] Object or [HTML Text] Object
* return **false** if `parent` is not [HTML Element] Object
* return **false** if `actual` is not a direct child node of `parent`
* return **false** if `actual` and `parent` is the same object
* return **true** if `actual` is the direct child node of `parent`
* return **true** regardless `actual` and `parent` are appended to the DOM or not

##### `expect(actual).toBeParentOf(child)`
* check if `actual` [HTML Element] Object is a **parent** of `child` [HTML Element] Object or [HTML Text] Object
* return **false** if `actual` is not [HTML Element] Object
* return **false** if `child` is not [HTML Element] Object or [HTML Text] Object
* return **false** if `actual` is not a direct parent node of `child`
* return **false** if `actual` and `child` is the same object
* return **true** if `actual` is the direct parent node of `child`
* return **true** regardless `actual` and `child` are appended to the DOM or not

##### `expect(actual).toHaveChildren(numOfChildren)`
* check if `actual` [HTML Element] Object **contains any** [HTML Element] **child nodes**
* it **ignores** [HTML Text] and [HTML Comment] Objects
* `numOfChildren` is optional
* `numOfChildren` *if passed* must be of type [Number] equal or bigger than `0`
* if `numOfChildren` is not of type [Number] or is less than `0`, it is ignored as if it was not passed (matcher checks if `actual` contains **any** [HTML Element] Object)
* `numOfChildren` *if passed*, the matcher checks if `actual` contains expected `numOfChildren` **number of [HTML Element] child nodes**
* return **false** if `actual` is not [HTML Element] Object
* return **false** if `actual` does not contain any [HTML Element] child nodes *(if `numOfChildren` not passed)*
* return **false** if `actual` does not contain expected number of [HTML Element] child nodes *(if `numOfChildren` passed)*
* return **true** if `actual` contains at least one [HTML Element] child node *(if `numOfChildren` not passed)*
* return **true** if `actual` contains expected number of [HTML Element] child nodes *(if `numOfChildren` passed)*
* return **true** regardless `actual` [HTML Element] Object is appended to the DOM or not

##### `expect(actual).toBeEmpty()`
* check if `actual` [HTML Element] Object has not got any [HTML Element] or [HTML Text] child nodes
* it ignores [HTML Comment] Objects, empty text nodes, **&lt;br/&gt;** and **&lt;wbr/&gt;** tags
* return **false** if `actual` is not [HTML Element] Object
* return **false** if `actual` contains at least one [HTML Element] Object or [HTML Text] Object
* return **true** if `actual` has not got any [HTML Element] or [HTML Text] descendant
* return **true** regardless `actual` [HTML Element] Object is appended to the DOM or not

> the difference between .toBeEmpty() matcher and .toHaveChildren() matcher is that .toBeEmpty() matcher checks if the actual [HTML Element] Object contains both [HTML Element] and [HTML Text] Objects when .toHaveChildren() matcher checks if the actual [HTML Element] Object contains only [HTML Element] Objects.

##### `expect(actual).toHaveAttribute(name,value)`
* check if `actual` [HTML Element] Object has expected attribute `name` of expected `value`
* `name` must be of type [String]
* `value` parameter is optional, *if not passed*, matcher checks if `actual` has expected attribute `name` regardless its value
* `value` parameter *if passed*, must be of type [String] or of type [RegExp]
* if `value` is not of type [String] or of type [RegExp], it is ignored as if it was not passed (matcher checks if `actual` has expected attribute `name` regardless its value)
* if the `value` is of type [String] the matcher checks the equality of attribute's value and expected `value`
* if the `value` is of type [RegExp] the matcher use `String.prototype.match()` to check if the attribute's value matches the expected regular expression `value`
* return **false** if `actual` is not [HTML Element] Object or if `name` is not of type [String]
* return **false** if `actual` does not have expected attribute `name` *(if `value` not passed)*
* return **false** if `actual` does not have expected attribute `name` of expected `value` *(if `value` passed)*
* return **true** if `actual` has expected attribute `name` *(if `value` not passed)*
* return **true** if `actual` has expected attribute `name` of expected value `value` *(if `value` passed)*
* return **true** regardless `actual` is appended to the DOM or not

> with appropriate /regular expression/ passed as `value` parameter it is possible to check whether class attribute contains expected class, but it is easier to achieve with .toHaveClass() custom matcher

##### `expect(actual).toHaveClass(class)`
* check if `actual` [HTML Element] Object has got class attribute with expected value `class` from among the list of classes
* `class` must be of type [String]
* return **false** if `actual` is not [HTML Element] Object or if `class` is not of type [String]
* return **false** if `actual` has not got expected `class` set
* return **true** if `actual` has got expected `class` set
* return **true** regardless `actual` is appended to the DOM or not

> to check whether [HTML Element] Object has got a *class* attribute defined regardless its values, use `.toHaveAttribute('class')` matcher

##### `expect(actual).toHaveComputedStyle(prop,value)`
* check if `actual` [HTML Element] Object's computed `prop` style is of expected `value` 
* `actual` must be appended into the DOM tree, so that the [CSSStyleDeclaration] Object could be returned
* `prop` must be of type [String] *(both camelCase and hyphen-case are accepted)*
* `value` must be of type [String] or [RegExp]
* if the `value` is of type [String] the matcher checks the equality of the computed style's value and expected `value`
* if the `value` is of type [RegExp] the matcher use `String.prototype.match()` to check if the computed style's value matches the expected `value` regular expression
* return **false** if `actual` is not [HTML Element] Object or `prop` is not of type [String] or `value` is not of type [String] or [RegExp]
* return **false** if returned [CSSStyleDeclaration] Object has not contain `prop` property
* return **false** if `actual` has got the computed `prop` style of the different value than expected `value`
* return **true** if `actual` has got the computed `prop` style of the same value as expected [String] `value` or if computed `prop` style matches expected [RegExp] `value`

> in order to deal with the **differences between browsers** of returning computed style values, use **regular expression** `.toHaveComputedStyle('propertyName',/(ms-value|moz-value|webkit-value)/)`

##### `expect(actual).toHaveComputedColor(prop,value)`
* check if `actual` [HTML Element] Object's computed `prop` style is of expected `value` 
* the difference between `toHaveComputedStyle()` and `toHaveComputedColor()` is that `toHaveComputedColor()` is convenient to compare each CSS `*-color` property, which demand or return color value (`background-color`, `border-bottom-color`, `color`, `box-shadow`, `text-shadow`, `outline-color`, etc.)
* the convenience is that you can expect the color `value` in the format of your choice (`#HEX` `RGB()` or `HSL()`), regardless which format the browser return as computed
* `actual` must be appended into the DOM tree, so that the [CSSStyleDeclaration] Object could be returned
* `prop` must be of type [String] *(both camelCase and hyphen-case are accepted)*
* `value` must be of type [String] *(in order to use [RegExp] value, use matcher `toHaveComputedStyle('colorProp',/regEx/)`)*
* return **false** if `actual` is not [HTML Element] Object or `prop` is not of type [String] or `value` is not of type [String]
* return **false** if returned [CSSStyleDeclaration] Object has not contain `prop` property
* return **false** if `actual` computed `prop` style does not match expected `value` color
* return **true** if `actual` computed `prop` style matches expected `value` color

> If the browser return `rgb(255, 255, 0) 2px 2px 2px` as **computed 'box-shadow' style**, the **expected** `value` `rgb(255, 255, 0)`, `rgba(255, 255, 0, 1)`, `#ff0`, `#FFFF00`, `hsl(60, 100%, 50%)` and `hsla(60, 100%, 50%, 1)` will return **truthy result**.

> If the browser return `rgba(255, 255, 0, .4)` as **computed 'color' style**, the **expected** `value` `rgba(255, 255, 0, .4)` and `hsla(60, 100%, 50%, .4)` will return **truthy result**.

> If the browser return `rgba(255, 255, 0, .4)` as **computed 'color' style**, the **expected** `value` `rgb(255, 255, 0)`, `#ff0`, `#FFFF00` and `hsl(60, 100%, 50%)` will return **faulty result** because the **alpha parameter does not match**.

# Tips
> Each matcher demands accurate type of parameter value. The matcher check the `actual` and `expected` parameters' types before implementing the comparison and return false when value type is incorrect regardless the comparison result.

> Compared [HTML Element] and [HTML Text] Objects do not have to be appended to the DOM tree in order to use DOM custom matcher. The comparison can be implemented for dynamically created elements in `beforeEach()`, `beforeAll()` or `it()` scope.
Exception is `.toBeDocumentNode()` matcher which check if `actual` Object is appended to the DOM and `.toHaveComputedStyle()` `.toHaveComputedColor()` matchers which require the [HTML Element] Object to be appended to the DOM in order to return the expected computed style

>In order to check whether two HTML Objects are the same objects use the native matcher `expect(objectA).toBe(objectB)`

>In order to check whether two HTML Objects are equal objects use the native matcher `expect(objectA).toEqual(objectB)`

# Implementation

#### 1. Download *DOMCustomMatchers.js* file and add it to your HTML file.
```html
<script type="text/javascript" src="jasmine/lib/DOMCustomMatchers.js"></script>
```
> **Any outer libraries needed**. It is a fully JavaScript library.

#### 2. Register the DOMCustomMatchers with Jasmine in each suit you want them to use.
```javascript
describe("The new DIV element", function() {
    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
        this.newDiv = document.createElement('DIV');
    });
    it("should be empty.", function() {
        expect(this.newDiv).toBeEmpty();
    });
}
```

# Usage
* visit [sample site](https://devrafalko.github.io/jasmine-DOM-custom-matchers/tests/jasmineRunner.html) and consider jasmine passed specs section (you can see how DOM custom matchers can be used)
* consider the [HTML source](https://github.com/devrafalko/jasmine-DOM-custom-matchers/blob/master/tests/jasmineRunner.html) with the login panel sample
* consider the [&lt;style&gt; section](https://github.com/devrafalko/jasmine-DOM-custom-matchers/blob/master/tests/jasmineRunner.html) with CSS styles for login panel
* consider the [tests.js](https://github.com/devrafalko/jasmine-DOM-custom-matchers/blob/master/tests/spec/tests.js) source to figure out how matchers were implemented

# License
Released under the MIT license.
>Copyright (c) 2016 Paweł Rafałko dev.rafalko@gmail.com

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice **shall be included** in all
copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.