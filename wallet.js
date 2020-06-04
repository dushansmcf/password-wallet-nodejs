// This is the main script file where we do wallet initialization and password retrieval via commands
// Following are the required dependencies
//   npm i chalk@4.0.0
//   npm i yargs@15.3.1
//   npm i crypto-js@4.0.0
const yargs = require("yargs");
const chalk = require('chalk');
const keyman = require('./key-manager.js');

// get the command with options and execute
yargs.command({
    command: 'init',
    describe: 'Initializing the wallet with master password',
    builder: { 
        master_password:{
            describe: 'The Master Password for encryption and decryption',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        keyman.init_wallet_with_master_password(argv.master_password);
        console.log(chalk.green('The wallet has been initialized with the Master Password successfully!.'));
    }
});

yargs.command({
    command: 'open',
    describe: 'Opening the wallet with master password',
    builder: { 
        master_password:{
            describe: 'The Master Password for encryption and decryption',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        keyman.open_wallet_with_master_password(argv.master_password);
    }
});

yargs.parse();