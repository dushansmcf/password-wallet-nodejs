# password-wallet-nodejs
This is to organize all your passwords in one store and protect them with a master password. 

You have to memorize the master password but it is hassle free that you can maintain any number of account passwords in single wallet.

Further, if you have installed nodejs in your environment you can keep this program in your desktop environment as well. No body can read or steal your passwords out of this program.

## Installation
First, you have to initialize the application with the master password as follows;
```node
node wallet.js init --master_password="your password"
```
The above command will create a new text file called "master_password.txt" in your directory. Once initialized, you have to keep this file with the program directory always. You will not be able to open the wallet without this file hereafter.

### Insert data into wallet
You can add the data reference name, username and password in to the wallet as follows.
```node
node wallet.js add --master_password="your password" --name="my_gmail_account" --uname="dushanchamin@gmail.com" --passwd="My Gmail Account Password"
```
The above command will create another text file called "data_wallet.txt". This is the data store for the wallet and all usernames and passwords are encrypted. Therefore you can share this file in your cloud environment or any public place where you can access easily. 

### Read data in the wallet
You can read the data by its given reference name as follows.
```node
node wallet.js read --master_password="your password" --name="my_gmail_account"
```
Optionally you can give the username also.
```node
node wallet.js read --master_password="your password" --name="my_gmail_account" --uname="dushanchamin@gmail.com"
```

### List all data in the wallet
You can list all the references with the usernames in the wallet as follows.
```node
node wallet.js list --master_password="your password" --name="my_gmail_account"
```
To retrieve the sepcific password you have to run the 'read' command as above separately.

Hope you enjoy this small NodeJS Smart Wallet.

Thank You!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[APACHE] http://www.apache.org/licenses/LICENSE-2.0
