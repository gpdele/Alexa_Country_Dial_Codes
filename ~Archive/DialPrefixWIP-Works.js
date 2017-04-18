'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.032748a1-aec4-4e75-9e7b-a87680000cfb";

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = item.StateName + " is the " + item.StatehoodOrder + "th state, admitted to the Union in " + item.StatehoodYear + ".  The capital of " + item.StateName + " is " + item.Capital + ", and the abbreviation for " + item.StateName + " is <break strength='strong'/><say-as interpret-as='spell-out'>" + item.Abbreviation + "</say-as>.  I've added " + item.StateName + " to your Alexa app.  Which other state or capital would you like to know about?";
    return sentence;
}

function getSpeechDescriptionCountry(item)
{
    var sentence = "The Dial Prefix for " + item.CountryName + " is: +<say-as interpret-as='spell-out'>"+item.CountryCode+"</say-as>";
    return sentence;
}


//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.StateName + "?";

    /*
    switch(property)
    {
        case "City":
            return "Here is your " + counter + "th question.  In what city do the " + item.League + "'s "  + item.Mascot + " play?";
        break;
        case "Sport":
            return "Here is your " + counter + "th question.  What sport do the " + item.City + " " + item.Mascot + " play?";
        break;
        case "HeadCoach":
            return "Here is your " + counter + "th question.  Who is the head coach of the " + item.City + " " + item.Mascot + "?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of the "  + item.Mascot + "?";
        break;
    }
    */
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state abbreviation, we add some SSML to make sure that Alexa spells that abbreviation out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    switch(property)
    {
        case "Abbreviation":
            return "The " + formatCasing(property) + " of " + item.StateName + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
        default:
            return "The " + formatCasing(property) + " of " + item.StateName + " is " + item[property] + ". "
        break;
    }
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite", 
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew", 
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the United States Quiz Game!  You can ask me about any of the fifty states and their capitals, or you can ask me to start a quiz.  What would you like to do?";  

//This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about the United States.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
//var EXIT_SKILL_MESSAGE = "Thank you for playing the United States Quiz Game!  Let's play again soon!";
//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for using the Country Dial Codes skill!";


