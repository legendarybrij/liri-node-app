require("dotenv").config();
var keys = require("./keys.js");
const Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

let op = process.argv[2];
let value =process.argv.slice(3).join("+");


function concertThis() {
   let queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
  // https://rest.bandsintown.com/artists/circa+survive/events?app_id=codingbootcamp

axios.get(queryURL).then(
  function(response) {
    writeCommand();
    for(let i in response.data)
    {   let lines =[];

        lines.push("************************************************");
        lines.push("Event "+(parseFloat(i)+1));
        lines.push("NAME: "+response.data[i].venue.name);
        lines.push("Location: "+response.data[i].venue.city+", "+response.data[i].venue.region+", "+response.data[i].venue.country);
        lines.push("Date: "+moment(response.data[i].datetime).format("MM/DD/YYYY"));
        
        console.log('\x1b[34m%s\x1b[1m',lines[0]);
        console.log('\x1b[31m%s\x1b[0m', lines[1]);
        console.log('\x1b[33m%s\x1b[0m', lines[2]);
        console.log('\x1b[36m%s\x1b[0m', lines[3]);
        console.log('\x1b[32m%s\x1b[0m', lines[4]);
        
        loopLinesToText(lines);

        if(parseFloat(i)===response.data.length-1)
        {
            toText("\n"+"-------THE End of the concert-this Command \""+value.split("+").join(" ")+"\"-------"+"\n");
        }
       
    }
   
  });
// This line is just to help us debug against the actual URL.
console.log(queryURL);

}

 
function spotifyThisSong() {
if(value==="")
{
    value="The+Sign";
}
spotify.search({ type: 'track', query: value, limit: "20" }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  writeCommand();
//console.log(JSON.stringify(data.tracks.items[0],null,3)); 
for(let i in data.tracks.items)
    {   
        let lines =[];
    
        lines.push("**************************************************************************************************************************");
        lines.push("Song #"+(parseFloat(i)+1));
        lines.push("Artist NAME: "+JSON.stringify(data.tracks.items[i].album.artists[0].name,null,1));
        lines.push("Song NAME: "+data.tracks.items[i].name);
        lines.push("Preview-Link: "+data.tracks.items[i].preview_url);
        lines.push( "ALBUM NAME: "+JSON.stringify(data.tracks.items[i].album.name));

        console.log('\x1b[34m%s\x1b[1m', lines[0]);
        console.log('\x1b[31m%s\x1b[1m', lines[1]);
        console.log('\x1b[36m%s\x1b[0m', lines[2]);
        console.log('\x1b[33m%s\x1b[0m', lines[3]);
        console.log('\x1b[37m%s\x1b[0m', lines[4]);
        console.log('\x1b[32m%s\x1b[0m', lines[5]);
        
        loopLinesToText(lines);

        if(parseFloat(i)===data.tracks.items.length-1)
        {
            toText("\n"+"-------THE End of the spotify-this-song Command \""+value.split("+").join(" ")+"\"-------"+"\n");
        }
        
    }
});

}


function movieThis() {
    if(value==="")
    {
        value="Mr.+Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" +value+"&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
      function(response) {
        writeCommand();

        let lines =[];
    
        lines.push("*******************************************************************************************************************************");
        lines.push("Movie Name: "+response.data.Title);
        lines.push("*******************************************************************************************************************************");
        lines.push("Released: "+response.data.Year);
        lines.push("IMDB Rating: "+response.data.imdbRating);
        lines.push("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
        lines.push("Country or Countries Produced In: "+response.data.Country);
        lines.push("Language: "+response.data.Language);
        lines.push("Plot: "+response.data.Plot);
        lines.push("Cast: "+response.data.Actors);
        lines.push("*******************************************************************************************************************************");
        

        console.log('\x1b[31m%s\x1b[1m',"");
        console.log('\x1b[37m%s\x1b[1m', lines[0]);
        console.log('\x1b[31m%s\x1b[1m', lines[1]);
        console.log('\x1b[37m%s\x1b[1m', lines[2]);
        console.log('\x1b[32m%s\x1b[1m', lines[3]);
        console.log('\x1b[33m%s\x1b[1m', lines[4]);
        console.log('\x1b[35m%s\x1b[1m', lines[5]);
        console.log('\x1b[34m%s\x1b[1m', lines[6]);
        console.log('\x1b[36m%s\x1b[1m', lines[7]);
        console.log('\x1b[32m%s\x1b[1m', lines[8]);
        console.log('\x1b[33m%s\x1b[1m', lines[9]);
        console.log('\x1b[37m%s\x1b[0m', lines[10]);


        loopLinesToText(lines);
    
        toText("\n"+"-------THE End of the movie-this Command \""+value.split("+").join(" ")+"\"-------"+"\n");
        

      }
    );

}


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
    
        var textFile = data.split(",");
        op = textFile[0];
        value = textFile[1].split(" ").join("+");
        
        value = value.substring(1,value.length-1); //To remove the quotes from the text file, if You want to keep the quotes then comment .substring method
        
        if(op==="concert-this")
        {
            concertThis();
        }else if(op==="spotify-this-song"){
            spotifyThisSong();

        }else if(op==="movie-this"){
            movieThis();
        }
        
        //console.log(op + " " + value);
        
      
      });

}

function toText(input) {
    fs.appendFile("log.txt", input+"\n", function(err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
    
          return console.log(err);
        }
      
      });
}

function writeCommand() {
    toText("Command = "+op); 
    toText("Input = "+value.split("+").join(" "));
}

function loopLinesToText(array) {
    
for(let i=0; i<array.length;i++)
       {
           toText(array[i]);
       }
 }

  switch(op) {
    case "concert-this":
    concertThis();
    console.log("Your log.txt is updated");
    break;
    case "spotify-this-song":
    spotifyThisSong();
    console.log("Your log.txt is updated");
    break;
    case "movie-this":
    movieThis();
    console.log("Your log.txt is updated");
    break;
    case "do-what-it-says": 
    doWhatItSays(); 
    console.log("Your log.txt is updated");
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

