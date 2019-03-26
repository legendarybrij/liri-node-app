// require("dotenv").config();
// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


var axios = require("axios");
var moment = require("moment");
let op = process.argv[2];
let value =process.argv.slice(3).join("+");

function concertThis() {
   let queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
  // https://rest.bandsintown.com/artists/circa+survive/events?app_id=codingbootcamp

axios.get(queryURL).then(
  function(response) {

    for(let i in response.data)
    {   console.log('\x1b[34m%s\x1b[1m',"************************************************");
        console.log('\x1b[31m%s\x1b[0m', "Event "+(parseFloat(i)+1));
        console.log('\x1b[33m%s\x1b[0m', "NAME: "+response.data[i].venue.name);
        console.log('\x1b[36m%s\x1b[0m', "Location: "+response.data[i].venue.city+", "+response.data[i].venue.region+", "+response.data[i].venue.country);
        console.log('\x1b[32m%s\x1b[0m', "Date: "+moment(response.data[i].datetime).format("MM/DD/YYYY"));
       // console.log('\x1b[34m%s\x1b[0m',"************************************************");
    }
    // jsonData= JSON.stringify(response.data.length);
    // console.log(jsonData);
  });
// This line is just to help us debug against the actual URL.
console.log(queryURL);

}


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "7cdf127c34e84820b16bd93a0448afa1",
  secret: "36093a8d69604c1d8d5e06d90946524e"
});
 
function spotifyThisSong() {
if(value==="")
{
    value="The+Sign";
}
spotify.search({ type: 'track', query: value, limit: "50" }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data.tracks.items[0],null,3)); 
for(let i in data.tracks.items)
    {   console.log('\x1b[34m%s\x1b[1m',"**************************************************************************************************************************");
        console.log('\x1b[31m%s\x1b[1m', "Song #"+(parseFloat(i)+1));
        console.log('\x1b[36m%s\x1b[0m', "Artist NAME: "+JSON.stringify(data.tracks.items[i].album.artists[0].name,null,1));
        console.log('\x1b[33m%s\x1b[0m', "Song NAME: "+data.tracks.items[i].name);
        console.log('\x1b[37m%s\x1b[0m', "Preview-Link: "+data.tracks.items[i].preview_url);
        console.log('\x1b[32m%s\x1b[0m', "ALBUM NAME: "+JSON.stringify(data.tracks.items[i].album.name));
        
        
        //console.log('\x1b[34m%s\x1b[0m',"************************************************");
    }
});

}



  switch(op) {
    case "concert-this":
    concertThis();
    break;
    case "spotify-this-song":
    spotifyThisSong();
    break;
    case "movie-this":
    movieThis();
    break;
    case "do-what-it-says": 
    doWhatItSays(); 
    break;

  }



// colors
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

