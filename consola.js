var stompit = require('stompit');
var readline = require('readline-sync');
var yesno = require('yesno');


let connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': '', //'arancha',
    'passcode':  '', //'12345',
    'heart-beat': '5000,5000'
  }
};

let OFFICE1 = {
  temperature: {  // degrees
    min: 17,
    max: 27
  },
  illumination: {   // lumens
    min: 300,
    max: 750
  }
}

let OFFICE2 = {
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


console.log('\x1b[90m', 'Please, enter your credentials for start\x1b[0m');
enterCredentials()

stompit.connect(connectOptions, function(error, client) {

  if (error) {
    console.log('\x1b[31m', 'Connect error: ' + error.message, '\x1b[0m');
    return false;
  } else {
    console.log('\x1b[32m', 'Central console: Connected successfully to ActiveMQ', '\x1b[0m')
  }


  yesno.ask('Do you want to set actuators parameters?', false, function(ok) {
      if(ok) {
        setOfficeParameters()
        readSensorsData(client)
      } else {
        readSensorsData(client)
      }
  });


});

function readSensorsData(client) {
  readOffice1Temperature(client)
  readOffice1Ilumination(client)

  readOffice2Temperature(client)
  readOffice2Ilumination(client)
}



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


// UTILS

function setOfficeParameters() {

  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  console.log('-- Office 1 --')
  console.log('\t Temperature')

  let input = ''

  do {
    input = readline.question('-> Minimum: ')
    OFFICE1.temperature.min = parseInt(input, 10)
  } while( !validateInputType('number', input) )
  do {
    input = readline.question('-> Maximum: ')
    OFFICE1.temperature.max = parseInt(input, 10)
  } while( !validateInputType('number', input, OFFICE1.temperature.min) )
  console.log('\t Illumination')
  do {
    input = readline.question('-> Minimum: ')
    OFFICE1.illumination.min = parseInt(input, 10)
  } while( !validateInputType('number', input) )
  do {
    input = readline.question('-> Maximum: ')
    OFFICE1.illumination.max = parseInt(input, 10)
  } while( !validateInputType('number', input, OFFICE1.illumination.min) )

  console.log('-- Office 2 --')
  console.log('\t Temperature')
  do {
    input = readline.question('-> Minimum: ')
    OFFICE2.temperature.min = parseInt(input, 10)
  } while( !validateInputType('number', input) )
  do {
    input = readline.question('-> Maximum: ')
    OFFICE2.temperature.max = parseInt(input, 10)
  } while( !validateInputType('number', input, OFFICE2.temperature.min) )
  console.log('\t Illumination')
  do {
    input = readline.question('-> Minimum: ')
    OFFICE2.illumination.min = parseInt(input, 10)
  } while( !validateInputType('number', input) )
  do {
    input = readline.question('-> Maximum: ')
    OFFICE2.illumination.max = parseInt(input, 10)
  } while( !validateInputType('number', input, OFFICE2.illumination.min) )
}

function validateInputType(type, input, min) {
  let data = parseInt(input, 10)
  if(isNaN(data)) {
    return false;
  } else {
    if(validateMaxGreaterThanMin(data, min)){
      return true;
    } else {
      console.log('\x1b[31m', 'Maximum has to be greater than minimum\x1b[0m')
      return false;
    }
  }
}

function validateMaxGreaterThanMin(max, min) {
  if(min) {
    return (max > min)
  } else {
    return true
  }
}

function enterCredentials() {
  let login = readline.question('\x1b[90m Login: \x1b[0m')
  let passcode = readline.question('\x1b[90m Passcode: \x1b[0m')

  connectOptions.connectHeaders.login = login
  connectOptions.connectHeaders.passcode = passcode
}
