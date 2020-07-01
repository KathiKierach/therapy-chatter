"use strict";

let hoerZu = [
    'Wie fühlst du dich dabei?',
    'Okay, erzähl mir mehr',
    'Verstehe',
    'Ja, kann ich nachvollziehen',
    'Kannst du das nochmal zusammenfassen?',
    'Wie geht es dir damit?',
    'Hmmm, ja. Was bewegt dich davon am meisten?',
    'Kannst du die Gefühle nennen die das in dir auslöst?',
    'Okay, ja, verstehe ich',
    'Führ das nochmal kurz aus'
]

let gibHilfe = [
    'Auf einer Skala von 1 bis 10, wie intensiv sind deine Gefühle zu der Situation?',
    'Wäre ein Freund in der gleichen Situation, was würdest du ihr oder ihm raten?',
    'Stell dir vor du bist 5 oder 10 Jahre in der Zukunft. Was würde dein Zukunfts-ich über die Situation sagen? Sei ruhig ausführlich mit der Antwort',
    'Hast du schon eine Liste gemacht mit Leuten oder Anlauf-Stellen die dir hier eine andere Perspektive geben können?',
    'Warst du schon mal in einer ähnlichen oder vergleichbaren Situation in der Vergangenheit? Was hat dir damals geholfen? Lass dir ruhig Zeit mit der Antwort und überleg'
]

let sagNettes = [
    'Ich bin stolz auf dich!',
    'Du hast es schon sehr weit gebracht, finde ich',
    'Du bist ein ganz schön schlauer Kopf und hast schon einiges geschafft :)',
    'Schön dass du da bist',
    'Ich finde es sehr angenehm mit dir zu schreiben',
    'Also wenn ich ehrlich bin, finde ich dass du eine sehr schöne Schnauze hast',
    'Du bist ein toller Mensch :D',
    'Wann hast du dich den zuletzt gefeiert? Ist doch wieder Zeit, oder?'
]

let anfangsArray = [
    'Leider sind meine Antworten nicht immer perfekt.',
    'Jedenfals schön dass du da bist',
    'Erzähl mir doch was grade bei dir los ist :)'
]


//Sonderfälle

let langesArray = [
    'Das ist echt eine ganze Menge. Da muss ich kurz nachdenken. Hm…. kannst du das nochmal für mich zusammenfassen?',
    'Ich sehe, das ist etwas komplizierter :O. Was würdest du sagen ist für dich das wichtigste davon?'
]

//Variablen
let offenesOhrBtn = document.querySelector("#offenesOhrBtn");
let tippsBtn = document.querySelector("#tippsBtn");
let netterBtn = document.querySelector("#netterBtn");

let offenesOhr = true; //ist der Standard-Antwort Button
let tipps = false;
let nett = false;
let vielText = false;


offenesOhrBtn.addEventListener("click", () => {
    offenesOhr = true;
    tipps = false;
    nett = false;
    console.log("Zuhören: " + offenesOhr);
});

tippsBtn.addEventListener("click", () => {
    tipps = true;
    offenesOhr = false;
    nett = false;
    console.log("Tipps: " + tipps);
});

netterBtn.addEventListener("click", () => {
    nett = true;
    offenesOhr = false;
    tipps = false;
    console.log("Kompliment: " + nett);
});


function chooseAnswer() {

    if (vielText) {
        botAnswer(langesArray);
        vielText = false;
    }

    //Wenn offenesOhrBtn geklickt...
    else if (offenesOhr) {
        botAnswer(hoerZu);
    }

    //Wenn tippsBtn geklickt...
    else if (tipps) {
        botAnswer(gibHilfe);
    }

    //Wenn netterBtn geklickt...
    else {
        botAnswer(sagNettes);
    }
}



// Legt Chat-Bubbles an
// Für User und Chatter
let DomElementAnlegen = ({
    content = 'default',
    typ = 'div',
    defaultClassSpeech = "speech",
    defaultClassClearfix = "clearfix",
    klasse = 'none',
    eltern = document.querySelector("#chatwindow")
} = {}) => {
    let neu = document.createElement(typ);
    neu.textContent = content;
    neu.classList.add(defaultClassSpeech, defaultClassClearfix);
    neu.classList.add(klasse);
    eltern.appendChild(neu);

    //Scrollbar ist unten
    chatWindow.scrollTop += 500;
}



//Hilfsfunktion
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//Variablen
let chatWindow = document.querySelector("#chatwindow");
let eingabeUser = document.querySelector("#inputField");
let absendBtn = document.querySelector("#sendBtn");
let inhalt;
let langeUserNachricht = 250;



//Absenden Inhalt über Button
absendBtn.addEventListener("click", (event) => {
    inhalt = eingabeUser.textContent;

    if (inhalt.length > langeUserNachricht) {
        vielText = true;
        console.log("Das war viel Text");
    }

    //Wenn Inhalt da, schickt er ab
    if (inhalt) {
        DomElementAnlegen({ content: inhalt, klasse: "right" });
        //zurücksetzten der eingabe
        eingabeUser.textContent = "";
        // botAnswer();

        //wertet aus welcher Zustand wahr/falsch ist, leitet dann weiter 
        // an die Bot-Antwort 
        chooseAnswer();
    }

});



// Die Antwort --- Verzögert
let randomEntry;
let antwortBot;
let dauerZufall = random(800, 1800);

function botAnswer(array) {

    //Variable mit zufälligem Eintrag aus dem Array
    randomEntry = random(0, (array.length - 1));

    //Sliced Nummer aus dem Array
    antwortBot = array.slice(randomEntry, randomEntry + 1);

    //Verzögert die Antwort und leitet weiter an die DOM-Funktion
    setTimeout(DomElementAnlegen, dauerZufall, { content: antwortBot, klasse: "left" });

}


//Intro-Worte... 
let myInterval;
let i = 0;
let anfangsZufall = 1500;

function firstWords(array) {

    myInterval = setInterval(function () {
        checkArrayDurchlaufen();
        anfangsZufall = random(1000, 5500)
        DomElementAnlegen({ content: anfangsArray[i], klasse: "left" });
        i++;
    }, anfangsZufall);


    function checkArrayDurchlaufen() {
        if (i > anfangsArray.length - 2) {
            clearInterval(myInterval);
        }
    }
}

firstWords(anfangsArray);

