#!/usr/bin/env node
'use strict';
const rp = require('request-promise');
var inquirer = require('inquirer');
const open = require('open');
const pkg = require('../package.json');
const program = require('commander');
program.version(pkg.version)
    .option('-n, --number <num>', 'Number of news items you want to see', 10)
    .parse(process.argv);

const number_of_news = program.number;
const extractTen = (newsArray) => {
    let tempArray = [];
    for (let i = 0; i < number_of_news; i++) {
        tempArray.push(newsArray[i]);
    }
    return tempArray;
}

const extractOne = (id) => {
    try {
        return rp(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    } catch {
        console.log("An error occurred while fetching news");
    }
}

const parseAndDisplayNews = (news) => {

    const URLs = [];
    news.forEach(newItem => {
        URLs.push(newItem.url);
    })
    const titles = [];
    news.forEach(newItem => {
        let author = newItem.by;
        let res = newItem.title + " | " + "By: " + author;
        titles.push(res);
    })

    inquirer.prompt([
        {
            type: 'list',
            name: "best",
            message: `Top ${number_of_news} best news`,
            choices: titles
        }
    ]).then(ans => {
        let url;
        news.forEach(newsItem => {
            if (newsItem.title === ans.best) {
                console.log("URL");
                url = newsItem.url;
            }
        })
        open(url).catch(err => {
            open("https://news.ycombinator.com/");
            console.log('Oops unable to open browser.', err);
        });
        console.info('Opening in Browser.....', url);

    })
}

const extractNews = (newsIds) => {
    const news = [];
    let promises = [];
    newsIds.forEach(id => {
        promises.push(extractOne(id));
    })

    Promise.all(promises).then(results => {
        results.forEach(item => {
            news.push(JSON.parse(item));
        });
        parseAndDisplayNews(news);
    }).catch((err) => {
        console.log("ER", err);
    })
}


rp('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty').then(async (res) => {
    res = JSON.parse(res);
    if (res.length > 0) {
        const newsIds = extractTen(res);
        extractNews(newsIds);
    }
});
