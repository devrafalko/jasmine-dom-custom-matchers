var DOMCustomMatchers = {};

jasmine.matchersUtil.is = function(getObject,getType){
	if(getObject===null||typeof getObject==="undefined") return false;
	return getObject.constructor.toString().toLowerCase().search(getType.toLowerCase())>=0;
};

jasmine.matchersUtil.isHTML = function(getElem){
	if(getElem===null||typeof getElem==="undefined") return false;
	return this.is(getElem,"html")&&this.is(getElem,"element");	
};

jasmine.matchersUtil.getType = function(getValue){
	return getValue===null ? 'null':typeof getValue==="undefined" ? 'undefined':getValue.constructor.name;
};

jasmine.matchersUtil.shortenStr = function(getValue){
	return getValue.length>50 ? getValue.slice(0,50)+"...":getValue;
};





DOMCustomMatchers.toBeHTMLElement = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual);
			var isExpectedString = util.is(expected,'String');
			var parseExpected = isExpectedString ? expected.replace(/\W/g,''):'';
			var getName = isExpectedString&&parseExpected!=='';
			var nameCondition = typeCondition && getName ? actual.nodeName===parseExpected.toUpperCase():true;
			var messageElement = getName ? '<'+parseExpected.toLowerCase()+'>':'HTML';
			return {
				pass:typeCondition&&nameCondition,
				message:typeCondition&&nameCondition ? "Expected " + util.getType(actual) + " not to be a " + messageElement + " Element.":
									"Expected " + util.getType(actual) + " to be a " + messageElement + " Element."
			};
		}
	};
};

DOMCustomMatchers.toBeHTMLText = function(util){
	return {
		compare:function(actual,value){
			var isActual = util.is(actual,'text');
			var isValueString = util.is(value,'string');
			var isValueRegExp = util.is(value,'regexp');
			var containText = !isActual ? true:isValueString ? actual.textContent===value:isValueRegExp ? Boolean(actual.textContent.match(value)):true;
			var returnText = isActual&&isValueString ? " containing the content '" + util.shortenStr(value) + "'.":isActual&&isValueRegExp ? " of the content that matches regular expression "+value+".":".";
			return {
				pass:isActual&&containText,
				message:isActual&&containText ? "Expected " + util.getType(actual) + " not to be the [HTML Text] Object"+returnText:
									"Expected " + util.getType(actual) + " to be the [HTML Text] Object"+returnText
			};
		}
	};
};

DOMCustomMatchers.toBeDocumentNode = function(util){
	return {
		compare:function(actual){
			var typeCondition = util.isHTML(actual)||util.is(actual,'text');
			var isDOMNode = typeCondition ? document.documentElement.contains(actual):false;
			var returnDOM = typeCondition&&!isDOMNode ? " (not a document node)":"";
			return {
				pass:typeCondition&&isDOMNode,
				message:typeCondition&&isDOMNode ?	"Expected " + util.getType(actual) + returnDOM + " not to be the document node.":
													"Expected " + util.getType(actual) + returnDOM + " to be the document node."
			};
		}
	};
};

DOMCustomMatchers.toContainHTMLElement = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual) && util.isHTML(expected);
			var contains = typeCondition ? actual.contains(expected)&&actual!==expected:false;
			return {
				pass:typeCondition&&contains,
				message:typeCondition&&contains ?	"Expected " + util.getType(actual) + " not to contain " + util.getType(expected):
													"Expected " + util.getType(actual) + " to contain " + util.getType(expected)
			};
		}
	};
};

DOMCustomMatchers.toContainText = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual);
			var isStr = util.is(expected,'string');
			var isRegEx = util.is(expected,'regexp');
			var parsedActual = typeCondition ? actual.textContent.replace(/(\n|\t|\v)/g," ").replace(/\s\s+/g," ").replace(/^\s/,""):actual;
			var matchText = typeCondition&&(isStr||isRegEx) ? Boolean(parsedActual.match(expected)):false;
			var messageExpected = isStr ? "'"+util.shortenStr(expected)+"'":isRegEx ? "regular expression " + expected:util.getType(expected) + " while text or regular expression was expected.";
			return {
				pass:matchText,
				message:matchText ? "Expected " + util.getType(actual) + " not to contain " + messageExpected:
									"Expected " + util.getType(actual) + " to contain " + messageExpected
			};
		}
	};	
};