//This is the message a user will hear after they ask (and hear) about a specific data element.
//var REPROMPT_SPEECH = "Which other state or capital would you like to know about?";
var REPROMPT_SPEECH = "Which country would you like to know the Dial Code for? ";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I can tell you the phone dial prefix for any Country.  For example, you can ask me: What is the Dial prefix for Canada?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.StateName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
var data = [
                {StateName: "Alabama",        Abbreviation: "AL", Capital: "Montgomery",     StatehoodYear: 1819, StatehoodOrder: 22 },
                {StateName: "Alaska",         Abbreviation: "AK", Capital: "Juneau",         StatehoodYear: 1959, StatehoodOrder: 49 },
                {StateName: "Arizona",        Abbreviation: "AZ", Capital: "Phoenix",        StatehoodYear: 1912, StatehoodOrder: 48 },
                {StateName: "Arkansas",       Abbreviation: "AR", Capital: "Little Rock",    StatehoodYear: 1836, StatehoodOrder: 25 },
                {StateName: "California",     Abbreviation: "CA", Capital: "Sacramento",     StatehoodYear: 1850, StatehoodOrder: 31 },
                {StateName: "Colorado",       Abbreviation: "CO", Capital: "Denver",         StatehoodYear: 1876, StatehoodOrder: 38 },
                {StateName: "Connecticut",    Abbreviation: "CT", Capital: "Hartford",       StatehoodYear: 1788, StatehoodOrder: 5 },
                {StateName: "Delaware",       Abbreviation: "DE", Capital: "Dover",          StatehoodYear: 1787, StatehoodOrder: 1 },
                {StateName: "Florida",        Abbreviation: "FL", Capital: "Tallahassee",    StatehoodYear: 1845, StatehoodOrder: 27 },
                {StateName: "Georgia",        Abbreviation: "GA", Capital: "Atlanta",        StatehoodYear: 1788, StatehoodOrder: 4 },
                {StateName: "Hawaii",         Abbreviation: "HI", Capital: "Honolulu",       StatehoodYear: 1959, StatehoodOrder: 50 },
                {StateName: "Idaho",          Abbreviation: "ID", Capital: "Boise",          StatehoodYear: 1890, StatehoodOrder: 43 },
                {StateName: "Illinois",       Abbreviation: "IL", Capital: "Springfield",    StatehoodYear: 1818, StatehoodOrder: 21 },
                {StateName: "Indiana",        Abbreviation: "IN", Capital: "Indianapolis",   StatehoodYear: 1816, StatehoodOrder: 19 },
                {StateName: "Iowa",           Abbreviation: "IA", Capital: "Des Moines",     StatehoodYear: 1846, StatehoodOrder: 29 },
                {StateName: "Kansas",         Abbreviation: "KS", Capital: "Topeka",         StatehoodYear: 1861, StatehoodOrder: 34 },
                {StateName: "Kentucky",       Abbreviation: "KY", Capital: "Frankfort",      StatehoodYear: 1792, StatehoodOrder: 15 },
                {StateName: "Louisiana",      Abbreviation: "LA", Capital: "Baton Rouge",    StatehoodYear: 1812, StatehoodOrder: 18 },
                {StateName: "Maine",          Abbreviation: "ME", Capital: "Augusta",        StatehoodYear: 1820, StatehoodOrder: 23 },
                {StateName: "Maryland",       Abbreviation: "MD", Capital: "Annapolis",      StatehoodYear: 1788, StatehoodOrder: 7 },
                {StateName: "Massachusetts",  Abbreviation: "MA", Capital: "Boston",         StatehoodYear: 1788, StatehoodOrder: 6 },
                {StateName: "Michigan",       Abbreviation: "MI", Capital: "Lansing",        StatehoodYear: 1837, StatehoodOrder: 26 },
                {StateName: "Minnesota",      Abbreviation: "MN", Capital: "St. Paul",       StatehoodYear: 1858, StatehoodOrder: 32 },
                {StateName: "Mississippi",    Abbreviation: "MS", Capital: "Jackson",        StatehoodYear: 1817, StatehoodOrder: 20 },
                {StateName: "Missouri",       Abbreviation: "MO", Capital: "Jefferson City", StatehoodYear: 1821, StatehoodOrder: 24 },
                {StateName: "Montana",        Abbreviation: "MT", Capital: "Helena",         StatehoodYear: 1889, StatehoodOrder: 41 },
                {StateName: "Nebraska",       Abbreviation: "NE", Capital: "Lincoln",        StatehoodYear: 1867, StatehoodOrder: 37 },
                {StateName: "Nevada",         Abbreviation: "NV", Capital: "Carson City",    StatehoodYear: 1864, StatehoodOrder: 36 },
                {StateName: "New Hampshire",  Abbreviation: "NH", Capital: "Concord",        StatehoodYear: 1788, StatehoodOrder: 9 },
                {StateName: "New Jersey",     Abbreviation: "NJ", Capital: "Trenton",        StatehoodYear: 1787, StatehoodOrder: 3 },
                {StateName: "New Mexico",     Abbreviation: "NM", Capital: "Santa Fe",       StatehoodYear: 1912, StatehoodOrder: 47 },
                {StateName: "New York",       Abbreviation: "NY", Capital: "Albany",         StatehoodYear: 1788, StatehoodOrder: 11 },
                {StateName: "North Carolina", Abbreviation: "NC", Capital: "Raleigh",        StatehoodYear: 1789, StatehoodOrder: 12 },
                {StateName: "North Dakota",   Abbreviation: "ND", Capital: "Bismarck",       StatehoodYear: 1889, StatehoodOrder: 39 },
                {StateName: "Ohio",           Abbreviation: "OH", Capital: "Columbus",       StatehoodYear: 1803, StatehoodOrder: 17 },
                {StateName: "Oklahoma",       Abbreviation: "OK", Capital: "Oklahoma City",  StatehoodYear: 1907, StatehoodOrder: 46 },
                {StateName: "Oregon",         Abbreviation: "OR", Capital: "Salem",          StatehoodYear: 1859, StatehoodOrder: 33 },
                {StateName: "Pennsylvania",   Abbreviation: "PA", Capital: "Harrisburg",     StatehoodYear: 1787, StatehoodOrder: 2 },
                {StateName: "Rhode Island",   Abbreviation: "RI", Capital: "Providence",     StatehoodYear: 1790, StatehoodOrder: 13 },
                {StateName: "South Carolina", Abbreviation: "SC", Capital: "Columbia",       StatehoodYear: 1788, StatehoodOrder: 8 },
                {StateName: "South Dakota",   Abbreviation: "SD", Capital: "Pierre",         StatehoodYear: 1889, StatehoodOrder: 40 },
                {StateName: "Tennessee",      Abbreviation: "TN", Capital: "Nashville",      StatehoodYear: 1796, StatehoodOrder: 16 },
                {StateName: "Texas",          Abbreviation: "TX", Capital: "Austin",         StatehoodYear: 1845, StatehoodOrder: 28 },
                {StateName: "Utah",           Abbreviation: "UT", Capital: "Salt Lake City", StatehoodYear: 1896, StatehoodOrder: 45 },
                {StateName: "Vermont",        Abbreviation: "VT", Capital: "Montpelier",     StatehoodYear: 1791, StatehoodOrder: 14 },
                {StateName: "Virginia",       Abbreviation: "VA", Capital: "Richmond",       StatehoodYear: 1788, StatehoodOrder: 10 },
                {StateName: "Washington",     Abbreviation: "WA", Capital: "Olympia",        StatehoodYear: 1889, StatehoodOrder: 42 },
                {StateName: "West Virginia",  Abbreviation: "WV", Capital: "Charleston",     StatehoodYear: 1863, StatehoodOrder: 35 },
                {StateName: "Wisconsin",      Abbreviation: "WI", Capital: "Madison",        StatehoodYear: 1848, StatehoodOrder: 30 },
                {StateName: "Wyoming",        Abbreviation: "WY", Capital: "Cheyenne",       StatehoodYear: 1890, StatehoodOrder: 44 }
            ];

