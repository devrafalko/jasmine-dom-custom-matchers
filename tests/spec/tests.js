/* global expect, DOMCustomMatchers */

describe("DOM Custom Matchers",function(){
	beforeAll(function(){
		jasmine.addMatchers(DOMCustomMatchers);
		this.form = document.getElementById('form');
		this.fieldset = document.getElementById('fieldset');
		this.legend = document.getElementById('legend');
		this.ul = document.getElementById('ul');
		this.liA = document.getElementById('liA');
		this.liB = document.getElementById('liB');
		this.liC = document.getElementById('liC');
		this.emailSpan = document.getElementById('emailSpan');
		this.emailText = this.emailSpan.childNodes[0];
		this.emailInput = document.getElementById('emailInput');
		this.passwordSpan = document.getElementById('passwordSpan');
		this.passwordText = this.passwordSpan.childNodes[0];
		this.passwordInput = document.getElementById('passwordInput');
		this.submit = document.getElementById('submit');
		
		this.virtualDiv = document.createElement('DIV');
		this.virtualParagraph = document.createElement('P');
		this.virtualNextParagraph = document.createElement('P');
		this.virtualQuote = document.createElement('BLOCKQUOTE');
		this.virtualTextNode = document.createTextNode("hello world, I'm a virtual sample of text");
		this.virtualDiv.appendChild(this.virtualParagraph);
		this.virtualDiv.appendChild(this.virtualNextParagraph);
		this.virtualParagraph.appendChild(this.virtualQuote);
		this.virtualQuote.appendChild(this.virtualTextNode);
		this.virtualDiv.setAttribute('class','virtual');
	});

	describe("toBeHTMLElement()",function(){
		it("The form and fieldset of login panel should be [HTML Element] Objects",function(){
			expect(this.form).toBeHTMLElement();
			expect(this.fieldset).toBeHTMLElement();
		});

		it("[HTML Text] Nodes should not be [HTML Element] Objects",function(){
			expect(this.emailText).not.toBeHTMLElement();
			expect(this.passwordText).not.toBeHTMLElement();
		});
		
		it("dynamically created [HTML Element] Objects should be [HTML Element] Objects",function(){
			expect(this.virtualDiv).toBeHTMLElement();
			expect(this.virtualQuote).toBeHTMLElement('blockquote');
		});
		
		it("dynamically created [HTML Text] Objects should not be [HTML Element] Objects",function(){
			expect(this.virtualTextNode).not.toBeHTMLElement();
		});

		it("<fieldset> first element should not be <li> element, it should be <legend>",function(){
			expect(this.fieldset.children[0]).not.toBeHTMLElement('li');
			expect(this.fieldset.children[0]).toBeHTMLElement('legend');
		});

		it("<ul> children should be <li> elements",function(){
			expect(this.ul.children[0]).toBeHTMLElement('<li>');
			expect(this.ul.children[1]).toBeHTMLElement('  li  ');
			expect(this.ul.children[2]).toBeHTMLElement('li');
		});

		it("<span> content should not be any HTML Element",function(){
			expect(this.emailSpan.childNodes[0]).not.toBeHTMLElement();
			expect(this.passwordSpan.childNodes[0]).not.toBeHTMLElement();
		});

		it("incorrect expected parameter's type should be ignored as if it was not passed",function(){
			expect(this.form).toBeHTMLElement(['i','am','incorrect','type']);
			expect(this.emailText).not.toBeHTMLElement(100);
		});
	});

	describe("toBeHTMLText()",function(){
		it("DOM [HTML Text] descendants should be [HTML Text] Objects",function(){
			expect(this.emailText).toBeHTMLText();
			expect(this.passwordText).toBeHTMLText();
		});

		it("DOM [HTML Element] descendants should not be [HTML Text] Objects",function(){
			expect(this.form).not.toBeHTMLText();
			expect(this.passwordInput).not.toBeHTMLText();
		});

		it("dynamically created [HTML Text] Objects should be [HTML Text] Objects",function(){
			expect(this.virtualTextNode).toBeHTMLText();
		});

		it("<span>s' content should be [HTML Text] Objects",function(){
			expect(this.emailSpan.childNodes[0]).toBeHTMLText();
			expect(this.passwordSpan.childNodes[0]).toBeHTMLText();
		});

		it("email <span> content should be 'Email:'",function(){
			expect(this.emailText).toBeHTMLText('Email:');
			expect(this.emailText).not.toBeHTMLText('different content');
		});
		
		it("email <span> content should contain 'email'",function(){
			expect(this.emailText).toBeHTMLText(/email/i);
		});

		it("password <span> content should be 'Password:'",function(){
			expect(this.passwordText).toBeHTMLText('Password:');
		});

		it("email and password <span> content should end with colon",function(){
			expect(this.emailText).toBeHTMLText(/\x3A$/);
			expect(this.passwordText).toBeHTMLText(/\x3A$/);
		});

		it("the legend content of fieldset should not be empty",function(){
			expect(this.legend.childNodes[0]).toBeHTMLText();
			expect(this.legend.childNodes[0]).toBeHTMLText(/\S+/);
			expect(this.legend.childNodes[0]).toBeHTMLText(/\w+/);
		});

		it("incorrect expected parameter's type should be ignored as if it was not passed",function(){
			expect(this.emailText).toBeHTMLText(100);
			expect(this.passwordText).toBeHTMLText(null);
		});
	});

	describe("toBeDocumentNode()",function(){
		it("<html> <head> and <body> should be a part of DOM Tree",function(){
			expect(document.documentElement).toBeDocumentNode();
			expect(document.body).toBeDocumentNode();
			expect(document.head).toBeDocumentNode();
		});
		it("form, fieldset and inputs should be appended as a part of login panel",function(){
			expect(this.form).toBeDocumentNode();
			expect(this.fieldset).toBeDocumentNode();
			expect(this.emailInput).toBeDocumentNode();
			expect(this.passwordInput).toBeDocumentNode();
		});
		it("password and email descriptions of inputs should be a part of DOM",function(){
			expect(this.emailText).toBeDocumentNode();
			expect(this.passwordText).toBeDocumentNode();
		});
		it("dynamically created (but not appended) [HTML Element] Objects should not be the DOM Nodes",function(){
			expect(this.virtualDiv).not.toBeDocumentNode();
			expect(this.virtualParagraph).not.toBeDocumentNode();
			expect(this.virtualQuote).not.toBeDocumentNode();
		});
		
		it("dynamically created (but not appended) [HTML Text] Objects should not be the DOM Nodes",function(){
			expect(this.virtualTextNode).not.toBeDocumentNode();
		});
	});

	describe("toContainHTMLElement()",function(){
		it("<html> should contain <body> element",function(){
			expect(document.documentElement).toContainHTMLElement(document.body);
		});

		it("<body> should not contain <html> element",function(){
			expect(document.body).not.toContainHTMLElement(document.documentElement);
		});

		it("<html> should contain farther descendats",function(){
			expect(document.documentElement).toContainHTMLElement(this.form);
			expect(document.documentElement).toContainHTMLElement(this.fieldset);
			expect(document.documentElement).toContainHTMLElement(this.liC);
			expect(document.documentElement).toContainHTMLElement(this.passwordInput);
		});

		it("incorrect expected parameter's type should throw faulty result",function(){
			expect(this.form).not.toContainHTMLElement(this.emailText);
			expect(this.form).not.toContainHTMLElement();
			expect(this.emailSpan).not.toContainHTMLElement(123);
			expect(this.emailSpan).not.toContainHTMLElement(null);
			expect(this.emailSpan).not.toContainHTMLElement([1,2,3]);
		});

		it("dynamically created [HTML Element] Object should contain another dynamically created [HTML Element] Object",function(){
			expect(this.virtualDiv).toContainHTMLElement(this.virtualParagraph);
			expect(this.virtualDiv).toContainHTMLElement(this.virtualQuote);
		});

		it("[HTML Element] Object should not contain itself",function(){
			expect(this.form).not.toContainHTMLElement(this.form);
			expect(this.virtualDiv).not.toContainHTMLElement(this.virtualDiv);
		});

		it("<form> should contain 3 <li> descendants",function(){
			expect(this.form).toContainHTMLElement(this.liA);
			expect(this.form).toContainHTMLElement(this.liB);
			expect(this.form).toContainHTMLElement(this.liC);
		});
	});

	describe("toContainText()",function(){
		it("I don't know where exactly but <form> should contain 'Email:' in some of its descendant",function(){
			expect(this.form).toContainText('Email:');
			expect(this.form).toContainText(/email/i);
			expect(this.form).toContainText(/Email/);
		});

		it("dynamically created [HTML Element] Object should contain particular text",function(){
			expect(this.virtualDiv).toContainText("hello world, I'm a virtual sample of text");
			expect(this.virtualParagraph).toContainText('hello');
			expect(this.virtualQuote).toContainText('world');
			expect(this.virtualQuote).toContainText('virtual sample');
			expect(this.virtualQuote).toContainText(/\w+/);
		});

		it("email <span> should not contain 'password' text",function(){
			expect(this.emailSpan).not.toContainText(/password/i);
		});

		it("<span> elements should contain any text content",function(){
			expect(this.emailSpan).toContainText(/.+/);
			expect(this.passwordSpan).toContainText(/.+/);
		});
	});

	describe("toBeChildOf()",function(){
		it("<body> should be a child of <html>",function(){
			expect(document.body).toBeChildOf(document.documentElement);
		});
		
		it("<html> should not be a child of <body>",function(){
			expect(document.documentElement).not.toBeChildOf(document.body);
		});
		
		it("Text nodes should be children of <span> elements",function(){
			expect(this.emailText).toBeChildOf(this.emailSpan);
			expect(this.passwordText).toBeChildOf(this.passwordSpan);
		});
		
		it("farther descendat should not be a child of farther ascendant [HTML Element] Object",function(){
			expect(this.emailSpan).not.toBeChildOf(this.form);
			expect(this.liA).not.toBeChildOf(this.form);
			expect(this.ul).not.toBeChildOf(this.form);
			expect(this.fieldset).toBeChildOf(this.form);
		});
		
		it("[HTML Text] Object should be a child of its [HTML Element] parent",function(){
			expect(this.emailText).toBeChildOf(this.emailSpan);
			expect(this.passwordText).toBeChildOf(this.passwordSpan);
			expect(this.virtualTextNode).toBeChildOf(this.virtualQuote);
		});
		
		it("[HTML Element] or [HTML Text] Object should not be a child of itselt",function(){
			expect(this.emailText).not.toBeChildOf(this.emailText);
			expect(this.virtualTextNode).not.toBeChildOf(this.virtualTextNode);
			expect(this.ul).not.toBeChildOf(this.ul);
		});

		it("dynamically created [HTML Element] or [HTML Text] Object should be a child of its dynamically created [HTML Element] parent",function(){
			expect(this.virtualParagraph).toBeChildOf(this.virtualDiv);
			expect(this.virtualQuote).toBeChildOf(this.virtualParagraph);
			expect(this.virtualTextNode).toBeChildOf(this.virtualQuote);
		});		
		
		it("incorrect parameters' types should throw faulty result",function(){
			expect("some text").not.toBeChildOf(this.emailText);
			expect().not.toBeChildOf();
			expect(123).not.toBeChildOf(null);
		});
	});

	describe("toBeNthChild()",function(){
		it("inputs should be the second node of its parent elements",function(){
			expect(this.emailInput).toBeNthChild(1);
			expect(this.passwordInput).toBeNthChild(1);
		});
		
		it("<head> should be first and <body> should be last element of <html> element",function(){
			expect(document.head).toBeNthChild(0);
			expect(document.body).toBeNthChild('last');
		});
		
		it("<legend> should be first child of <fieldset> element",function(){
			expect(this.legend).toBeNthChild(0);
		});
		
		it("dynamically created one and only [HTML Element] child node should be first and last child of its parent element",function(){
			expect(this.virtualQuote).toBeNthChild(0);
			expect(this.virtualQuote).toBeNthChild('last');
		});
		
		it("test for <html> should throw faulty result because <html> has not got its [HTML Element] parent",function(){
			expect(document.head).toBeNthChild(0);
			expect(document.body).toBeNthChild('last');
		});
		
		it("test for dynamically created and not appended [HTML Element] node should throw faulty result because it has not got its [HTML Element] parent",function(){
			expect(this.virtualDiv).not.toBeNthChild(0);
			expect(this.virtualDiv).not.toBeNthChild(1);
			expect(this.virtualDiv).not.toBeNthChild(2);
			expect(this.virtualDiv).not.toBeNthChild(3);
		});
	});
	
	describe("toBeParentOf()",function(){
		it("<fieldset> should be a parent of <legend> and <ul>",function(){
			expect(this.fieldset).toBeParentOf(this.legend);
			expect(this.fieldset).toBeParentOf(this.ul);
		});
		
		it("<html> should be a parent of <body>",function(){
			expect(document.documentElement).toBeParentOf(document.body);
		});
		
		it("<body> should not be a parent of <html>",function(){
			expect(document.body).not.toBeParentOf(document.documentElement);
		});
		
		it("farther ascendant should not be a parent of farther descendat [HTML Element] or [HTML Text] Object",function(){
			expect(this.virtualParagraph).not.toBeParentOf(this.virtualTextNode);
			expect(this.form).not.toBeParentOf(this.ul);
		});
		
		it("[HTML Text] Object should not be a parent of any HTML Object",function(){
			expect(this.passwordText).not.toBeParentOf("some text");
			expect(this.virtualTextNode).not.toBeParentOf(this.virtualQuote);
		});
		
		it("[HTML Element] or [HTML Text] Object should not be a parent of itselt",function(){
			expect(this.virtualParagraph).not.toBeParentOf(this.virtualParagraph);
			expect(document.body).not.toBeParentOf(document.body);
			expect(this.fieldset).not.toBeParentOf(this.fieldset);
		});
		
		it("dynamically created [HTML Element] Object should be a parent of its dynamically created [HTML Element] or [HTML Text] children",function(){
			expect(this.virtualDiv).toBeParentOf(this.virtualParagraph);
			expect(this.virtualParagraph).toBeParentOf(this.virtualQuote);
			expect(this.virtualQuote).toBeParentOf(this.virtualTextNode);
		});			
		
		it("incorrect parameters' types should throw faulty result",function(){
			expect(this.passwordText).not.toBeParentOf("some text");
			expect(String).not.toBeParentOf("abcd");
			expect().not.toBeParentOf();			
		});
	});

	describe("toHaveSameParent()",function(){
		it("<body> and <head> should have the same <html> parent",function(){
			expect(document.body).toHaveSameParent(document.head);
		});
		
		it("all <li> elements should have the same <ul> parent",function(){
			expect(this.liA).toHaveSameParent(this.liB);
			expect(this.liB).toHaveSameParent(this.liC);
			expect(this.liC).toHaveSameParent(this.liA);
		});
		
		it("email and password inputs and its <span> descriptions should be placed in the same <li> parent",function(){
			expect(this.emailSpan).toHaveSameParent(this.emailInput);
			expect(this.passwordSpan).toHaveSameParent(this.passwordInput);
		});
		
		it("<legend> and <ul> should be placed in the same <fieldset> parent",function(){
			expect(this.legend).toHaveSameParent(this.ul);
		});
		
		it("email input, password input and submit button should be placed in different <li> elements",function(){
			expect(this.emailInput).not.toHaveSameParent(this.passwordInput);
			expect(this.passwordInput).not.toHaveSameParent(this.submit);
			expect(this.submit).not.toHaveSameParent(this.emailInput);
		});
		
		it("dynamically created [HTML Element] siblings should have the same dynamically created [HTML Element] parent",function(){
			expect(this.virtualParagraph).toHaveSameParent(this.virtualNextParagraph);
		});
		
		it("Two [HTML Text] sibling nodes should have the same [HTML Element] parent",function(){
			var container = document.createElement('P');
			var textA = document.createTextNode('Hello ');
			var textB = document.createTextNode('World!');
			container.appendChild(textA);
			container.appendChild(textB);
			expect(textA).toHaveSameParent(textB);
		});
	});

	describe("toHaveChildren()",function(){
		it("<ul> should have any children",function(){
			expect(this.ul).toHaveChildren();
		});
		
		it("<ul> should have 3 children",function(){
			expect(this.ul).toHaveChildren(3);
		});
		
		it("<ul> should have less than 4 children",function(){
			expect(this.ul).toHaveChildren(4,'less than');
		});
		
		it("<ul> should have more than 2 children",function(){
			expect(this.ul).toHaveChildren(2,'more than');
		});
		
		it("<ul> should have 3 children or less",function(){
			expect(this.ul).toHaveChildren(3,'or less');
			expect(this.ul).toHaveChildren(3,'orless');
			expect(this.ul).toHaveChildren(3,'orLess');
		});
		
		it("<ul> should have 3 children or more",function(){
			expect(this.ul).toHaveChildren(3,'or more');
		});
		
		it("<ul> should not have 5 children",function(){
			expect(this.ul).not.toHaveChildren(5);
		});
		
		it("<span> elements should not have any children",function(){
			expect(this.emailSpan).toHaveChildren(0);
			expect(this.emailSpan).not.toHaveChildren();
		});
		
		it("[HTML Text] Object should not be considered to be children",function(){
			expect(this.emailSpan).not.toHaveChildren();
			expect(this.emailSpan).toHaveChildren(0);
			expect(this.virtualQuote).not.toHaveChildren();
			expect(this.virtualQuote).toHaveChildren(0);
		});
		
		it("dynamically created [HTML Element] Object with dynamically created [HTML Element] children should have children",function(){
			expect(this.virtualDiv).toHaveChildren();
			expect(this.virtualParagraph).toHaveChildren();
			expect(this.virtualQuote).not.toHaveChildren();
		});
		
		it("[HTML Text] Object cannot have any children",function(){
			expect(this.emailText).not.toHaveChildren();
			expect(this.virtualText).not.toHaveChildren();			
		});
	});
	
	describe("toBeNextSiblingOf()",function(){
		it("<body> should be next sibling of <head>",function(){
			expect(document.body).toBeNextSiblingOf(document.head);
		});
		
		it("<legend> should be placed before the list of inputs <ul>",function(){
			expect(this.ul).toBeNextSiblingOf(this.legend);
		});
		
		it("password input box should be preceded by email input box",function(){
			expect(this.liB).toBeNextSiblingOf(this.liA);
		});
		
		it("submit button box should be preceded by password input box",function(){
			expect(this.liC).toBeNextSiblingOf(this.liB);
		});
		
		it("submit button box should not be the next sibling of email box",function(){
			expect(this.liC).not.toBeNextSiblingOf(this.liA);
		});
		
		it("password and email input element should be preceded by <span> element",function(){
			expect(this.passwordInput).toBeNextSiblingOf(this.passwordSpan);
			expect(this.emailInput).toBeNextSiblingOf(this.emailSpan);
		});
		
		it("dynamically created [HTML Element] should be next sibling of another dynamically created [HTML Element]",function(){
			expect(this.virtualNextParagraph).toBeNextSiblingOf(this.virtualParagraph);
		});
	});

	describe("toBePreviousSiblingOf()",function(){
		it("<head> should be previous sibling of <body>",function(){
			expect(document.head).toBePreviousSiblingOf(document.body);
		});
		
		it("the list of inputs <ul> should be placed before <legend>",function(){
			expect(this.legend).toBePreviousSiblingOf(this.ul);
		});
		
		it("email input box should be preceded by password input box",function(){
			expect(this.liA).toBePreviousSiblingOf(this.liB);
		});
		
		it("password input box should be preceded by submit button box",function(){
			expect(this.liB).toBePreviousSiblingOf(this.liC);
		});
		
		it("email box should not be the previous sibling of submit button box",function(){
			expect(this.liA).not.toBePreviousSiblingOf(this.liC);
		});

		it("<span> elements shoud be preceded by password and email input elements",function(){
			expect(this.passwordSpan).toBePreviousSiblingOf(this.passwordInput);
			expect(this.emailSpan).toBePreviousSiblingOf(this.emailInput);
		});
		
		it("dynamically created [HTML Element] should be previous sibling of another dynamically created [HTML Element]",function(){
			expect(this.virtualParagraph).toBePreviousSiblingOf(this.virtualNextParagraph);
		});
	});

	describe("toBeEmpty()",function(){
		it("<legend> should not be empty (should contain textNode)",function(){
			expect(this.legend).not.toBeEmpty();
		});
		
		it("span elements should not be empty (should contain textNode)",function(){
			expect(this.emailSpan).not.toBeEmpty();
			expect(this.passwordSpan).not.toBeEmpty();
		});
		
		it("dynamically created [HTML Element] without any node appended should be empty",function(){
			this.virtualBox = document.createElement('DIV');
			expect(this.virtualBox).toBeEmpty();
		});
		
		it("dynamically created [HTML Element] with node appended should not be empty",function(){
			expect(this.virtualDiv).not.toBeEmpty();
			expect(this.virtualParagraph).not.toBeEmpty();
			expect(this.virtualQuote).not.toBeEmpty();
		});
		
		it("incorrect parameter' type should throw faulty result",function(){
			expect(123).not.toBeEmpty();
			expect(this.virtualTextNode).not.toBeEmpty();			
			expect(this.emailText).not.toBeEmpty();			
		});
	});

	describe("toHaveAnyAttribute()",function(){
		it("<head> element should not have any attribute",function(){
			expect(document.head).not.toHaveAnyAttribute();
		});		
		it("<form> <fieldset> and <li> elements should have some attributes defined",function(){
			expect(this.form).toHaveAnyAttribute();
			expect(this.fieldset).toHaveAnyAttribute();
			expect(this.liA).toHaveAnyAttribute();
			expect(this.liB).toHaveAnyAttribute();
			expect(this.liC).toHaveAnyAttribute();
		});	
		
		it("dynamically created [HTML Element] should also have some attributes",function(){
			expect(this.virtualDiv).toHaveAnyAttribute();
		});
		
		it("[HTML Text] nodes should throw faulty result when tested",function(){
			expect(this.virtualTextNode).not.toHaveAnyAttribute();
			expect(this.passwordText).not.toHaveAnyAttribute();
		});	
	});

	describe("toHaveAttribute()",function(){
		it("<form> should have id='form' attribute defined",function(){
			expect(this.form).toHaveAttribute('id','form');
		});
		
		it("<form> should not have method attribute of value 'post'",function(){
			expect(this.form).not.toHaveAttribute('method','post');
		});

		it("email and password input elements should have type='text' attribute defined",function(){
			expect(this.emailInput).toHaveAttribute('type','text');
			expect(this.passwordInput).toHaveAttribute('type','text');
		});

		it("email and password input elements should have placeholder attribute defined with some text",function(){
			expect(this.emailInput).toHaveAttribute('placeholder',/.+/);
			expect(this.passwordInput).toHaveAttribute('placeholder',/.+/);
		});

		it("<li> elements' id attributes should begin with 'li'",function(){
			expect(this.liA).toHaveAttribute('id',/li\w+/);
			expect(this.liB).toHaveAttribute('id',/li\w+/);
			expect(this.liC).toHaveAttribute('id',/li\w+/);
		});

		it("submit element should be of type submit, should be disabled and have value='Login'",function(){
			expect(this.submit).toHaveAttribute('disabled');
			expect(this.submit).toHaveAttribute('type','submit');
			expect(this.submit).toHaveAttribute('value',/login/i);
		});

		it("password input element should be readonly",function(){
			expect(this.passwordInput).toHaveAttribute('readonly',/(true|.{0})/);
		});
		
		it("password input element's name attribute should be defined but should not have value 'email'",function(){
			expect(this.passwordInput).toHaveAttribute('name');
			expect(this.passwordInput).not.toHaveAttribute('name',"email");
		});	
		
		it("email input element's name attribute should be defined but should not have value 'password'",function(){
			expect(this.emailInput).toHaveAttribute('name');
			expect(this.emailInput).not.toHaveAttribute('name',"password");
		});	

		it("email input element should not be readonly",function(){
			expect(this.emailInput).not.toHaveAttribute('readonly');
		});	

		it("form element should have class attribute of the value containing three classes",function(){
			expect(this.form).toHaveAttribute('class',/(^classA$|^classA\s+|\s+classA\s+|\s+classA$)/);
			expect(this.form).toHaveAttribute('class',/(^classB$|^classB\s+|\s+classB\s+|\s+classB$)/);
			expect(this.form).toHaveAttribute('class',/(^classC$|^classC\s+|\s+classC\s+|\s+classC$)/);
		});	
		
		it("dynamically created [HTML Element] with class attribute defined should have class",function(){
			expect(this.virtualDiv).toHaveAttribute('class');
			expect(this.virtualDiv).toHaveAttribute('class','virtual');
		});		
	});

	describe("toHaveClass()",function(){
		it("form element should have 'classA', 'classB' and 'classC' classes",function(){
			expect(this.form).toHaveClass('classA');
			expect(this.form).toHaveClass('classB');
			expect(this.form).toHaveClass('classC');
		});
		
		it("form element should not have 'classD' class",function(){
			expect(this.form).not.toHaveClass('classD');
		});
		
		it("dynamically created [HTML Element] with class attribute defined should have class",function(){
			expect(this.virtualDiv).toHaveClass('virtual');
		});			
	});
	
	describe("toHaveComputedStyle()",function(){
		it("form element should have display style of value block or inline-block",function(){
			expect(this.form).toHaveComputedStyle('display',/block$/);
		});
		
		it("submit element should be aligned to the center",function(){
			expect(this.liC).toHaveComputedStyle('text-align','center');
		});
		
		it("li elements should be of display list-item",function(){
			expect(this.liA).toHaveComputedStyle('display','list-item');
			expect(this.liB).toHaveComputedStyle('display','list-item');
			expect(this.liC).toHaveComputedStyle('display',/list-item/);
		});
		
		it("submit button should be centered",function(){
			expect(this.liC).toHaveComputedStyle('textAlign','center');
		});
		
		it("the fieldset should have rounded corners",function(){
			expect(this.fieldset).toHaveComputedStyle('borderTopRightRadius','8px');
			expect(this.fieldset).toHaveComputedStyle('borderTopLeftRadius','8px');
			expect(this.fieldset).toHaveComputedStyle('borderBottomRightRadius','8px');
			expect(this.fieldset).toHaveComputedStyle('borderBottomLeftRadius','8px');
		});
		
		it("each element should have the same font-family value",function(){
			var font = /"Raleway"|Raleway/;
			expect(this.form).toHaveComputedStyle('font-family',font);
			expect(this.fieldset).toHaveComputedStyle('font-family',font);
			expect(this.liA).toHaveComputedStyle('font-family',font);
			expect(this.submit).toHaveComputedStyle('font-family',font);
			expect(this.passwordInput).toHaveComputedStyle('font-family',font);
			expect(this.emailInput).toHaveComputedStyle('font-family',font);
		});
		
		it("the borders of infput fields should be orange",function(){
			expect(this.passwordInput).toHaveComputedStyle('borderTopColor','rgb(247, 141, 74)');
			expect(this.passwordInput).toHaveComputedStyle('borderBottomColor','rgb(247, 141, 74)');
			expect(this.passwordInput).toHaveComputedStyle('border-left-color','rgb(247, 141, 74)');
			expect(this.passwordInput).toHaveComputedStyle('border-right-color','rgb(247, 141, 74)');
			expect(this.emailInput).toHaveComputedStyle('borderTopColor','rgb(247, 141, 74)');
			expect(this.emailInput).toHaveComputedStyle('borderBottomColor','rgb(247, 141, 74)');
			expect(this.emailInput).toHaveComputedStyle('border-left-color','rgb(247, 141, 74)');
			expect(this.emailInput).toHaveComputedStyle('border-right-color','rgb(247, 141, 74)');
		});
		
		it("the submit box-shadow should be lightly transparent",function(){
			expect(this.submit).toHaveComputedStyle('box-shadow',/rgba/);
		});
		
		it("the input box-shadows should be inset",function(){
			expect(this.emailInput).toHaveComputedStyle('box-shadow',/inset/);
			expect(this.passwordInput).toHaveComputedStyle('boxShadow',/inset/);
		});
	});
	
	describe("toHaveComputedColor()",function(){
		it("the background of form should be of light grey color",function(){
			expect(this.form).toHaveComputedColor('backgroundColor','rgb(245,245,245)');
			expect(this.form).toHaveComputedColor('backgroundColor','rgba(245, 245, 245, 1)');
			expect(this.form).toHaveComputedColor('backgroundColor','rgba(245, 245, 245, 1.000)');
			expect(this.form).toHaveComputedColor('backgroundColor','  rgb( 245,   245,  245)   ');
			expect(this.form).toHaveComputedColor('background-color','#F5F5F5');
			expect(this.form).toHaveComputedColor('background-color','hsl(0,0%,96.1%)');
		});
		
		it("the shadow of fieldset should be of grey color darker than form background",function(){
			expect(this.fieldset).toHaveComputedColor('box-shadow','rgba(115,115,115,.15)');
			expect(this.fieldset).toHaveComputedColor('box-shadow','hsla(0,0%,45.1%,.15)');
			expect(this.fieldset).not.toHaveComputedColor('box-shadow','hsl(0,0%,45.1%)');
		});
		
		it("the submit button should not be transparent",function(){
			expect(this.submit).toHaveComputedColor('background-color','#F7721F');
			expect(this.submit).toHaveComputedColor('backgroundColor','rgb(247,114,31)');
			expect(this.submit).toHaveComputedColor('backgroundColor','rgba(247,114,31,1)');
			expect(this.submit).toHaveComputedColor('backgroundColor','hsl(23,93.1%,54.5%)');
			expect(this.submit).toHaveComputedColor('backgroundColor','hsla(23,93.1%,54.5%,1)');
		});
		
	});

});









