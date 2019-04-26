
const Alexa = require('ask-sdk-core');

//======================COMMON OUTPUTS=======================================

const opening = "<audio src='soundbank://soundlibrary/magic/amzn_sfx_fairy_sparkle_chimes_01'/>";

const skill='YinYang name';

const greetings = ['Hello! ','Hi there! ','Hi, '];

const welcomeOutput = " welcome to " + skill + ". The power of the balance between good and bad will help me to analyze your first name. You will know if your name is helping or hurting you... ";

const welcomeReprompt ="You alreeady opened " + skill +". " ;

const helpOutput = skill+' will help you to analyze your name, to start, try to say: " I want to analyze my name" ';

const helpReprompt = 'Try to say "I want to analyze my name".';

const bye = ['Good bye! ','Bye! ','See you later!'];

const endOutput = "​Thank you for trying" +skill+ ". Remember your balanced name can both help you and hurt you! "+ getRandomPhrase(bye);

const questionHealth = '<break time="1s"/> Do you want to hear your health analysis?';

const lastQuestion= '<break time="1s"/>  What do you want now? Your options are: "Try another name" or "stop"';

function randomPrompt(slot){     //returns random phrase personalized with an slot or manual string and split it i.e: randomPrompt(firstName)----> What is your first name?
    var str=slotToString(slot);
     const prompt = [
    'I need to know your '+str,
    'Please, tell me your '+str+'...',
    'What is your '+str+'?',
    'Can you tell me your '+str+'...?',
    ];
    return getRandomPhrase(prompt);
    }

