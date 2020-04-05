const ConfigStore = require('configstore');
const inquirer = require('inquirer');
class CredentialManager {
    constructor(name) {
        this.conf = new ConfigStore(name);
    }
    async getKeyAndSecret() {
        let key = this.conf.get('apiKey');
        if (key) {
            let secret = this.conf.get('apiSecret');
            return [key, secret];
        } else {
            let answers = await inquirer.prompt([
                { type: 'input', name: 'key', messege: "Enter your API Key:" },
                { type: 'password', name: 'secret', message: 'Enter your secret key' }
            ]);
            this.conf.set('apiKey', answers.key);
            this.conf.set('apiSecret', answers.secret);
            return [answers.key, answers.secret];
        }
    }

}

module.exports = CredentialManager;