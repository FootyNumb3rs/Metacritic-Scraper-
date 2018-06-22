// Tande Mungwa 

// Loading Dependencies 
const rp = require('request-promise');
const cheerio = require('cheerio');
var fs = require('fs');


function grabGames(callback,page_num){
	var games = [];
	var options  = {
	uri:'http://www.metacritic.com/browse/games/release-date/available/ps4/metascore?view=detailed',
	headers: {
    'User-Agent': 'Mozilla.. Haha, not really.'
  	},
	transform: function(body) {return cheerio.load(body);}
	};
	rp(options)
	  .then(($) => {
	  	var i = 0;
	    $('li.has_small_image').each(function(d){
	    	var temp_dict = {};
	    	if (i>99){return;};
	    	temp_dict['TITLE']=$(this).find('h3.product_title').text().trim();
	    	temp_dict['PRO_SCORE']=$(this).find('span.metascore_w').text().trim();
	    	temp_dict['RELEASE_DATE']=$(this).find('ul.more_stats').find('.release_date').find('span.data').text().trim();
	    	temp_dict['PUBLISHER'] = $(this).find('ul.more_stats').find('.publisher').find('span.data').text().trim();
	    	temp_dict['USER_SCORE'] = $(this).find('ul.more_stats').find('.product_avguserscore').find('span.data').text().trim();


	    	// DIFFICULTY PARSING THROUGH THIS WHITESPACE
	    	//console.log($(this).find('ul.more_stats').find('.maturity_rating').find('span.data').text().trim());
	    	// GENRE CONTAINS UN-TRIMMABLE WHITESPACE
	    	//console.log($(this).find('ul.more_stats').find('.genre').find('span.data').text().split(',')
	    		//.filter(function(d){if (d.length>1){return d.replace('\n',' ').replace('\s' ').trim() }}));

	    	// HOW IT WAS RECIEVED BY USERS COMPARED TO JOURNALISTS
	    	temp_dict['POLARITY'] = parseFloat(temp_dict['PRO_SCORE']) - parseFloat(temp_dict['USER_SCORE'])*10;
	    	
	    	temp_dict['LINK']= 'https://www.metacritic.com'+$(this).find('h3.product_title').find('a').attr('href');
	    	temp_dict['IMAGE_LINK']= $(this).find('div.product_image').find('img').attr('src');
	    	i++;
	    	games.push(temp_dict)
	    });
	    console.log(i);
	    callback(games);

	  })
	  .catch((err) => {
	    console.log(err);
	  });
}


function pushData(data){
	console.log(data)
	// IF YOU WANT TO SAVE DATA TO A TEXT FILE 
	/*
	fs.writeFile("game_data.txt", JSON.stringify(data), function(err) {
    if (err) {
        console.log(err);
    }
    
});*/

}
	

grabGames(pushData);









