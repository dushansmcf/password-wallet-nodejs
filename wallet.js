// This is the main script file where we do wallet initialization and password retrieval via commands
// Following are the required dependencies
//   npm i chalk@4.0.0
//   npm i yargs@15.3.1
//   npm i crypto-js@4.0.0
const yargs = require("yargs");
const chalk = require('chalk');
const keyman = require('./wallet-manager.js');

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
    command: 'add',
    describe: 'Inserting data into wallet with master password',
    builder: { 
        master_password:{
            describe: 'The Master Password for encryption and decryption',
            demandOption: true,
            type: 'string'
        },
        name:{
            describe: 'The name of the website',
            demandOption: true,
            type: 'string'
        },
        uname:{
            describe: 'The username of the website',
            demandOption: true,
            type: 'string'
        },
        passwd:{
            describe: 'The password of the website',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        keyman.add_data_into_wallet(argv.master_password, argv.name, argv.uname, argv.passwd);
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
    handler(argv){
        keyman.open_wallet_with_master_password(argv.master_password);
    }
});

yargs.command({
    command: 'read',
    describe: 'Opening the wallet with master password',
    builder: { 
        master_password:{
            describe: 'The Master Password for encryption and decryption',
            demandOption: true,
            type: 'string'
        },
        name:{
            describe: 'The Site Name',
            demandOption: true,
            type: 'string'
        },
        uname:{
            describe: 'The Site User Name',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv){
        keyman.readSitePasswordFromTheWallet(argv.master_password,argv.name, argv.uname);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing all the names in the wallet with master password',
    builder: { 
        master_password:{
            describe: 'The Master Password for encryption and decryption',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        keyman.listAllNamesInWallet(argv.master_password);
    }
});

yargs.parse();