const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Lar serveren forstå JSON som kommer inn
app.use(express.static('./')); // Serverer html-filen og json-filen din

// Dette er "Postkassen" som tar imot meldingene fra Frontend
app.post('/lagre-melding', (req, res) => {
    const nyMelding = req.body;

    // 1. Les filen først
    fs.readFile('chatlog.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Feil ved lesing');
        }

        let chatLog = JSON.parse(data);

        // --- HER ER MAGIEN ---
        if (nyMelding.message === "/slett") {
            // Hvis meldingen er nøyaktig "/slett", tømmer vi listen!
            chatLog = [];
            console.log("Chat-loggen er tømt av brukeren " + nyMelding.username);
        }
        else {
            // Hvis ikke, lagre som normalt
            chatLog.push(nyMelding);
        }
        // ---------------------

        // 2. Skriv resultatet tilbake til filen
        fs.writeFile('chatlog.json', JSON.stringify(chatLog, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Feil ved lagring');
            }
            // Send svar tilbake til frontend om at det gikk bra
            res.json({ status: "ok", action: nyMelding.message === "/slett" ? "cleared" : "saved" });
        });
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
/*
app.listen(port, () => {
    console.log(`Serveren kjører på http://localhost:${port}`);
});

*/