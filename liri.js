require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");

const spotify = new Spotify(keys.spotify);
const terms = process.argv.slice(3).join(" ");

switch (process.argv[2]) {
    case `concert-this`:
        
        break;
    case `spotify-this-song`:

        break;
    case `movie-this`:

        break;
    case `do-what-it-says`:

        break;
    default: console.log("liri.js has four options for input:\r\n'concert-this <nameOfArtist>': Finds a concert\r\n" +
        "'spotify-this-song <songName>': Plays a song\r\n`movie-this <movieName>': Displays information about a movie\r\n" +
        "`do-what-it-says <textDocumentPath>': Executes the command found in a text document\r\n" +
        "---------------------------");
}