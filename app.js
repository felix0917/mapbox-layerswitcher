let express = require('express');
let app = express();

app.get('/examples', (req, res) => {
    res.send('examples');
})

app.use(express.static('build'));
app.use(express.static('examples'));

app.listen(3000, () => {
    console.log('examples listening on port 3000');
})
