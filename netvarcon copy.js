const { Receiver } = require('codesys-client');
const iec = require('iec-61131-3');

const util = require('util'); //util needed only for demo purposes

//Setting up new receiver
const receiver = new Receiver({
  LocalAddress:'10.20.60.1',  //IP address of Laptop or system on which Program will run
  ListeningPort: 1202 //UDP port defined in PLC (see above)
});

const NVL = iec.STRUCT({
  AI_IN1_NVL: iec.REAL,
	IN1_NVL:  iec.BOOL,
	IN2_NVL: iec.BOOL,
});

//Adding data handler(s)
receiver.addHandler(12, NVL, (data) => {
  //data is now as object that matches ST_DataToSend
  //Using util.inspect to display the whole object for demo purposes
  console.log(new Date(),`Data Recieved`, util.inspect(data, false, 999));
    
});

//Starting to listen for incoming data
receiver.listen()
  .then(res => console.log(`Listening UDP now to:`, res))
  .catch(err => console.log(`Failed to start listening. Error:`, err));