DOMCustomMatchers.toBeChildOf = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = (util.isHTML(actual)||util.is(actual,'text')) && util.isHTML(expected);
			var isChildOf = typeCondition ? actual.parentNode === expected:false;
			return {
				pass:typeCondition&&isChildOf,
				message:typeCondition&&isChildOf ?	"Expected " + util.getType(actual) + " not to be the child element of " + util.getType(expected):
													"Expected " + util.getType(actual) + " to be the child element of " + util.getType(expected)
			};
		}
	};
};

DOMCustomMatchers.toBeNthChild = function(util){
	return {
		compare:function(actual,index){
			var typeCondition = util.isHTML(actual);
			var isIndexNumber = util.is(index,'number') ? index>=0:false;
			var isIndexLast = util.is(index,'string') ? Boolean(index.match(/\s*last\s*/i)):false;
			var childObj = typeCondition ? util.isHTML(actual.parentNode) ? actual.parentNode.children:[]:[];
			var isPassed = !typeCondition ? false:isIndexNumber ? actual===childObj[index]:isIndexLast ? actual===childObj[childObj.length-1]:false;
			var actualIndex = findIndex();
			var mPosition = !typeCondition ? "":
					actualIndex===null ? 
						" while " + util.getType(actual) + " has not got parent Element":
						" while it is "+actualIndex+ending(actualIndex)+" child node of its parent Element";
			return {
				pass:isPassed,
				message:isPassed ? "Expected " + util.getType(actual) + " not to be " +index+ending(index)+" child node of its parent"+mPosition:
								   "Expected " + util.getType(actual) + " to be " +index+ending(index)+" child node of its parent"+mPosition
			};

				function findIndex(){
					for(var i=0;i<childObj.length;i++){
						if(actual===childObj[i]) return i;
					}
					return null;
				}
				
				function ending(num){
					return num === 1 ? "st":
						   num === 2 ? "nd":
						   num === 3 ? "rd":
						   typeof num === 'number' ? "th":
						   "";
				}
		}
	};
};

DOMCustomMatchers.toBeParentOf = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual) && (util.isHTML(expected)||util.is(expected,'text'));
			var isParentOf = typeCondition ? expected.parentElement === actual:false;
			return {
				pass:typeCondition&&isParentOf,
				message:typeCondition&&isParentOf ?	"Expected " + util.getType(expected) + " not to be the parent element of " + util.getType(actual):
													"Expected " + util.getType(expected) + " to be the parent element of " + util.getType(actual)
			};
		}
	};
};

DOMCustomMatchers.toHaveSameParent = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = (util.isHTML(actual)||util.is(actual,'text'))&&(util.isHTML(expected)||util.is(expected,'text'));
			var isPassed = typeCondition ? actual.parentNode === expected.parentNode:false;
			return {
				pass:isPassed,
				message:isPassed ? "Expected " + util.getType(actual) + " not to have the same parent as " + util.getType(expected):
								   "Expected " + util.getType(actual) + " to have the same parent as " + util.getType(expected)
			};
		}
	};
};

DOMCustomMatchers.toHaveChildren = function(util){
	return {
		compare:function(actual,expected,operator){
			var typeCondition = util.isHTML(actual);
			var getOperator;
			var hasOperator = [/\s*or\s*more\s*/i,/\s*or\s*less\s*/i,/\s*more\s*than\s*/i,/\s*less\s*than\s*/i].some(function(val,ind){
				var returned = typeof operator==='string' ? Boolean(operator.match(val)):false;
				getOperator = returned!==false ? ind:getOperator;
				return returned;
			});
			var isExpected = typeCondition ? util.is(expected,'Number')&&expected>=0:false;
			var isPassed = typeCondition ? isExpected ? checkEquality():actual.children.length>0:false;
			var mOperator = [' or more ',' or less','more than ','less than '];
			var mExpected = getOperator > 1 ? mOperator[getOperator]+expected:getOperator <=1 ? expected+mOperator[getOperator]:expected;
			var mNumber = isExpected ? mExpected + ' child node(s)':'any child node';
			var mCorrectNum = typeCondition ? " when it contains " + actual.children.length + " child node(s).":".";
			return {
				pass:isPassed,
				message:isPassed ?	"Expected " + util.getType(actual) + " not to contain " + mNumber + mCorrectNum:
													"Expected " + util.getType(actual) + " to contain " + mNumber + mCorrectNum
			};
			
				function checkEquality(){
					var l = actual.children.length, r = expected;
					if(!hasOperator) return l===r;
					if(getOperator===0) return l>=r;
					if(getOperator===1) return l<=r;
					if(getOperator===2) return l>r;
					if(getOperator===3) return l<r;
				}			
		}
	};
};

