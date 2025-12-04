
const Duckbutton = document.getElementById("secretbutton");
const secretinput = document.getElementById("secretinput");
const chatbutton = document.getElementById("chatbutton");
let saveddata = [];
function getdata() {
    fetch("./chatlog.json?v=" + Date.now())
        .then(response => response.json()) // Parse JSON
        .then(data => {
            saveddata = data;
            document.getElementById("chatlog").innerHTML = ""; //clear all chats
            data.forEach(entry => {
                    logpusher(entry);
                }
            ) // Work with JSON data
        })
}

fetch("./chatlog.json")
    .then(response => response.json()) // Parse JSON

    .then(data => {
        saveddata = data;


        // Nå er "data" en liste, så vi kan bruke .forEach direkte
        data.forEach(entry => {
                logpusher(entry);

            }
        ) // Work with JSON data


    })
    .catch(error => console.error('Error fetching JSON:', error));

        function logpusher(data) {
            const newP = document.createElement("p");
            newP.innerHTML = `<span style='color: blue; font-weight: bold;'>${data.username}</span>: ${data.message}`;
            document.getElementById("chatlog").appendChild(newP);
            const chatLog = document.getElementById("chatlog");
            chatLog.scrollTop = chatLog.scrollHeight;
        }


        Duckbutton.addEventListener("click", (e) => {
            if (secretinput.value === "andedammen") {
                window.location.href = "./dammen.html";
            } else {
                alert("FEJL!");
            }
        })
        const Countbutton = document.getElementById("counterbtn");
        const countervalue = document.getElementById("CounterValue");
        const titletext = document.getElementById("djswaxyrockstext");
        let counter = 0;
        Countbutton.addEventListener("click", (e) => {
            counter++;
            countervalue.innerText = "" + counter;
            if (counter % 2) {
                titletext.innerHTML = "djswaxy.rocks \\_0.O_/ "
            }
            else {
                titletext.innerHTML = "skcor.yxawsjd \\_0.O_/ "
            }

        })
// 21 + 14 + 14 + 14 Cards = 63 kort.
function hentDagensDikt() {

    fetch("./KinesiskeDikt.json")
        .then(response => response.json())
        .then(alleDikt => {
            // 1. Velg dikt basert på dato (samme logikk som sist)
            const iDag = new Date();
            const dagNummer = Math.floor(iDag.getTime() / (1000 * 60 * 60 * 24));
            const diktIndeks = dagNummer % alleDikt.length;

            const dagensDikt = alleDikt[diktIndeks];


            document.getElementById("diktTittel").innerHTML = dagensDikt.title || "Uten tittel";
            document.getElementById("diktForfatter").innerHTML = "Av: " + dagensDikt.author;
            document.getElementById("diktDynasti").innerHTML = "(" + dagensDikt.dynasty + "-dynastiet)";

            //fikser linjene
            let formatertTekst = dagensDikt.content.split("|").join("<br>");

            document.getElementById("diktTekst").innerHTML = formatertTekst;
        })
        .catch(error => console.error("Kunne ikke laste dikt:", error));
}

