(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Deals with analyzing an article. Analysis includes
 * checking plagiarism and determining content depth. 
 */

analyzeArticle();

function analyzeArticle() {
    let article = localStorage.getItem('article');

    if (article !== null && article !== '') {

        //let accessToken = getAPIAccessToken();
        //detectPlagiarism(accessToken, article);
        analyzeContentDepth(article);
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

        contentDepthScore.innerHTML = contentDepthData.score;

        for (let suggestion of contentDepthData.suggestions) {
            contentDepthSuggestion.innerHTML += suggestion + '<br><br>';
        }
    }
}

function calculateContentDepth(article) {

    let contentDepthData = {};
    let contentDepthScore = 0;
    let suggestions = Array();

    // if article is greater than 300 words, score it
    if (isArticleLenghty(article)) {
        contentDepthScore += 10;
        suggestions.push('Well done! Your article length is good');

    } else {
        suggestions.push('Article is too short');
    }

    // score article if it contains special words indepth articles usally haveƒ
    if (countSpecialWords(article) > 10) {
        contentDepthScore += 20;
        suggestions.push('Article is easy to understand');

    } else {
        suggestions.push('Article is not well written. Consider using keywords to make artice easier to understand');
    }

    contentDepthData.score = contentDepthScore;
    contentDepthData.suggestions = suggestions;

    return contentDepthData;
}

function isArticleLenghty(article) {
    // str = str.replace(/(^\s*)|(\s*$)/gi,"");
    // str = str.replace(/[ ]{2,}/gi," ");
    // str = str.replace(/\n /,"\n");
    // return str.split(' ').length;

    return true;
}

function countSpecialWords(article) {

    let specialWords = Array('s');
    let count = 0;

    for (let specialWord in specialWords) {
        if (article.match(specialWord)) {
            count += article.match(specialWord).length;
        }
    }

    return count;
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
 * function CreateAFormInsideMyDivAndSubmitIt(mots)
{
    var mydiv = document.getElementById('myformcontainer').innerHTML = '<form id="reviseCombi" method="post" action="otherPage.php"><input name="input1" type="hidden" value="ok" /><input name="input2" type="hidden" value="'+ mots +'" /></form>';
    f=document.getElementById('reviseCombi');
    if(f){
    f.submit();
    }
}
 * {access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…fapZmk-hNOuWOkxBCft8VMD91ECPNg0sF0XQ1v_68y-tnjj_Q", .
 * issued: "2021-06-15T22:02:34.8827184Z", .expires: "2021-06-17T22:02:34.8827184Z"}
 */
},{}]},{},[1]);