DOMCustomMatchers.toBeNextSiblingOf = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual)&&util.isHTML(expected);
			var getNextSibl = typeCondition ? expected.nextElementSibling:getNextSibl;
			var isPassed = typeCondition ? getNextSibl===actual:false;
			var actualSibl = getNextSibl ? " while next sibling is " + util.getType(getNextSibl):typeCondition ? " while " + util.getType(expected) + " has not got next sibling element":"";
			return {
				pass:isPassed,
				message:isPassed ? "Expected " + util.getType(actual) + " not to be next sibling of " + util.getType(expected):
								   "Expected " + util.getType(actual) + " to be next sibling of " + util.getType(expected)+actualSibl
			};
		}
	};
};

DOMCustomMatchers.toBePreviousSiblingOf = function(util){
	return {
		compare:function(actual,expected){
			var typeCondition = util.isHTML(actual)&&util.isHTML(expected);
			var getPrevSibl = typeCondition ? expected.previousElementSibling:getPrevSibl;
			var isPassed = typeCondition ? getPrevSibl===actual:false;
			var actualSibl = getPrevSibl ? " while previous sibling is " + util.getType(getPrevSibl):typeCondition ? " while " + util.getType(expected) + " has not got previous sibling element":"";
			return {
				pass:isPassed,
				message:isPassed ? "Expected " + util.getType(actual) + " not to be previous sibling of " + util.getType(expected):
								   "Expected " + util.getType(actual) + " to be previous sibling of " + util.getType(expected)+actualSibl
			};
		}
	};
};

DOMCustomMatchers.toHaveEventListener = function(util){
	return {
		compare:function(actual,expected){
			
			
			return {
				pass:true,
				message:""
			};
		}
	};
};

DOMCustomMatchers.toHaveAttributes = function(util){
	return {
		compare:function(actual,expected){
			
			
			return {
				pass:true,
				message:""
			};
		}
	};
};

DOMCustomMatchers.toBeEmpty = function(util){
	return {
		compare:function(actual){
			var typeCondition = util.isHTML(actual);
			var getNodes = typeCondition ? actual.childNodes:[];
			var arrayNodes = [];
			for(var i=0;i<getNodes.length;i++){
				if(util.isHTML(getNodes[i])){
					if(getNodes[i].nodeName!=="BR"&&getNodes[i].nodeName!=="WBR") arrayNodes.push(getNodes[i]);
				}
				if(getNodes[i].nodeName==='#text'){
					if(getNodes[i].textContent.replace(/(\s|\n|\t|\v)/g,"").length) arrayNodes.push(getNodes[i]);
				}
			}
			var isEmpty = !arrayNodes.length;
			return {
				pass:typeCondition&&isEmpty,
				message:typeCondition&&isEmpty ? "Expected " + util.getType(actual) + " not to be empty.":
									"Expected " + util.getType(actual) + " to be empty."
			};
		}
	};		
};

DOMCustomMatchers.toHaveAttribute = function(util){
	return {
		compare:function(actual,attr,val){
			var typeCondition = util.isHTML(actual);
			var isAttrString = util.is(attr,'string');
			var hasAttr = typeCondition&&isAttrString ? actual.hasAttribute(attr):false;
			var isValString = util.is(val,'string');
			var isValRegEx = util.is(val,'regex');
			var attrType = isAttrString ? "'"+attr+"'":'of type '+util.getType(attr);
			var hasValue = !hasAttr ? false:typeof val==="undefined" ? true:isValString ? actual.getAttribute(attr)===val:isValRegEx ? Boolean(actual.getAttribute(attr).match(val)):true;
			var valMessage = isValString ? " of '"+ val + "' value ": isValRegEx ? " of value matched regular expression "+val:" ";
			return {
				pass:hasAttr&&hasValue,
				message:hasAttr&&hasValue ? "Expected "+util.getType(actual)+" not to have an attribute "+attrType+valMessage+" specified.":
											"Expected "+util.getType(actual)+" to have an attribute "+attrType+valMessage+" specified."
			};
		}
	};
};

