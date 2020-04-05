#! /usr/bin/env node

const CredentialManager = require('../lib/credential-manager');
const creds = new CredentialManager('news');
async function main() {
    let [key, secret] = await creds.getKeyAndSecret();
    console.log(key, secret);
}

main().catch(console.error);