var dataCountry = [
                {CountryName: "Afghanistan", CountryCode:"93"},
                {CountryName: "Albania", CountryCode:"355"},
                {CountryName: "Algeria", CountryCode:"213"},
                {CountryName: "American Samoa", CountryCode:"1-684"},
                {CountryName: "Andorra", CountryCode:"376"},
                {CountryName: "Angola", CountryCode:"244"},
                {CountryName: "Anguilla", CountryCode:"1-264"},
                {CountryName: "Antarctica", CountryCode:"672"},
                {CountryName: "Antigua and Barbuda", CountryCode:"1-268"},
                {CountryName: "Argentina", CountryCode:"54"},
                {CountryName: "Armenia", CountryCode:"374"},
                {CountryName: "Aruba", CountryCode:"297"},
                {CountryName: "Australia", CountryCode:"61"},
                {CountryName: "Austria", CountryCode:"43"},
                {CountryName: "Azerbaijan", CountryCode:"994"},
                {CountryName: "Bahamas", CountryCode:"1-242"},
                {CountryName: "Bahrain", CountryCode:"973"},
                {CountryName: "Bangladesh", CountryCode:"880"},
                {CountryName: "Barbados", CountryCode:"1-246"},
                {CountryName: "Belarus", CountryCode:"375"},
                {CountryName: "Belgium", CountryCode:"32"},
                {CountryName: "Belize", CountryCode:"501"},
                {CountryName: "Benin", CountryCode:"229"},
                {CountryName: "Bermuda", CountryCode:"1-441"},
                {CountryName: "Bhutan", CountryCode:"975"},
                {CountryName: "Bolivia", CountryCode:"591"},
                {CountryName: "Bosnia and Herzegovina", CountryCode:"387"},
                {CountryName: "Botswana", CountryCode:"267"},
                {CountryName: "Brazil", CountryCode:"55"},
                {CountryName: "British Indian Ocean Territory", CountryCode:"246"},
                {CountryName: "British Virgin Islands", CountryCode:"1-284"},
                {CountryName: "Brunei", CountryCode:"673"},
                {CountryName: "Bulgaria", CountryCode:"359"},
                {CountryName: "Burkina Faso", CountryCode:"226"},
                {CountryName: "Burundi", CountryCode:"257"},
                {CountryName: "Cambodia", CountryCode:"855"},
                {CountryName: "Cameroon", CountryCode:"237"},
                {CountryName: "Canada", CountryCode:"1"},
                {CountryName: "Cape Verde", CountryCode:"238"},
                {CountryName: "Cayman Islands", CountryCode:"1-345"},
                {CountryName: "Central African Republic", CountryCode:"236"},
                {CountryName: "Chad", CountryCode:"235"},
                {CountryName: "Chile", CountryCode:"56"},
                {CountryName: "China", CountryCode:"86"},
                {CountryName: "Christmas Island", CountryCode:"61"},
                {CountryName: "Cocos Islands", CountryCode:"61"},
                {CountryName: "Colombia", CountryCode:"57"},
                {CountryName: "Comoros", CountryCode:"269"},
                {CountryName: "Cook Islands", CountryCode:"682"},
                {CountryName: "Costa Rica", CountryCode:"506"},
                {CountryName: "Croatia", CountryCode:"385"},
                {CountryName: "Cuba", CountryCode:"53"},
                {CountryName: "Curacao", CountryCode:"599"},
                {CountryName: "Cyprus", CountryCode:"357"},
                {CountryName: "Czech Republic", CountryCode:"420"},
                {CountryName: "Democratic Republic of the Congo", CountryCode:"243"},
                {CountryName: "Denmark", CountryCode:"45"},
                {CountryName: "Djibouti", CountryCode:"253"},
                {CountryName: "Dominica", CountryCode:"1-767"},
                {CountryName: "Dominican Republic", CountryCode:"1-809, 1-829, 1-849"},
                {CountryName: "East Timor", CountryCode:"670"},
                {CountryName: "Ecuador", CountryCode:"593"},
                {CountryName: "Egypt", CountryCode:"20"},
                {CountryName: "El Salvador", CountryCode:"503"},
                {CountryName: "Equatorial Guinea", CountryCode:"240"},
                {CountryName: "Eritrea", CountryCode:"291"},
                {CountryName: "Estonia", CountryCode:"372"},
                {CountryName: "Ethiopia", CountryCode:"251"},
                {CountryName: "Falkland Islands", CountryCode:"500"},
                {CountryName: "Faroe Islands", CountryCode:"298"},
                {CountryName: "Fiji", CountryCode:"679"},
                {CountryName: "Finland", CountryCode:"358"},
                {CountryName: "France", CountryCode:"33"},
                {CountryName: "French Polynesia", CountryCode:"689"},
                {CountryName: "Gabon", CountryCode:"241"},
                {CountryName: "Gambia", CountryCode:"220"},
                {CountryName: "Georgia", CountryCode:"995"},
                {CountryName: "Germany", CountryCode:"49"},
                {CountryName: "Ghana", CountryCode:"233"},
                {CountryName: "Gibraltar", CountryCode:"350"},
                {CountryName: "Greece", CountryCode:"30"},
                {CountryName: "Greenland", CountryCode:"299"},
                {CountryName: "Grenada", CountryCode:"1-473"},
                {CountryName: "Guam", CountryCode:"1-671"},
                {CountryName: "Guatemala", CountryCode:"502"},
                {CountryName: "Guernsey", CountryCode:"44-1481"},
                {CountryName: "Guinea", CountryCode:"224"},
                {CountryName: "Guinea-Bissau", CountryCode:"245"},
                {CountryName: "Guyana", CountryCode:"592"},
                {CountryName: "Haiti", CountryCode:"509"},
                {CountryName: "Honduras", CountryCode:"504"},
                {CountryName: "Hong Kong", CountryCode:"852"},
                {CountryName: "Hungary", CountryCode:"36"},
                {CountryName: "Iceland", CountryCode:"354"},
                {CountryName: "India", CountryCode:"91"},
                {CountryName: "Indonesia", CountryCode:"62"},
                {CountryName: "Iran", CountryCode:"98"},
                {CountryName: "Iraq", CountryCode:"964"},
                {CountryName: "Ireland", CountryCode:"353"},
                {CountryName: "Isle of Man", CountryCode:"44-1624"},
                {CountryName: "Israel", CountryCode:"972"},
                {CountryName: "Italy", CountryCode:"39"},
                {CountryName: "Ivory Coast", CountryCode:"225"},
                {CountryName: "Jamaica", CountryCode:"1-876"},
                {CountryName: "Japan", CountryCode:"81"},
                {CountryName: "Jersey", CountryCode:"44-1534"},
                {CountryName: "Jordan", CountryCode:"962"},
                {CountryName: "Kazakhstan", CountryCode:"7"},
                {CountryName: "Kenya", CountryCode:"254"},
                {CountryName: "Kiribati", CountryCode:"686"},
                {CountryName: "Kosovo", CountryCode:"383"},
                {CountryName: "Kuwait", CountryCode:"965"},
                {CountryName: "Kyrgyzstan", CountryCode:"996"},
                {CountryName: "Laos", CountryCode:"856"},
                {CountryName: "Latvia", CountryCode:"371"},
                {CountryName: "Lebanon", CountryCode:"961"},
                {CountryName: "Lesotho", CountryCode:"266"},
                {CountryName: "Liberia", CountryCode:"231"},
                {CountryName: "Libya", CountryCode:"218"},
                {CountryName: "Liechtenstein", CountryCode:"423"},
                {CountryName: "Lithuania", CountryCode:"370"},
                {CountryName: "Luxembourg", CountryCode:"352"},
                {CountryName: "Macau", CountryCode:"853"},
                {CountryName: "Macedonia", CountryCode:"389"},
                {CountryName: "Madagascar", CountryCode:"261"},
                {CountryName: "Malawi", CountryCode:"265"},
                {CountryName: "Malaysia", CountryCode:"60"},
                {CountryName: "Maldives", CountryCode:"960"},
                {CountryName: "Mali", CountryCode:"223"},
                {CountryName: "Malta", CountryCode:"356"},
                {CountryName: "Marshall Islands", CountryCode:"692"},
                {CountryName: "Mauritania", CountryCode:"222"},
                {CountryName: "Mauritius", CountryCode:"230"},
                {CountryName: "Mayotte", CountryCode:"262"},
                {CountryName: "Mexico", CountryCode:"52"},
                {CountryName: "Micronesia", CountryCode:"691"},
                {CountryName: "Moldova", CountryCode:"373"},
                {CountryName: "Monaco", CountryCode:"377"},
                {CountryName: "Mongolia", CountryCode:"976"},
                {CountryName: "Montenegro", CountryCode:"382"},
                {CountryName: "Montserrat", CountryCode:"1-664"},
                {CountryName: "Morocco", CountryCode:"212"},
                {CountryName: "Mozambique", CountryCode:"258"},
                {CountryName: "Myanmar", CountryCode:"95"},
                {CountryName: "Namibia", CountryCode:"264"},
                {CountryName: "Nauru", CountryCode:"674"},
                {CountryName: "Nepal", CountryCode:"977"},
                {CountryName: "Netherlands", CountryCode:"31"},
                {CountryName: "Netherlands Antilles", CountryCode:"599"},
                {CountryName: "New Caledonia", CountryCode:"687"},
                {CountryName: "New Zealand", CountryCode:"64"},
                {CountryName: "Nicaragua", CountryCode:"505"},
                {CountryName: "Niger", CountryCode:"227"},
                {CountryName: "Nigeria", CountryCode:"234"},
                {CountryName: "Niue", CountryCode:"683"},
                {CountryName: "North Korea", CountryCode:"850"},
                {CountryName: "Northern Mariana Islands", CountryCode:"1-670"},
                {CountryName: "Norway", CountryCode:"47"},
                {CountryName: "Oman", CountryCode:"968"},
                {CountryName: "Pakistan", CountryCode:"92"},
                {CountryName: "Palau", CountryCode:"680"},
                {CountryName: "Palestine", CountryCode:"970"},
                {CountryName: "Panama", CountryCode:"507"},
                {CountryName: "Papua New Guinea", CountryCode:"675"},
                {CountryName: "Paraguay", CountryCode:"595"},
                {CountryName: "Peru", CountryCode:"51"},
                {CountryName: "Philippines", CountryCode:"63"},
                {CountryName: "Pitcairn", CountryCode:"64"},
                {CountryName: "Poland", CountryCode:"48"},
                {CountryName: "Portugal", CountryCode:"351"},
                {CountryName: "Puerto Rico", CountryCode:"1-787, 1-939"},
                {CountryName: "Qatar", CountryCode:"974"},
                {CountryName: "Republic of the Congo", CountryCode:"242"},
                {CountryName: "Reunion", CountryCode:"262"},
                {CountryName: "Romania", CountryCode:"40"},
                {CountryName: "Russia", CountryCode:"7"},
                {CountryName: "Rwanda", CountryCode:"250"},
                {CountryName: "Saint Barthelemy", CountryCode:"590"},
                {CountryName: "Saint Helena", CountryCode:"290"},
                {CountryName: "Saint Kitts and Nevis", CountryCode:"1-869"},
                {CountryName: "Saint Lucia", CountryCode:"1-758"},
                {CountryName: "Saint Martin", CountryCode:"590"},
                {CountryName: "Saint Pierre and Miquelon", CountryCode:"508"},
                {CountryName: "Saint Vincent and the Grenadines", CountryCode:"1-784"},
                {CountryName: "Samoa", CountryCode:"685"},
                {CountryName: "San Marino", CountryCode:"378"},
                {CountryName: "Sao Tome and Principe", CountryCode:"239"},
                {CountryName: "Saudi Arabia", CountryCode:"966"},
                {CountryName: "Senegal", CountryCode:"221"},
                {CountryName: "Serbia", CountryCode:"381"},
                {CountryName: "Seychelles", CountryCode:"248"},
                {CountryName: "Sierra Leone", CountryCode:"232"},
                {CountryName: "Singapore", CountryCode:"65"},
                {CountryName: "Sint Maarten", CountryCode:"1-721"},
                {CountryName: "Slovakia", CountryCode:"421"},
                {CountryName: "Slovenia", CountryCode:"386"},
                {CountryName: "Solomon Islands", CountryCode:"677"},
                {CountryName: "Somalia", CountryCode:"252"},
                {CountryName: "South Africa", CountryCode:"27"},
                {CountryName: "South Korea", CountryCode:"82"},
                {CountryName: "South Sudan", CountryCode:"211"},
                {CountryName: "Spain", CountryCode:"34"},
                {CountryName: "Sri Lanka", CountryCode:"94"},
                {CountryName: "Sudan", CountryCode:"249"},
                {CountryName: "Suriname", CountryCode:"597"},
                {CountryName: "Svalbard and Jan Mayen", CountryCode:"47"},
                {CountryName: "Swaziland", CountryCode:"268"},
                {CountryName: "Sweden", CountryCode:"46"},
                {CountryName: "Switzerland", CountryCode:"41"},
                {CountryName: "Syria", CountryCode:"963"},
                {CountryName: "Taiwan", CountryCode:"886"},
                {CountryName: "Tajikistan", CountryCode:"992"},
                {CountryName: "Tanzania", CountryCode:"255"},
                {CountryName: "Thailand", CountryCode:"66"},
                {CountryName: "Togo", CountryCode:"228"},
                {CountryName: "Tokelau", CountryCode:"690"},
                {CountryName: "Tonga", CountryCode:"676"},
                {CountryName: "Trinidad and Tobago", CountryCode:"1-868"},
                {CountryName: "Tunisia", CountryCode:"216"},
                {CountryName: "Turkey", CountryCode:"90"},
                {CountryName: "Turkmenistan", CountryCode:"993"},
                {CountryName: "Turks and Caicos Islands", CountryCode:"1-649"},
                {CountryName: "Tuvalu", CountryCode:"688"},
                {CountryName: "U.S. Virgin Islands", CountryCode:"1-340"},
                {CountryName: "Uganda", CountryCode:"256"},
                {CountryName: "Ukraine", CountryCode:"380"},
                {CountryName: "United Arab Emirates", CountryCode:"971"},
                {CountryName: "United Kingdom", CountryCode:"44"},
                {CountryName: "United States", CountryCode:"1"},
                {CountryName: "Uruguay", CountryCode:"598"},
                {CountryName: "Uzbekistan", CountryCode:"998"},
                {CountryName: "Vanuatu", CountryCode:"678"},
                {CountryName: "Vatican", CountryCode:"379"},
                {CountryName: "Venezuela", CountryCode:"58"},
                {CountryName: "Vietnam", CountryCode:"84"},
                {CountryName: "Wallis and Futuna", CountryCode:"681"},
                {CountryName: "Western Sahara", CountryCode:"212"},
                {CountryName: "Yemen", CountryCode:"967"},
                {CountryName: "Zambia", CountryCode:"260"},
                {CountryName: "Zimbabwe", CountryCode:"263"}
            ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
     "DialCodeIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("DialCode");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "DialCodeIntent": function() {
        var item = getItemCountry(this.event.request.intent.slots);

        this.emit(":ask", getSpeechDescriptionCountry(item), REPROMPT_SPEECH);
        //this.emit(":ask", "The country is:" + item.CountryCode);
    },

    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
            if (USE_CARDS_FLAG)
            {
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};
                this.emit(":askWithCard", getSpeechDescription(item), REPROMPT_SPEECH, getCardTitle(item), getTextDescription(item), imageObj);
            }
            else
            {
                this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
            }
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));
            
        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;
    
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}


function getItemCountry(slots)
{
    var propertyArray = Object.getOwnPropertyNames(dataCountry[0]);
    var value;
    
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = dataCountry.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";    
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";
    
    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};


