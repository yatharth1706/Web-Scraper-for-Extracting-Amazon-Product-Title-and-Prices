const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./title');
const url1 = 'https://www.amazon.in/s?k=';
const url2 = '&ref=nb_sb_noss_2';
var express = require('express');
var app = express();
app.get("/",function(req,res){
	res.send("Home Page");
})
app.get("/search",function(req,res){
	res.send("Search Page");
})
app.post("/*",function(req,res){
	const url=req.url;
	console.log(url);
	console.log(typeof(url));
	let changedUrl="";
	for(let i=1;i<url.length;i++){
		changedUrl+=url[i];
	}
	console.log(changedUrl);
	rp(changedUrl).then(function(html) {
	    //success!
	    const amazonUrls = [];
	    for (let i = 0; i < 8; i++) {
	      amazonUrls.push($('h2 > a', html)[i].attribs.href);
	    }
	    return Promise.all(
	      amazonUrls.map(function(url) {
	        return potusParse('https://www.amazon.in' + url);
	      })
	    );
	  }).then(function(laptops) {
	  	console.log(laptops);
	  }).catch(function(err) {
	    //handle error
	    console.log(err);
	  });	
})


app.listen(1338,function(){
console.log("Movie app has started");
});