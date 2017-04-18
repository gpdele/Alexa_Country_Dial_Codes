'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.032748a1-aec4-4e75-9e7b-a87680000cfb";

//This function returns a descriptive sentence about the data. 
function getSpeechDescriptionCountry(item)
{
    var sentence = "The Dial Prefix for " + item.CountryName + " is: +<say-as interpret-as='spell-out'>"+item.CountryCode+"</say-as>.  " + 
                   "To dial " + item.CountryName + " from the United States, dial <say-as interpret-as='spell-out'>011</say-as>, then <say-as interpret-as='spell-out'>" 
                   + item.CountryCode+"</say-as>, then the local phone number."  ;
    return sentence;
}

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the Alexa Country Code Dial Prefix skill."; 

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for using the Country Dial Codes skill!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
//var REPROMPT_SPEECH = "Which other state or capital would you like to know about?";
var REPROMPT_SPEECH = "Which country would you like to know the Dial Code for? ";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I can tell you the phone dial prefix for any Country.  For example, you can ask me: What is the Dial prefix for Canada?";

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.CountryName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//
//=========================================================================================================================================

//=========================================================================================================================================
//
//=========================================================================================================================================
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


const handlers = {
     "LaunchRequest": function() {
        this.emit(":tell", "I am in Launch Request. " + WELCOME_MESSAGE + " " + HELP_MESSAGE);         
     },
    "DialCodeIntent": function() {
        var item = getItemCountry(this.event.request.intent.slots);

        this.emit(":tell", getSpeechDescriptionCountry(item), REPROMPT_SPEECH);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    },
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    }
};

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

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

};


