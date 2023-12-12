const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/pdf', async (req, res) => {
    const drivePDFLink = 'https://drive.google.com/uc?export=download&id=1uB06JXGhqLlH1jnNjw_L7HeHisMqDlef';

    try {
        const response = await fetch(drivePDFLink);
        const buffer = await response.buffer();
        res.contentType('application/pdf');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching PDF from Google Drive');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
