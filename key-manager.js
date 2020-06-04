// This file manages the keys in the files
const fs = require('fs')
const chalk = require('chalk')
const cryptoUtil = require('crypto-js');

const master_password_file_name = 'master_password.txt';

const init_wallet_with_master_password = function (master_password){
    var isMasterPasswordFileExists = fs.existsSync(master_password_file_name);
    if(isMasterPasswordFileExists){
        console.log(chalk.red("Master Password File is already exists. Initialization is aborted!.") );
    } else{
        var passwordHash = cryptoUtil.SHA256(master_password);
        console.log('Master Password Hash: '+passwordHash);
        fs.writeFileSync("master_password.txt",passwordHash.toString());
        console.log(chalk.green("Master Password File has been created successfully!.") );
    }
}

const open_wallet_with_master_password = function (master_password){
    var isMasterPasswordFileExists = fs.existsSync(master_password_file_name);
    if(!isMasterPasswordFileExists){
        console.log(chalk.red("The system can not find the Master Password file. The Password Wallet can not be opened!.") );
    } else{
        var passwordHashGiven = cryptoUtil.SHA256(master_password);
        var passwordHashOriginal = fs.readFileSync("master_password.txt");
        if(passwordHashGiven.toString()===passwordHashOriginal.toString())
            console.log(chalk.green("Master Password File is opened successfully!.") );
        else
        console.log(chalk.red("Master Password is incorrect!.") );
    }
}

module.exports = {
    init_wallet_with_master_password:init_wallet_with_master_password,
    open_wallet_with_master_password:open_wallet_with_master_password
}