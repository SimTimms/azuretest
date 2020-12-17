const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body[0].data);
  console.log(req.body[0].data.authorization);

  var header = req.get('Aeg-Event-Type');
  if (header && header === 'SubscriptionValidation') {
    var event = req.body[0];
    var isValidationEvent =
      event &&
      event.data &&
      event.data.validationCode &&
      event.eventType &&
      event.eventType == 'Microsoft.EventGrid.SubscriptionValidationEvent';
    if (isValidationEvent) {
      return res.send({
        validationResponse: event.data.validationCode,
      });
    }
  }

  // Do something on other event types
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
