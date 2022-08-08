(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){(function (){
process.env.API_KEY = "";
}).call(this)}).call(this,require('_process'))
},{"_process":1}],3:[function(require,module,exports){
(function (process){(function (){
require('../js/config');

// Form fields
const title = document.querySelector("input[name=title]");
const articleForm = document.querySelector("textarea[name=article]");
const articleFormContainer = document.querySelector(".article-form");
const articleSummaryContainer = document.querySelector(
	".article-summary-container"
);
const articleTitle = document.querySelector(".article-title");
const articleSummary = document.querySelector(".article-summary");
const summarySentenceLength = document.querySelector(
	"input[name=sentence_length]"
);

// Buttons
const summaryButton = document.querySelector("button[name=summarize]");
const analyzeButton = document.querySelector("button[name=analyze]");
const resetButton = document.querySelector("button[name=reset]");
const previousButton = document.querySelector("button[name=previous]");
const printButton = document.querySelector("button[name=print]");

let errorMessage = document.querySelector(".error-message");

// Set default input values and state
const persistedArticle = JSON.parse(localStorage.getItem("article"));

if (persistedArticle != null) {
	if (persistedArticle.text !== null || persistArticleData.text !== "") {
		summarySentenceLength.value = persistedArticle.length;
		articleForm.value = persistedArticle.text;

		analyzeButton.classList.remove("btn-disabled");
		analyzeButton.disabled = false;
	}
}

articleForm.addEventListener("input", enableAnalyzeButton);

function enableAnalyzeButton() {
	if (this.value !== "") {
		analyzeButton.classList.remove("btn-disabled");
		analyzeButton.disabled = false;

		// hide any existing error message
		errorMessage.style.display = "none";
	} else {
		analyzeButton.classList.add("btn-disabled");
		analyzeButton.disabled = true;
	}
}

summaryButton.addEventListener("click", summarizeArticle);

function summarizeArticle(e) {
	e.preventDefault();

	let text = articleForm.value;
	let apiKey = ""; // or directly paste your api key here

	if(process.env.API_KEY !== undefined) {
		apiKey = process.env.API_KEY;
	}

	generateSummary(text, apiKey);
}

function generateSummary(text, apiKey) {
	if (text !== null && text !== "") {
		errorMessage.style.display = "none";
		let sentenceLength = 2;

		if (summarySentenceLength.value !== "") {
			if (summarySentenceLength.value.match(/\d/g)) {
				if (
					summarySentenceLength.value > 5 ||
					summarySentenceLength.value < 1
				) {
					errorMessage.innerHTML = "Sentences length should not be more than 5";
					errorMessage.style.display = "block";
				} else {
					errorMessage.style.display = "none";
					sentenceLength = summarySentenceLength.value;

					persistArticleData();

					let xhttp = new XMLHttpRequest();
					let params = encodeURI(
						`?key=${apiKey}&txt=${text}&sentences=${sentenceLength}`
					);

					xhttp.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
							let summary = JSON.parse(this.responseText);
							displayArticleSummary(summary.summary);
						}
					};

					xhttp.open(
						"POST",
						"https://api.meaningcloud.com/summarization-1.0" + params,
						true
					);
					xhttp.send();
				}
			}
		}
	} else {
		errorMessage.innerHTML = "Article cannot be empty";
		errorMessage.style.display = "block";
	}
}

function displayArticleSummary(summary) {
	articleFormContainer.style.display = "none";
	articleSummaryContainer.style.display = "block";
	articleTitle.value = title;
	articleSummary.innerHTML = summary;
}

analyzeButton.addEventListener("click", goToAnalysisPage);

function goToAnalysisPage() {
	persistArticleData();
	window.location.href = "analysis.html";
}

function persistArticleData() {
	let article = articleForm.value;
	let articleData = {
		length: summarySentenceLength.value,
		text: article,
	};

	localStorage.setItem("article", JSON.stringify(articleData));
}

resetButton.addEventListener("click", resetForm);

function resetForm(e) {
	e.preventDefault();

	summarySentenceLength.value = "";
	articleForm.value = "";
	analyzeButton.classList.add("btn-disabled");
	analyzeButton.disabled = true;
	localStorage.clear();
}

previousButton.addEventListener("click", displayArticleForm);

function displayArticleForm() {
	articleFormContainer.style.display = "block";
	articleSummaryContainer.style.display = "none";
}

printButton.addEventListener("click", printSummary);

function printSummary() {
	window.print();
}

}).call(this)}).call(this,require('_process'))
},{"../js/config":2,"_process":1}]},{},[3]);
