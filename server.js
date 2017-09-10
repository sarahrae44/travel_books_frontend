const express = require('express');
const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log('travel_books running on port: ', 4040);
});
