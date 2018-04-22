var stompit = require('stompit');

let connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'arancha',
    'passcode': '12345',
    'heart-beat': '5000,5000'
  }
};

const OFFICE1 = {
  temperature: {  // degrees
    min: 17,
    max: 27
  },
  illumination: {   // lumens
    min: 300,
    max: 750
  }
}

const OFFICE2 = {
  temperature: {  // degrees
    min: 14,
    max: 25
  },
  illumination: {   // lumens
    min: 500,
    max: 1000
  }
}

const actions = {
  increase: 'increase',
  decrease: 'decrease'
}


stompit.connect(connectOptions, function(error, client) {

  if (error) {
    console.log('Connect error: ' + error.message);
    return;
  } else {
    console.log('\x1b[32m', 'Central console: Connected successfully to ActiveMQ', '\x1b[0m')
  }

  readOffice1Temperature(client)
  readOffice1Ilumination(client)

  readOffice2Temperature(client)
  readOffice2Ilumination(client)

});



// --- OFFICE 1 ---

function readOffice1Temperature(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office1/temperature/sensor',
    'ack': 'client-individual'
  };

  client.subscribe(subscribeHeaders, function(error, message) {

    if (error) {
      console.log('Subscribe error: ' + error.message);
      return;
    }

    message.readString('utf-8', function(error, body) {

      if (error) {
        console.log('Read message error: ' + error.message);
        return;
      }

      let sensorValue = parseInt(body, 10)
      console.log('\x1b[7m', 'Temperature at Office 1: ' + sensorValue + ' degrees \x1b[0m');

      if(sensorValue < OFFICE1.temperature.min) {
        // increase actuator temperature
        sendAction(actions.increase, 'temperature', 'office1', client)
        console.log('-> Sent request to\x1b[35m Office 1\x1b[0m for ', '\x1b[31m', actions.increase , '\x1b[0m', ' its temperature actuator');
      } else if(sensorValue > OFFICE1.temperature.max) {
        // decrease actuator temperature
        sendAction(actions.decrease, 'temperature', 'office1', client)
        console.log('-> Sent request to\x1b[35m Office 1\x1b[0m for ', '\x1b[34m', actions.decrease , '\x1b[0m', ' its temperature actuator');
      }


      client.ack(message);
      //client.disconnect();
    });
  });
}

function readOffice1Ilumination(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office1/illumination/sensor',
    'ack': 'client-individual'
  };

  client.subscribe(subscribeHeaders, function(error, message) {

    if (error) {
      console.log('Subscribe error: ' + error.message);
      return;
    }

    message.readString('utf-8', function(error, body) {

      if (error) {
        console.log('Read message error: ' + error.message);
        return;
      }

      let sensorValue = parseInt(body, 10)
      console.log('\x1b[7m', 'Illumination at Office 1: ' + sensorValue + ' lumens \x1b[0m');

      if(sensorValue < OFFICE1.illumination.min) {
        // increase actuator illumination
        sendAction(actions.increase, 'illumination', 'office1', client)
        console.log('-> Sent request to\x1b[35m Office 1\x1b[0m for ', '\x1b[31m', actions.increase , '\x1b[0m', ' its illumination actuator');
      } else if(sensorValue > OFFICE1.illumination.max) {
        // decrease actuator illumination
        sendAction(actions.decrease, 'illumination', 'office1', client)
        console.log('-> Sent request to\x1b[35m Office 1\x1b[0m for ', '\x1b[34m', actions.decrease , '\x1b[0m', ' its illumination actuator');
      }


      client.ack(message);
      //client.disconnect();
    });
  });
}



// --- OFFICE 2 ---

function readOffice2Temperature(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office2/temperature/sensor',
    'ack': 'client-individual'
  };

  client.subscribe(subscribeHeaders, function(error, message) {

    if (error) {
      console.log('Subscribe error: ' + error.message);
      return;
    }

    message.readString('utf-8', function(error, body) {

      if (error) {
        console.log('Read message error: ' + error.message);
        return;
      }

      let sensorValue = parseInt(body, 10)
      console.log('\x1b[7m', 'Temperature at Office 2: ' + sensorValue + ' degrees \x1b[0m');

      if(sensorValue < OFFICE2.temperature.min) {
        // increase actuator temperature
        sendAction(actions.increase, 'temperature', 'office2', client)
        console.log('-> Sent request to\x1b[35m Office 2\x1b[0m for ', '\x1b[31m', actions.increase , '\x1b[0m', ' its temperature actuator');
      } else if(sensorValue > OFFICE2.temperature.max) {
        // decrease actuator temperature
        sendAction(actions.decrease, 'temperature', 'office2', client)
        console.log('-> Sent request to\x1b[35m Office 2\x1b[0m for ', '\x1b[34m', actions.decrease , '\x1b[0m', ' its temperature actuator');
      }


      client.ack(message);
      //client.disconnect();
    });
  });
}

function readOffice2Ilumination(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office2/illumination/sensor',
    'ack': 'client-individual'
  };

  client.subscribe(subscribeHeaders, function(error, message) {

    if (error) {
      console.log('Subscribe error: ' + error.message);
      return;
    }

    message.readString('utf-8', function(error, body) {

      if (error) {
        console.log('Read message error: ' + error.message);
        return;
      }

      let sensorValue = parseInt(body, 10)
      console.log('\x1b[7m', 'Illumination at Office 2: ' + sensorValue + ' lumens \x1b[0m');

      if(sensorValue < OFFICE2.illumination.min) {
        // increase actuator illumination
        sendAction(actions.increase, 'illumination', 'office2', client)
        console.log('-> Sent request to\x1b[35m Office 2\x1b[0m for ', '\x1b[31m', actions.increase , '\x1b[0m', ' its illumination actuator');
      } else if(sensorValue > OFFICE2.illumination.max) {
        // decrease actuator illumination
        sendAction(actions.decrease, 'illumination', 'office2', client)
        console.log('-> Sent request to\x1b[35m Office 2\x1b[0m for ', '\x1b[34m', actions.decrease , '\x1b[0m', ' its illumination actuator');
      }


      client.ack(message);
      //client.disconnect();
    });
  });
}


function sendAction(action, sensor, office, client) {
  var sendHeaders = {
    'destination': '/mtis_p4/' + office + '/' + sensor + '/actuator',
    'content-type': 'text/plain'
  };

  var frame = client.send(sendHeaders);
  frame.write(action);
  frame.end();
}
