var stompit = require('stompit');

let connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'arancha',
    'passcode': '12345',
    'heart-beat': '60000,60000'
  }
};

let temperatureAct = 20
let illuminationAct = 450

const actions = {
  increase: 'increase',
  decrease: 'decrease'
}


stompit.connect(connectOptions, function(error, client) {

  if (error) {
    console.log('Connect error: ' + error.message);
    return;
  } else {
    console.log('\x1b[32m', 'Office 1: Connected successfully to ActiveMQ', '\x1b[0m')
  }

  setInterval( () => {
    sendTemperature(client)
    sendIllumination(client)
  }, 5000 )

  listenTemperatureActuator(client)
  listenIluminationActuator(client)

});



// SENSORS

function sendTemperature(client) {
  var sendHeaders = {
    'destination': '/mtis_p4/office1/temperature/sensor',
    'content-type': 'text/plain'
  };

  let newTemp = Math.floor(Math.random() * 50) + 0;

  //console.log('hace ' + newTemp + ' grados de caloret')
  console.log('\x1b[7m # Temperature sensor: ' + newTemp + ' degrees  \x1b[0m')
  var frame = client.send(sendHeaders);
  frame.write(newTemp.toString());
  frame.end();
}


function sendIllumination(client) {
  var sendHeaders = {
    'destination': '/mtis_p4/office1/illumination/sensor',
    'content-type': 'text/plain'
  };

  let newIllum = Math.floor(Math.random() * 800) + 200;

  //console.log('hace ' + newIllum + ' lumenes de lúh')
  console.log('\x1b[7m # Illumination sensor: ' + newIllum + ' lumens \x1b[0m')
  var frame = client.send(sendHeaders);
  frame.write(newIllum.toString());
  frame.end();
}



// ACTUATORS

function listenTemperatureActuator(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office1/temperature/actuator',
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

      let actionColor = ''
      if(body === actions.increase) {
        temperatureAct = temperatureAct + 1;
        actionColor = '\x1b[31m'
      } else if(body === actions.decrease) {
        temperatureAct = temperatureAct - 1;
        actionColor = '\x1b[34m'
      }

      console.log('-> Requested action: ', actionColor, body, '\x1b[0m');
      console.log('Temperature actuator: ' + temperatureAct + ' degrees');

      client.ack(message);

      //client.disconnect();
    });
  });
}

function listenIluminationActuator(client) {

  var subscribeHeaders = {
    'destination': '/mtis_p4/office1/illumination/actuator',
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

      let actionColor = ''
      if(body === actions.increase) {
        illuminationAct = illuminationAct + 25;
        actionColor = '\x1b[31m'
      } else if(body === actions.decrease) {
        illuminationAct = illuminationAct - 25;
        actionColor = '\x1b[34m'
      }



      console.log('-> Requested action: ', actionColor, body, '\x1b[0m');
      console.log('Illumination actuator: ' + illuminationAct + ' lumens');

      client.ack(message);

      //client.disconnect();
    });
  });
}