DOMCustomMatchers.toHaveClass = function(util){
	return {
		compare:function(actual,val){
			var typeCondition = util.isHTML(actual);
			var isValString = util.is(val,'string');
			var hasClass = typeCondition&&isValString ? hasClass(actual):false;
			var returnVal = isValString ? "'"+val+"'":"of type "+util.getType(val);
			return {
				pass:hasClass,
				message:hasClass ?	"Expected "+util.getType(actual)+" not to have class " + returnVal +".":
									"Expected "+util.getType(actual)+" to have class " + returnVal +"."
			};
				function hasClass(elem){
					var getClassAttr = elem.getAttribute('class');
					var createArray = getClassAttr!==null&&getClassAttr.replace(/\s\s+/g,"")!=="" ? getClassAttr.split(" "):[];
					var hasClass = createArray.some(function(curr){return curr===val;});
					return hasClass;
				}
		}
	};
};

DOMCustomMatchers.toHaveComputedStyle = function(util){
	return {
		compare:function(actual,prop,val){
			var typeCondition = util.isHTML(actual);
			var isDOM = typeCondition ? document.documentElement.contains(actual)&&document.documentElement!==actual:false;
			var isPropString = util.is(prop,'string');
			var hyphenProp = isPropString ? prop.replace(/[A-Z]/g,function(g){return '-'+g.toLowerCase();}):prop;
			var camelProp = isPropString ? prop.replace(/\x2D\w/g,function(g){return g[1].toUpperCase();}):prop;
			var isValString = util.is(val,'string');
			var isValRegExp = util.is(val,'regexp');
			var CSSObj = typeCondition&&isDOM&&isPropString ? window.getComputedStyle(actual,null):CSSObj;
			var isPropDefined = CSSObj ? typeof CSSObj[camelProp]!=='undefined':false;
			var getComputed = CSSObj ? CSSObj.getPropertyValue(hyphenProp):false;
			var isPassed = !isPropDefined ? false:isValString ? getComputed===val:isValRegExp ? Boolean(getComputed.match(val)):false;
			var mDOM = typeCondition&&!isDOM ? " (not a document node)":"";
			var mProp = isPropString ? "the '"+hyphenProp+"'":"["+util.getType(prop)+"]";
			var mComp = !isPropDefined ? "":", while the computed value is '" + getComputed + "'.";
			var mVal = isValString ? "the value '"+val+"'":isValRegExp ? "the value matched the regular expression "+val:"["+util.getType(val)+"] value";
			return {
				pass:isPassed,
				message:isPassed ? "Expected "+util.getType(actual)+mDOM+" not to have "+mProp+" style of "+mVal+".":
								   "Expected "+util.getType(actual)+mDOM+" to have "+mProp+" style of "+mVal+mComp 
			};
		}
	};
};

