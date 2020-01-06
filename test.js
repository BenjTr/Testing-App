var app = require('./st2tst_js.js')
const jsdom = require('jsdom')
const describe = require("mocha").describe
const before = require("mocha").before
const it = require("mocha").it
const { JSDOM } = jsdom
var expect = require('chai').expect

describe('checkEmail()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
            })
    })
    it('check that no error is displayed when email is correct', function () {
        document.getElementById("email").value="john.doe@mail.fr"
        app.checkEmail();
        expect(document.getElementById("errorEmail").style.display).to.equal("none")

        document.getElementById("email").value="john.doe@mail.com"
        app.checkEmail();
        expect(document.getElementById("errorEmail").style.display).to.equal("none")
    })
    it('check that an error is displayed when the email is incorrect', function () {
        document.getElementById("email").value="john.doe@mail.net"
        app.checkEmail();
        expect(document.getElementById("errorEmail").style.display).to.equal("block")

        document.getElementById("email").value="john.doe@mail"
        app.checkEmail();
        expect(document.getElementById("errorEmail").style.display).to.equal("block")
    })
})
