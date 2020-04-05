//console.log("Hello World, best");

const request = require("request");
const rp = require('request-promise');
const emoji = require('node-emoji');
const colors = require('colors');
var inquirer = require('inquirer');
//const story = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`



// Get the ids of best new



const extractTen = (newsArray) => {
    let tempArray = [];
    for (let i = 0; i < 10; i++) {
        tempArray.push(newsArray[i]);
    }
    //console.log("Temp Array", tempArray);
    return tempArray;
}

const extractOne = (id) => {
    try {
        return rp(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    } catch {
        console.log("ERR");
    }
}

const parseAndDisplayNews = (news) => {
    // news.forEach(newsItem => {
    //     /* console.log(`\n
    //     ${colors.green(emoji.get('newspaper'))} ${colors.green(newsItem.title)}\n
    //     ${colors.red(emoji.get('heart'))}  ${colors.red(newsItem.score)} \n
    //     ${colors.yellow(emoji.get('watch'))} ${colors.yellow(new Date(newsItem.time))} \n
    //     ${emoji.get('pencil')} By: ${newsItem.by} \n
    //     ${colors.blue(emoji.get('link'))} ${colors.blue(newsItem.url)}
    //     `) */
    // })
    const URLs = [];
    news.forEach(newItem => {
        URLs.push(newItem.title);
    })

    inquirer.prompt([
        {
            type: 'list',
            name: "Best News",
            message: "Top 10 best news",
            choices: URLs
        }
    ]).then(ans => {
        console.info('Answers', ans);
    })

    //console.log(news);
}

const extractNews = (newsIds) => {
    const news = [];
    let promises = [];
    newsIds.forEach(id => {
        //console.log(id);
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

    //console.log(body);