DOMCustomMatchers.toHaveComputedColor = function(util){
	return {
		compare:function(actual,prop,val){
			var typeCondition = util.isHTML(actual);
			var isDOM = typeCondition ? document.documentElement.contains(actual)&&document.documentElement!==actual:false;
			var isPropString = util.is(prop,'string');
			var isValString = util.is(val,'string');
			var hyphenProp = isPropString ? prop.replace(/[A-Z]/g,function(g){return '-'+g.toLowerCase();}):prop;
			var camelProp = isPropString ? prop.replace(/\x2D\w/g,function(g){return g[1].toUpperCase();}):prop;
			var CSSObj = typeCondition&&isDOM&&isPropString ? window.getComputedStyle(actual,null):CSSObj;
			var isPropDefined = CSSObj ? typeof CSSObj[camelProp]!=='undefined':false;
			var getComputed = CSSObj ? CSSObj.getPropertyValue(hyphenProp):false;
			var isPassed = !isPropDefined ? false:!isValString ? false:isEqual(getComputed,val);
			var mDOM = typeCondition&&!isDOM ? " (not a document node)":"";
			var mProp = isPropString ? "the '"+hyphenProp+"'":"["+util.getType(prop)+"]";
			var mVal = isValString ? "the value '"+val+"'":"["+util.getType(val)+"] value";
			var mComp = !isPropDefined ? "":", while the computed value is '" + getComputed + "'.";
			
			return {
				pass:isPassed,
				message:isPassed ? "Expected "+util.getType(actual)+mDOM+" not to have "+mProp+" style of "+mVal+".":
								   "Expected "+util.getType(actual)+mDOM+" to have "+mProp+" style of "+mVal+mComp
			};
			
			function isEqual(getComputed,value){
				var computedArray, convertedArray;
				if(isType(getComputed,1,true)) computedArray = rgbToRGB(getComputed,true);
				if(isType(getComputed,2,true)) computedArray = rgbToRGB(getComputed,false);
				if(isType(getComputed,5,true)) computedArray = [0,0,0,0];

				if(isType(value,0,false)) convertedArray = hexToRGB(value);
				if(isType(value,1,false)) convertedArray = rgbToRGB(value,true);
				if(isType(value,2,false)) convertedArray = rgbToRGB(value,false);
				if(isType(value,3,false)) convertedArray = hslToRGB(value,true);
				if(isType(value,4,false)) convertedArray = hslToRGB(value,false);
				if(isType(value,5,false)) convertedArray = [0,0,0,0];
				
				if(!computedArray||!convertedArray) return false;
				return util.equals(computedArray,convertedArray);
			}		

			function isType(val,t,allowContent){
				var before = [/^\s*/,/^.*/][+allowContent].source;
				var after = [/\s*$/,/.*$/][+allowContent].source;
				var type = [/\x23(([A-F]|[0-9]){3}\s*$|([A-F]|[0-9]){6})/i,
							/rgb\x28(\s*(\d|\d{2}|[0-1]\d{2}|[0-2][0-4]\d|[0-2][0-5]{2})\s*\x2C\s*){2}(\s*(\d|\d{2}|[0-1]\d{2}|[0-2][0-4]\d|[0-2][0-5]{2})\s*)\x29/,
							/rgba\x28(\s*(\d|\d{2}|[0-1]\d{2}|[0-2][0-4]\d|[0-2][0-5]{2})\s*\x2C\s*){3}(\s*([0-1]|0\x2E\d+|\x2E\d+|1\x2E0+)\s*)\x29/,
							/hsl\x28\s*(\d|\d{2}|[0-2]\d{2}|[0-3][0-5]\d|360)(\s*\x2C\s*(\d{1,2}(\x2E\d+)?|100)\x25\s*){2}\x29/,
							/hsla\x28\s*(\d|\d{2}|[0-2]\d{2}|[0-3][0-5]\d|360)(\s*\x2C\s*(\d{1,2}(\x2E\d+)?|100)\x25\s*){2}\x2C\s*([0-1]|0\x2E\d+|\x2E\d+|1\x2E0+)\s*\x29/,
							/transparent/i];
				var ignoreCase = type[t].ignoreCase ? 'i':'';
				var generateRegEx = new RegExp(before + type[t].source + after,ignoreCase);
				return val.search(generateRegEx)>=0;
			}
			
			function hslToRGB(color,addAlpha){
				var r,g,b,h,s,l,a;
				var parsed = color.slice(color.search(/\x28/)+1,color.search(/\x29/)).replace(/\x25/g,"").split(',');
				parsed.forEach(function(a,b,c){c[b] = Number(a);});
				if(addAlpha) parsed.push(1);

				h = parsed[0]/360;
				s = parsed[1]/100;
				l = parsed[2]/100;
				a = Number(parsed[3].toFixed(2));
				if(s === 0){
					r = g = b = Math.round(l*255);
					}else{
						var c = l >= 0.5 ? (s+l)-l*s:l*(s+1);
						var t = 2 * l - c;
						r = parse(t, c, h + 1/3);
						g = parse(t, c, h);
						b = parse(t, c, h - 1/3);
						}
				return [r,g,b,a];

					function parse(b, a, t){
						t = t<0?t+1:t>1?t-1:t;
						var ret = t < 1/6 ? b+(a-b)*6*t:t<1/2 ? a:t<2/3 ? b+(a-b)*(2/3-t)*6:b;
						return Math.round(ret*255);
					};				
			}

			function hexToRGB(c){
				c = c.replace(/\s/g,"");
				return c.length===4 ?
					[p(c[1]+c[1]) , p(c[2]+c[2]) , p(c[3]+c[3]) , 1]:
					[p(c[1]+c[2]) , p(c[3]+c[4]) , p(c[5]+c[6]) , 1];

					function p(n){
						return parseInt(n,16);
					}
			}

			function rgbToRGB(color,addAlpha){
				var parsed = color.slice(color.search(/\x28/)+1,color.search(/\x29/)).split(',');
				parsed.forEach(function(a,b,c){c[b] = Number(a);});
				if(addAlpha) parsed.push(1);				
				parsed[3] = Number(parsed[3].toFixed(2));
				return parsed;
			}
		}
	};
};
