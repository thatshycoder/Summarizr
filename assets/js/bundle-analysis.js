(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Deals with analyzing an article. Analysis includes
 * checking plagiarism and determining content depth. 
 */

analyzeArticle();

function analyzeArticle() {
    let article = JSON.parse(localStorage.getItem('article'));

    if (article !== null && article !== '') {

        //let accessToken = getAPIAccessToken();
        //detectPlagiarism(accessToken, article);
        analyzeContentDepth(article.text);
    }
}

function detectPlagiarism(accessToken, artice) {
    return false;
}

function analyzeContentDepth(article) {

    let contentDepthData = calculateContentDepth(article);

    if (contentDepthData.length !== '') {

        let contentDepthScore = document.querySelector('.content-depth-score');
        let contentDepthSuggestion = document.querySelector('.content-depth-score-breakdown');
        let contentDepthScoreSummary = document.querySelector('.content-depth-score-summary');

        contentDepthScore.innerHTML = contentDepthData.score;

        // > 49 indepth, > 40 > needs more work, anything below = not indepth
        if (contentDepthData.score > 49) {

            contentDepthScore.style.color = 'green';
            contentDepthScoreSummary.style.color = 'green';
            contentDepthScoreSummary.innerHTML = 'IN-DEPTH';

        } else if (contentDepthData.score > 39) {

            contentDepthScore.style.color = 'orange';
            contentDepthScoreSummary.style.color = 'orange';
            contentDepthScoreSummary.innerHTML = 'NEEDS MORE WORK';

        } else {
            contentDepthScore.style.color = 'red';
            contentDepthScoreSummary.style.color = 'red';
            contentDepthScoreSummary.innerHTML = 'NOT IN-DEPTH';
        }

        for (let suggestion of contentDepthData.suggestions) {
            contentDepthSuggestion.innerHTML += suggestion + '<br><br>';
        }
    }
}

function calculateContentDepth(article) {

    let contentDepthData = {};
    let contentDepthScore = 0;
    let suggestions = Array();

    // if article has greater than 400 words, score it
    if (articleHasMoreWords(article)) {
        contentDepthScore += 10;
        suggestions.push('✓ Well done! The article length is good.');

    } else {
        suggestions.push('&cross; The article is too short.');
    }

    // if article has greater than 10 sentences, score it
    if (articleHasMoreSentences(article)) {
        contentDepthScore += 30;
        suggestions.push('✓ Article has enough sentences.');

    } else {
        suggestions.push('&cross; Try to group words into sentences to make it easier to digest.');
    }

    // score article if it contains special words indepth articles usally have
    if (countSpecialWords(article) > 3) {
        contentDepthScore += 40;
        suggestions.push('✓ Article is easy to understand.');

    } else if (countSpecialWords(article) > 1) {
        contentDepthScore += 20;
        suggestions.push('✓ Article is easy to understand.');

    } else {

        if (countSpecialWords(article) == 1) {
            contentDepthScore += 10;
        }

        suggestions.push('&cross; Article is not well written. Consider using keywords to make artice easier to understand.');
    }

    contentDepthData.score = contentDepthScore;
    contentDepthData.suggestions = suggestions;

    return contentDepthData;
}

function articleHasMoreSentences(article) {
    let sentenceCount = 0;
    let count = article.match(/[\w|\)][.?!](\s|$)/g)

    if (count) {
        sentenceCount = count.length
    }

    return (sentenceCount > 10);
}

function articleHasMoreWords(article) {
    let wordCount = article.replace(/(^\s*)|(\s*$)/gi, "");
    wordCount = wordCount.replace(/[ ]{2,}/gi, " ");
    wordCount = wordCount.replace(/\n /, "\n");
    wordCount = wordCount.split(' ').length;

    // increase word count to 500
    return (wordCount > 400);
}

function countSpecialWords(article) {

    article = article.toLowerCase();
    let specialWords = getSpecialWords();
    let specialWordCount = 0;
    let count = 0;

    for (let specialWord of specialWords) {

        if (article.match(specialWord)) {

            // count the number of times the special word appears in the artocle
            specialWordCount = article.split(specialWord).length - 1;

            if (specialWordCount > 1) {
                count++;
            }
        }
    }

    return count;
}

function getSpecialWords() {
    return Array(
        'although',
        'even if',
        'so that',
        'in case',
        'whereas',
        'whenever',
        'however', 'nevertheless',
        'nonetheless',
        'besides',
        'furthermore',
        'in addition',
        'more over',
        'similarly',
        'as a result',
        'consequently',
        'furthermore',
        'likewise',
        'similarly',
        'equally',
        'thus',
        'to clarify',
        'typically',
        'especially',
        'finally',
        'therefore',
        'even though',
        'despite',
        'inspite of',
        'such as',
        'according to',
        'in terms of'
    );
}

function getAPIAccessToken() {

    let xhttp = new XMLHttpRequest();
    let email = 'me@shycoder.com';
    let apiKey = '9a0df3e6-86f9-41c9-bf78-8a9331cccd10';
    let params = `?email=${email}&key=${apiKey}`;

    xhttp.open('POST', 'https://id.copyleaks.com/v3/account/login/api/' + params, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let resoponse = JSON.parse(this.responseText);

            // TODO: Perhaps store access token in localstorage and retrieve it if active
            // or proceed with api call otherwise
            console.log(resoponse.access_token);
        }
    };

    xhttp.send(params);
}

/**
 * {access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…fapZmk-hNOuWOkxBCft8VMD91ECPNg0sF0XQ1v_68y-tnjj_Q", .
 * issued: "2021-06-15T22:02:34.8827184Z", .expires: "2021-06-17T22:02:34.8827184Z"}
 */
},{}]},{},[1]);
