const express = require('express');
const app = express();
const port = 4000;

app.post('/', (req, res) => {
  console.log('as');
  var validationEventType = 'Microsoft.EventGrid.SubscriptionValidationEvent';

  for (var events in req.body) {
    var body = req.body[events];
    // Deserialize the event data into the appropriate type based on event type
    if (body.data && body.eventType == validationEventType) {
      context.log(
        'Got SubscriptionValidation event data, validation code: ' +
          body.data.validationCode +
          ' topic: ' +
          body.topic
      );

      // Do any additional validation (as required) and then return back the below response
      var code = body.data.validationCode;
      context.res = { status: 200, body: { ValidationResponse: code } };
    }
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
