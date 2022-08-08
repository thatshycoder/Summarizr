require("dotenv").config({ path: '../../.env' });

console.log(process.env.API_KEY);

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
	let apiKey = process.env.API_KEY;

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
