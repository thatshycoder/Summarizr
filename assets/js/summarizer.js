// Form
const title = document.querySelector('input[name=title]');
const articleForm = document.querySelector('textarea[name=article]');
const articleFormTitle = document.querySelector('input[name=title]');
const articleFormContainer = document.querySelector('.article-form')
const articleSummaryContainer = document.querySelector('.article-summary-container');
const articleTitle = document.querySelector('.article-title');
const articleSummary = document.querySelector('.article-summary');
const summarySentenceLength = 5;

// Buttons
const summaryButton = document.querySelector('button[name=summarize]');
const analyzeButton = document.querySelector('button[name=analyze]');
const resetButton = document.querySelector('button[name=reset]');
const previousButton = document.querySelector('button[name=previous]');
const printButton = document.querySelector('button[name=print]');

/**
 * Article summarization logic
 */
summaryButton.addEventListener('click', summarizeArticle);

function summarizeArticle(e) {
    e.preventDefault();

    let text = articleForm.value;
    let apiKey = '1a8816f5601d3fd6216a8f2c6406d2c6';

    generateSummary(text, apiKey);
}

function generateSummary(text, apiKey) {
    if (text !== null && text !== '') {

        let xhttp = new XMLHttpRequest();
        let params = `?key=${apiKey}&txt=${text}&sentences=2`;

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let summary = JSON.parse(this.responseText);
                displayArticleSummary(summary.summary);
            }
        };

        xhttp.open('POST', 'https://api.meaningcloud.com/summarization-1.0' + params, true);
        xhttp.send();
    }
}

function displayArticleSummary(summary) {
    articleFormContainer.style.display = 'none';
    articleSummaryContainer.style.display = 'block';
    articleTitle.value = title;
    articleSummary.innerHTML = summary;
}

resetButton.addEventListener('click', resetForm);

function resetForm(e) {
    e.preventDefault();

    articleFormTitle.value = '';
    articleForm.value = '';
}

previousButton.addEventListener('click', displayArticleForm);

function displayArticleForm() {
    articleFormContainer.style.display = 'block';
    articleSummaryContainer.style.display = 'none';
}

printButton.addEventListener('click', printSummary);

function printSummary() {
    // let navButtons = document.querySelector('#summaryNavButtons');
    // let appTitle = document.querySelector('#appTitle');
    // let appTagline = document.querySelector('#appTagline');

    // navButtons.style.display = 'none';
    // appTitle.style.display = 'none';
    // appTagline.style.display = 'none';

    window.print();
}