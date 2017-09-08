const express = require('express');
const app = express();
const port = process.env.PORT || 4040;

app.use(express.static('public'));

app.listen(port, function() {
  console.log('travel_books running on port: ', port);
});
