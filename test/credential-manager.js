const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const inquirer = require('inquirer');
const credentialManager = require("../lib/credential-manager");


describe('a credential manager', () => {
    var creds
    before(() => {
        creds = new credentialManager('news-test');
    })
    context("with no existing credentials", () => {
        it('should prompt the user', async () => {
            sinon.stub(inquirer, 'prompt').resolves({ key: 'foo', secret: 'bar' })
            let [key, secret] = await creds.getKeyAndSecret();
            expect(key).to.equal('foo');
            expect(secret).to.equal('bar');
            inquirer.prompt.restore();
        })
    })
    after(() => {
        creds.conf.delete('apiKey');
        creds.conf.delete('apiSecret');
    })
})