hentDagensDikt();
function Tarot() {
    const TarotRow = document.getElementById("TarotRow");
    const TarotDataRow = document.getElementById("TarotDataRow");
    document.getElementById("tarotmeaninglink").style.display = "flex";
    TarotRow.innerHTML = "";
    TarotDataRow.innerHTML = "";
    // Gjør kortene synlige.
    TarotRow.style.display = "flex";

    fetch("./tarot-images.json", {})
        .then(response => response.json()) // Parse JSON
    .then(data => {

        const cards = data.cards;
        let tarotcard1 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let tarotcard2 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let tarotcard3 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let cardnumber = 0;
        const valgteKort = [tarotcard1, tarotcard2, tarotcard3];


        valgteKort.forEach(kort => {
            let p = document.createElement("p");
            let img = document.createElement("img");
            let kortindex = kort[0];
            let retning = kort[1];
            let kortData = cards[kortindex];
            // Her kan du også legge til mer info, f.eks: kort.name + " (" + kort.number + ")"

            if (retning === 0) {
                 facing = "Upside Down"
                img.style.transform = "rotate(180deg)";
            }
            else {
                 facing = "Upright"
            }

            cardnumber++;
            p.innerHTML = "Card " + cardnumber +" - "+ "<strong>"+facing+": "+kortData.name +
                ": " + kortData.arcana+ "</strong>"+" "+ "suit: " + kortData.suit;
            p.style.color = "white";
            img.src = "./cards/" + kortData.img;
            img.width = 175;
            img.height = 300;
            TarotDataRow.appendChild(p);
            TarotRow.appendChild(img);
        });

    })
}
        let nameset = 0;
        let username = "";
        if (chatbutton) {
          chatbutton.addEventListener("click", pressedfirstquestion);
            }
        function pressedfirstquestion() {
            const chatinput = document.getElementById("chatinput");
            if (nameset === 0) {
                if (bannedslurs.includes(chatinput.value)) {
                    username = "iamstupid";
                }
                else {
                    username = chatinput.value;
                }

                chatinput.value = "";
                nameset++;
                document.getElementById("chatinput").placeholder = "type a message now!";

            } else {
                addchat(username);
            }

            function addchat(username) {
                const chatinput = document.getElementById("chatinput");
                let chatmessage = chatinput.value;
                const newP = document.createElement("p");
                if (bannedslurs.includes(chatmessage)) {
                    chatmessage = "iamstupid";
                }
                else if (chatmessage === "/hackermode") {
                    // Endre bakgrunnen på HELE siden
                    document.body.style.backgroundColor = "black";
                    document.body.style.fontFamily = "Courier New, monospace";

                    // Endre selve chat-boksen (ID chatlog)
                    const chatLog = document.getElementById("chatlog");
                    chatLog.style.backgroundColor = "black";
                    chatLog.style.color = "#00FF00"; // Grønn tekst


                    chatinput.value = "";
                    return;
                }
                else if (chatmessage === "/normalmode") {
                    const chatLog = document.getElementById("chatlog");
                    document.body.style.backgroundColor = "";
                    chatLog.style.backgroundColor = "";
                    document.body.style.fontFamily = "";
                    document.getElementById("chatlog").style.color = "";
                    document.getElementsByClassName("ChatDiv").style.backgroundColor = "";
                    chatLog.style.border = ""; // Kul grønn kantlinje
                    chatinput.value = "";
                    return;
                }
                else {

                }
                const newEntry = {
                    username: username,
                    message: chatmessage,
                };
                //logpusher(newEntry);
                saveddata.push(newEntry);

                fetch("./lagre-melding", {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEntry)

                })

            .then(response => response.json())
                .then(data => {
                    if (data.action === "cleared") {
                        document.getElementById("chatlog").innerHTML = "";
                        alert("🧹 Chatten er tømt!");
                    }
                    else {
                        logpusher(newEntry);
                    }

                })
                chatinput.value = "";
            }
        }
        setInterval(getdata,1000);
// Sjekk etter nye meldinger hvert 2. sekund (2000ms)
/*setInterval(() => {
    fetch("./chatlog.json")
        .then(response => response.json())
        .then(data => {
            // Hvis serveren har FLERE meldinger enn oss -> Legg til de nye
            if (data.length > saveddata.length) {
                // Hent bare de nye meldingene (slice)
                const newMessages = data.slice(saveddata.length);

                newMessages.forEach(entry => logpusher(entry));
                saveddata = data; // Oppdater hukommelsen vår
            }
            // Hvis serveren har FÆRRE meldinger (noen skrev /slett) -> Tøm alt
            else if (data.length < saveddata.length) {
                document.getElementById("chatlog").innerHTML = "";
                saveddata = data;
            }
        });
}, 2000); */































































const bannedslurs = ["nigger", "nigga", "n1igger", "retard","homo","niggger","niggger","n!igger"]