function nameAnalysisAlgorithm (handlerInput){   // I developed this algorithm to associate names with descriptions it involves the length of the name,and the alphabetical position of their letters. The nº of phrases can be increased.
const attributes = handlerInput.attributesManager.getSessionAttributes();
  const  firstName= attributes.savedSlots.firstName.value;
  const  gender= attributes.savedSlots.gender.value;

    const nameIntroduction = [
        'Analyzing your name ' + firstName+'... ',
        'Great '+ firstName+'. I got your analysis... ',
        firstName + ', I finished to analyze your name... ',
    ];
    const positiveAnalysis= [    //because the balance number of positive phrases and negative must be the same.
        firstName + ' brings opportunities for success in business and financial accumulation. ',
        'Your name gravitates to positions where there is stability, security and opportunities to work with others to make steady progress. ',
        'You denotes that you could be very skilful in dealing with technical and mechanical matters. ',
        'You appreciate details, precision, and system and order. ',
        'Your name of '+firstName+' makes you very idealistic and generous, with the strong desire to uplift humanity leading you into situations where you can express your desire to serve others. ',
        'You want to assume responsibilities and to look after people; however, you can become too involved in other people problems and tend to worry. ',
        'Your name gives you a natural desire to express along artistic and musical lines. ',
        'You desire a settled home and family life, and are expressive and attentive to your loved ones. ',
        'You like to work at your own speed, without pressure, as you prefer to take your time to work step by step in your own way. ',
        'Your name indicates you are a diligent and persevering worker who enjoys a routine occupation where you can do a job well and finish what you start. ',
        'The name of '+firstName+' leads you to assume considerable responsibility and to prefer to work independently, without direction or interference from others because you have very definite ideas of your own. ',
        'Your mind is quick to comprehend and you can be depended upon to do any job well. ',
        'Your name of '+firstName+' gives you self-assurance, independence, and confidence. ',
        'You have depth of mind and the ability to concentrate and to follow a line of thought to a logical conclusion. ',
        'Your love of challenging the concepts of others invariably leads you to create your own ideas and to pioneer new lines of thought. ',
        'Your strong characteristic of individuality qualifies you as a leader. '
    ];
    const negativeAnalysis=[    //because the balance number of positive phrases and negative must be the same.
        'These qualities, can make you too fussy, from time to time, over inconsequential matters.',
        'You do not take to changes easily and can be quietly stubborn.',
        'You do rely on the support and encouragement of others as there is an underlying lack of confidence with this name.',
        'In addition, many times you procrastinate over making decisions.',
        'You must be careful not to become possessive and jealous of those close to you, however, as you could attract losses and unfortunate experiences.',
        'Your verbal expression does not reflect your inner thoughts and feelings, and you often wonder why people react to what you say.',
        'The influence of this name does not promote the friendship that you desire or the relaxation and naturalness you should enjoy with people.',
        'You have to be your own boss as it is most difficult for you to submit to direction from others.',
        'Obstacles and frustration can give rise to feelings of impatience, intolerance, and depression.',
        'The ever-present desire to progress does not allow you proper relaxation or the proper expression of the softer feminine qualities of sympathy, encouragement, and affection.',
        'Others may see you as rather shrewd and calculating.',
        'It is a name that makes you far too practical and serious-minded, and makes it difficult for you to act with spontaneity.',
        'Although you have a clever, quick, capable mind, your progress in life is restricted by instability in your affairs and misunderstandings with people.',
        'Relaxation is elusive, and depletion due to nervous tension can develop to the point where you become subject to moods of depression and morbid thoughts.',
        'Your impulsive nature can lead to actions which you later regret taking, or to accidents.'
    ];
    const healthAnalysis= [
        'The weakness of this name is in worry, which in turn affects the nervous system, creating a tendency to be highly strung or over-sensitive to the thoughts of others.',
        'Your fondness for excess quantities of heavy, starchy foods could cause stomach or intestinal disorders; you could also suffer with head tension, affecting the eyes, ears, sinus, or throat.',
        'You could suffer physically through head tension, with eye, teeth, or sinus problems, headaches, or mentally through worry.',
        'Problems with your health centre in your head and you could suffer with head tension, head colds, headaches, and sinus congestion. There is a strong tendency for you to worry.',
        'Physical weaknesses would show in your heart, lungs, or bronchial area.'
    ];
    var nameLen =firstName.length;
    var aceptedLen = Math.min(positiveAnalysis.length,negativeAnalysis.length)-1 ;
    var equation= [firstLetterPosition(firstName),lastLetterPosition(firstName)];
    var i;

    for (i=0;i<equation.length;i++) {
        equation[i] = equation[i]+nameLen;
        while (equation[i] > aceptedLen) {
            equation[i] = equation[i]-(nameLen*2);
            if (equation[i]<0){
            equation[i] = Math.abs(equation[i]);
            }
        }
    }
    var healthAlgorithm=equation[0]+equation[1];
    while ((healthAlgorithm<0)||(healthAlgorithm>healthAnalysis.length-1)){
        healthAlgorithm=healthAlgorithm-nameLen;
        if(healthAlgorithm<0){
            healthAlgorithm=Math.abs(healthAlgorithm);
        }
    }

    let speechOutput;
    if(gender==='male'){
        speechOutput= (getRandomPhrase(nameIntroduction) + positiveAnalysis[equation[0]]+negativeAnalysis[equation[1]]);
    }
    if(gender==='female'){
        speechOutput= (getRandomPhrase(nameIntroduction) + positiveAnalysis[equation[1]]+negativeAnalysis[equation[0]]);
    }
    attributes.healthText= healthAnalysis[healthAlgorithm];
    attributes.nameText= speechOutput;
    attributes.completed= true;

    handlerInput.attributesManager.setSessionAttributes(attributes);

    return speechOutput;
}

//==========================QUICK FUNCTIONS=========================================

function slotToString(slot){
    String(slot);
    var  str= slot.split(/(?=[A-Z])/).join(" ").toLowerCase();
    return str;
}

function firstLetterPosition(text) {
    var splitedName = text.split('');
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    var firstLetter=alphabet.indexOf(splitedName[0].toLowerCase()) + 1;
    return firstLetter;
}

function lastLetterPosition(text) {
    var splitedName = text.split('');
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    var len = splitedName.length-1;
	var lastLetter = alphabet.indexOf(splitedName[len].toLowerCase()) + 1;
  return lastLetter;
}

function getRandomPhrase(array) {
    const i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

//======================HANDLERS==============================================


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(opening + getRandomPhrase(greetings)+welcomeOutput +randomPrompt("first name"))
            .reprompt(helpOutput)
            .getResponse();
    }
};


const InProgressNameAnalysisIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        return request.type === 'IntentRequest' &&
            request.intent.name === 'nameAnalysisIntent' &&
            request.dialogState !== 'COMPLETED'&&
            attributes.completed !== true
           ;
    },
    handle(handlerInput) {
        console.log('in progrress handler', JSON.stringify(handlerInput))
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        if(attributes.state){
            attributes.state=null;
        }

        const currentIntent = handlerInput.requestEnvelope.request.intent;
        let slots = currentIntent.slots;
        let badInputSlot;

        for (let x in slots) {
            if (slots.hasOwnProperty(x) && slots[x].hasOwnProperty('value')) {
                switch(x){
                    case 'firstName':
                        if (slots[x].resolutions.resolutionsPerAuthority[0].status.code==='ER_SUCCESS_MATCH'){         // this line is to validate JUST the manes or nicks added manually.
                            break;
                        }                                                   // If a slot matches with the value of a built-in slot it returns 'ER_SUCCESS_NO_MATCH' and we cannot validate them directly, so
                        const capitalLetter = /^[A-Z]/;                      //I created this case to be sure that it got a real name from the built-in slots. I realized that when a real name is found in AMAZON.FIRST_NAME
                        let firstName = slots.firstName.value;               // from an input, the input get the value from the built-in slots as it is saved, with the capital letter, i.e: input-->"I am jessica" if it's in AMAZON.FIRST_NAME
                        if (!firstName.match(capitalLetter)) {               // slot is fulfilled with 'Jessica' instead of 'jessica'.  It can be used with cities as well.
                        badInputSlot = x;
                        }
                    break;

                    default:
                        if (slots[x].resolutions.resolutionsPerAuthority[0].status.code==='ER_SUCCESS_NO_MATCH') {          //Valid for all not built-in slots
                            badInputSlot = x;
                        }
                    break;
                }
            }
        }
        if (badInputSlot) {
            return handlerInput.responseBuilder.speak("Sorry, I couldn't recognize your "+slotToString(badInputSlot)+". "+randomPrompt(badInputSlot))
            .reprompt(randomPrompt(badInputSlot))
            .addElicitSlotDirective(badInputSlot, currentIntent)
            .getResponse();
        }
        else {
            //attributes.savedSlots = slots;

           // handlerInput.attributesManager.setSessionAttributes(attributes);
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
    },
};

const CompletedNameAnalysisHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        return request.type === 'IntentRequest' &&
        request.intent.name === 'nameAnalysisIntent'&&
        attributes.completed !== true;
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const savedSlots = handlerInput.requestEnvelope.request.intent.slots;
        attributes.savedSlots= savedSlots;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        const speechAnalysis=nameAnalysisAlgorithm(handlerInput);

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechAnalysis+questionHealth)
            .reprompt(questionHealth)
            .getResponse();
    },
};


const healthAnalysisHandler = {
    canHandle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'healthAnalysisIntent'
            &&attributes.completed === true
    },
    handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        let health = currentIntent.slots.health.value;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        let healthText=attributes.healthText;
        const responseBuilder = handlerInput.responseBuilder;
        if(health==='no'){
            attributes.completed=false;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return responseBuilder
            .speak(lastQuestion)
            .reprompt()
            .getResponse();
        }
        if(health==='yes'){
            attributes.completed=false;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return responseBuilder
            .speak(healthText+ lastQuestion)
            .reprompt()
            .getResponse();
        }
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
        .speak(helpOutput)
        .reprompt(helpReprompt)
        .getResponse();
    },
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(endOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
        .speak()
        .getResponse();
    }
};


const IntentCatcherHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        if(handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'){
            const speechText = "OK, Let's start again. "+ randomPrompt("first name");
            attributes.completed=false;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .getResponse();
        }
        else{
            const speechText = "Sorry, I think your answer doesn't match with my question...Let's start again. Why don't you try saying, I want to analyze my name ";
             attributes.completed=false;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .getResponse();


        }

    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};



//===================================================================


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        InProgressNameAnalysisIntentHandler,
        CompletedNameAnalysisHandler,
        healthAnalysisHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentCatcherHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();
