// This file manages the keys in the files
const fs = require('fs')
const chalk = require('chalk')
const cryptoUtil = require('crypto-js');

const master_password_file_name = 'master_password.txt';
const data_wallet_file_name = 'data_wallet.json';

const init_wallet_with_master_password = (master_password) => {
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

const open_wallet_with_master_password = (master_password) => {
    var isMasterPasswordFileExists = fs.existsSync(master_password_file_name);
    if(!isMasterPasswordFileExists){
        console.log(chalk.red("The system can not find the Master Password file. The Password Wallet can not be opened!.") );
        return false;
    } else{
        var passwordHashGiven = cryptoUtil.SHA256(master_password);
        var passwordHashOriginal = fs.readFileSync("master_password.txt");
        if(passwordHashGiven.toString()===passwordHashOriginal.toString()){
            console.log(chalk.green("Master Password File is opened successfully!.") );
            return true;
        } else{
            console.log(chalk.red("Master Password is incorrect!.") );
            return false;
        }
            

    }
}

const loadAllSiteDataFromWallet = () => {
    try{
        var dataBuffer = fs.readFileSync(data_wallet_file_name);
        var dataJsonStr = dataBuffer.toString();
        return JSON.parse(dataJsonStr);
    }catch(exception){
        console.log(chalk.red("Data file does not exist."))
        return [];
    }
}


const saveDataIntoWallet = (allData) => {
    var dataJsonStr = JSON.stringify(allData);
    fs.writeFileSync(data_wallet_file_name,dataJsonStr);
    console.log(chalk.green("Data has been written to the file successfully!"));

} 

const isDuplicateFound = (site_name, site_username, jsonData, master_password) => {
    var dataObj = jsonData.find( (data) => {
        var decryptedUname = getDecryptedData(master_password, data.uname);
        return (data.name === site_name) && (decryptedUname === site_username);
    })
    if(dataObj!= undefined && dataObj.uname.length>0){
        return true;
    } else {
        return false;
    }
}

const getDecryptedData = (master_password, ciperText) => {
    var bytesTemp  = cryptoUtil.AES.decrypt(ciperText, master_password);
    return bytesTemp.toString(cryptoUtil.enc.Utf8); 
}

const add_data_into_wallet = (master_password, site_name, site_username, site_password) => {
    if(open_wallet_with_master_password(master_password)){
        var jsonData = loadAllSiteDataFromWallet();
        if(!isDuplicateFound(site_name, site_username,jsonData, master_password)){
            var ciphertextPassword = cryptoUtil.AES.encrypt(site_password, master_password).toString();
            var ciphertextUsername = cryptoUtil.AES.encrypt(site_username, master_password).toString();
            jsonData.push({
                name: site_name,
                uname: ciphertextUsername,
                passwd: ciphertextPassword
            });
            saveDataIntoWallet(jsonData);
        } else {
            console.log(chalk.red("The Site Name: "+site_name+" is already exists. No data will be added newly."))
        }
    }
}

const readSitePasswordFromTheWallet = (master_password, site_name, site_username) => {
    if(open_wallet_with_master_password(master_password)){
        var jsonData = loadAllSiteDataFromWallet();
        if (jsonData!=[]){
            var dataObj = jsonData.filter( (data) => {
                return data.name === site_name
            })
            var exactObj = null;
            if(site_username != undefined){
                exactObj = dataObj.find((data) => {
                    return getDecryptedData(master_password, data.uname) === site_username;
                })
            }
            if(exactObj != undefined){
                console.log(chalk.blue("Username: "+getDecryptedData(master_password,exactObj.uname)));
                console.log(chalk.blue("Password: "+getDecryptedData(master_password,exactObj.passwd)));
            }else{
                dataObj.filter( (data) => {
                    console.log(chalk.blue("Username: "+getDecryptedData(master_password,data.uname)));
                    console.log(chalk.blue("Password: "+getDecryptedData(master_password,data.passwd))); 
                });
            }
            
        }
    }else{
        console.log(chalk.red("Can not open the wallet from the given master password!"))
    }


}


const listAllNamesInWallet = (master_password) => {
    if(open_wallet_with_master_password(master_password)){
        var jsonData = loadAllSiteDataFromWallet();
        if (jsonData!=[]){
            var dataObj = jsonData.filter( (data) => {
                console.log(chalk.green("-------------------------------------------"));
                console.log(chalk.blue("Site Name: "+data.name));
                console.log(chalk.blue("Site Username: "+getDecryptedData(master_password, data.uname)));
                console.log(chalk.green("-------------------------------------------"));
            });
        }
    }
}

module.exports = {
    init_wallet_with_master_password:init_wallet_with_master_password,
    add_data_into_wallet:add_data_into_wallet,
    readSitePasswordFromTheWallet : readSitePasswordFromTheWallet,
    listAllNamesInWallet : listAllNamesInWallet
}