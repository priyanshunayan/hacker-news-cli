const ConfigStore = require('configstore');
const inquirer = require('inquirer');
const keytar = require('keytar');
class CredentialManager {
    constructor(name) {
        this.conf = new ConfigStore(name);
        this.service = name;
    }
    async getKeyAndSecret() {
        let key = this.conf.get('apiKey');
        if (key) {
            let secret = await keytar.getPassword(this.service, key);
            return [key, secret];
        } else {
            let answers = await inquirer.prompt([
                { type: 'input', name: 'key', messege: "Enter your API Key:" },
                { type: 'password', name: 'secret', message: 'Enter your secret key' }
            ]);
            this.conf.set('apiKey', answers.key);
            await keytar.setPassword(this.service, answers.key, answers.secret);
            return [answers.key, answers.secret];
        }
    }

}

module.exports = CredentialManager;