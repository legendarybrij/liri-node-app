# liri-node-app
This is LIRI APP. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. In this app we have four sections. 

1) We can search for the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
Name of the venue,
Venue location, and
Date of the Event (use moment to format this as "MM/DD/YYYY")

2) We can search for song in Spotify API and retrive the following information about the song in your terminal/bash window
Artist(s),
The song's name,
A preview link of the song from Spotify The album that the song is from, and
If no song is provided then your program will default to "The Sign" by Ace of Base.

3) We can search for movie info on OMDB API and retrieve the following information to your terminal/bash window:
        * Title of the movie,
        * Year the movie came out,
        * IMDB Rating of the movie,
        * Rotten Tomatoes Rating of the movie,
        * Country where the movie was produced,
        * Language of the movie,
        * Plot of the movie, and
        * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4) We can put command and input in random.txt file and using fs pakage it can read and retrieve the information according to 3 methods we made above.
LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt . Edit the text in random.txt to test out the feature for movie-this and concert-this.

5) Every command you type on terminal and its output will be saved in log.txt file

1) Testing for Concert-This: https://youtu.be/MdKqc37dilg
2) Testing for Spotify-This-Song: https://youtu.be/AwTsnfRoOJ0
3) Testing for Movie-This: https://youtu.be/_7T6Ptgvy8c
4) Testing for Do-What-It-Says: https://youtu.be/fSOITxPFCEw
