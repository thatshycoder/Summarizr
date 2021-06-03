// Get the article to summarize
const title = document.querySelector('input[name=title]');
const article = document.querySelector('textarea[name=article]');
const articleFormContainer = document.querySelector('.article-form')
const articleSummaryContainer = document.querySelector('.article-summary-container');
const articleTitle = document.querySelector('.article-title');
const articleSummary = document.querySelector('.article-summary');
const summarySentenceLength = 5;

// buttons
const summaryButton = document.querySelector('button[name=summarize]');
const analyzeButton = document.querySelector('button[name=analyze]');
const resetButton = document.querySelector('button[name=reset]');
const previousButton = document.querySelector('button[name=previous]');
const printButton = document.querySelector('button[name=print]');

// library
const tr = require('textrank');
const lexrank = require('lexrank.js')
    //let SummarizerManager = require("@trashhalo/node-summarizer").SummarizerManager;

summaryButton.addEventListener('click', summarizeArticle);

/**
 * Article summarization logic
 */
function summarizeArticle(e) {
    e.preventDefault();

    let text = article.value.toString();

    // add summarizer library
    let settings = { extractAmount: 2 };
    let summary = new tr.TextRank(text, settings);
    // console.log(summary.summarizedArticle);

    displayArticleSummary()

    articleTitle.innerHTML = title.value;
    articleSummary.innerHTML = summary.summarizedArticle;
}

previousButton.addEventListener('click', displayArticleForm);

function displayArticleForm() {
    articleFormContainer.style.display = 'block';
    articleSummaryContainer.style.display = 'none';
}

function displayArticleSummary() {
    articleFormContainer.style.display = 'none';
    articleSummaryContainer.style.display = 'block';
    articleTitle.value = title;
}

printButton.addEventListener('click', printSummary);

function printSummary() {
    window.print();
}