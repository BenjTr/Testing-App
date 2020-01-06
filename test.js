var app = require('./st2tst_js.js')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
var expect = require('chai').expect

describe('checkEmail()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('check that no error is displayed when email is correct', function () {
        document.getElementById("email").value = "john.doe@mail.fr"
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("none")

        document.getElementById("email").value = "john.doe@mail.com"
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("none")
    })
    it('check that an error is displayed when the email is incorrect', function () {
        document.getElementById("email").value = "john.doe@mail.net"
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("block")

        document.getElementById("email").value = "john.doe@mail"
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("block")
    })
    it('check that an error is displayed when the email is empty', function () {
        document.getElementById("email").value = ""
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("block")
    })
    it('check that no error is displayed when the email is long', function () {
        document.getElementById("email").value = "sfdiubfjsdbfudsdbiqsbfusdbibfdsbuoibgdsiubfdsiubfisdbgf@usudbfksdbufiusdbfisdubiugbdisubgdiusbg.fr"
        app.checkEmail()
        expect(document.getElementById("errorEmail").style.display).to.equal("none")
    })
})

describe('cadreChecked()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('check that nothing more is displayed when cadre is checked', function () {
        app.cadreChecked()
        expect(document.getElementById('div_qualification_etudiant').style.display).to.equal("none")
        expect(document.getElementById('listePatron').style.display).to.equal("none")
    })
})

describe('etudiantChecked()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('check that a list is displayed when Etudiant is checked', function () {
        app.etudiantChecked()
        expect(document.getElementById('div_qualification_etudiant').style.display).to.equal("block")
        expect(document.getElementById('listePatron').style.display).to.equal("none")
    })
})

describe('patronChecked()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('check that a list is displayed when patron is checked', function () {
        app.patronChecked()
        expect(document.getElementById('div_qualification_etudiant').style.display).to.equal("none")
        expect(document.getElementById('listePatron').style.display).to.equal("block")
    })
})

describe('fonctionnaireChecked()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('check that a list is displayed when fonctionnaire is checked', function () {
        app.fonctionnaireChecked()
        expect(document.getElementById('div_qualification_etudiant').style.display).to.equal("none")
        expect(document.getElementById('listePatron').style.display).to.equal("none")
    })
})

describe('checkBirth()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })

    })
    it('no error is displayed when user is adult and the date is before today', function () {
        app.onLoadFunction()
        document.getElementById("jDn").value = "01"
        document.getElementById("mDn").value = "06"
        document.getElementById("aDn").value = "1997"
        app.checkBirth()
        expect(document.getElementById('errorDateNaissance').style.display).to.equal("none")
        expect(document.getElementById('dateNaissanceMineur').style.display).to.equal("none")
    })
    it('error is displayed when user is minor and the date is before today', function () {
        app.onLoadFunction()
        document.getElementById("jDn").value = "01"
        document.getElementById("mDn").value = "06"
        document.getElementById("aDn").value = "2005"
        app.checkBirth()
        expect(document.getElementById('errorDateNaissance').style.display).to.equal("none")
        expect(document.getElementById('dateNaissanceMineur').style.display).to.equal("block")
    })
    it('error is displayed when the date is after today', function () {
        app.onLoadFunction()
        document.getElementById("jDn").value = "01"
        document.getElementById("mDn").value = "06"
        document.getElementById("aDn").value = "2040"
        app.checkBirth()
        expect(document.getElementById('errorDateNaissance').style.display).to.equal("block")
        expect(document.getElementById('dateNaissanceMineur').style.display).to.equal("none")
    })
    it('no error is displayed when birthday is today', function () {
        app.onLoadFunction()
        let today = new Date()
        document.getElementById("jDn").value = today.getDay()
        document.getElementById("mDn").value = today.getMonth()
        document.getElementById("aDn").value = today.getFullYear()
        app.checkBirth()
        expect(document.getElementById('errorDateNaissance').style.display).to.equal("none")
        expect(document.getElementById('dateNaissanceMineur').style.display).to.equal("none")
    })
})

describe('checkCityDijon()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })

    })
    it('background is white if city is Dijon and postCode too', function () {
        var codePostal = document.getElementById('codePostal').value = '21000'
        var ville = document.getElementById('ville').value = 'Dijon'
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('white')
    })
    it('background is white if city is Paris and postcode is not the same', function () {
        var codePostal = document.getElementById('codePostal').value = '77135'
        var ville = document.getElementById('ville').value = 'Paris'
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('white')
    })
    it('background is yellow if city is other than Dijon and postcode is 21000', function () {
        document.getElementById('codePostal').value = '21000'
        document.getElementById('ville').value = 'Paris'
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('rgb(255, 214, 116)')
    })
    it('background is white if city and postcode are not entered', function () {
        document.getElementById('codePostal').value = ''
        document.getElementById('ville').value = ''
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('white')
    })
    it('background is white if city changed to Dijon after being yellow', function () {
        document.getElementById('codePostal').value = '21000'
        document.getElementById('ville').value = 'Paris'
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('rgb(255, 214, 116)')
        document.getElementById('ville').value = 'Dijon'
        app.checkCityDijon()
        expect(document.getElementById('ville').style.background).to.equal('white')
    })
})

describe('checkCodePostal()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })

    })
    it('show error if postcode is too long', function () {
        document.getElementById('codePostal').value = '25400000'
        app.checkCodePostal()
        expect(document.getElementById('errorCodePostal').style.display).to.equal('block')
    })
    it('show error if postcode is too short', function () {
        document.getElementById('codePostal').value = '21'
        app.checkCodePostal()
        expect(document.getElementById('errorCodePostal').style.display).to.equal('block')
    })
    it('show error if postcode has letters', function () {
        document.getElementById('codePostal').value = '21Ad0'
        app.checkCodePostal()
        expect(document.getElementById('errorCodePostal').style.display).to.equal('block')
    })
    it('fills city field with Dijon if is 21000', function () {
        document.getElementById('codePostal').value = '21000'
        app.checkCodePostal()
        expect(document.getElementById('ville').value).to.equal('Dijon')
    })

    it('hide error message if postcode is corrected', function () {
        document.getElementById('codePostal').value = '21Ad0'
        app.checkCodePostal()
        expect(document.getElementById('errorCodePostal').style.display).to.equal('block')
        document.getElementById('codePostal').value = '77135'
        app.checkCodePostal()
        expect(document.getElementById('errorCodePostal').style.display).to.equal('none')
    })

})

describe('checkMineur()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('should return true when passing minor birth date', function () {
        today = new Date('2018-01-01')
        dateBirth = new Date('2001-01-01')
        expect(app.checkMineur(today, dateBirth)).to.equal(true)
    })
    it('should return false when a brand new adult', function () {
        today = new Date('2018-01-01')
        dateBirth = new Date('2000-01-01')
        expect(app.checkMineur(today, dateBirth)).to.equal(false)
    })
    it('should return true when is old adult', function () {
        today = new Date('2018-01-01')
        dateBirth = new Date('1940-01-01')
        expect(app.checkMineur(today, dateBirth)).to.equal(false)
    })
})

describe('checkNumTelephone()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('should display domicile and portable error when numbers are too long', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "06216518165161"
        portable.value = "06216554654361"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')
    })
    it('should display domicile and portable error when numbers are too short', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "062161"
        portable.value = "062401"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')
    })
    it('should display domicile and portable error when phone numbers have letters', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "062167501A"
        portable.value = "062401B847"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')
    })
    it('should not display domicile error when only portable is false', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "0621675019"
        portable.value = "062401B847"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('none')
    })
    it('should not display portable error when only domicile is false', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "0621675016846519"
        portable.value = "0624018847"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('none')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')
    })
    it('should clean error message after displaying one', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "0621675019fsdfsdf"
        portable.value = "062401B84fgdgsgdfhs7"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')

        domicile.value = "0621675019"
        portable.value = "0624018847"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('none')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('none')
    })
    it('should not display error message if numbers are correct', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "0121675028"
        portable.value = "0624017847"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('none')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('none')
    })
})

describe('resetForm()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('should reset the form and all errors', function () {
        domicile = document.getElementById('telephoneDomicile')
        portable = document.getElementById('telephonePortable')
        domicile.value = "0621958986518165161"
        portable.value = "0621655465454654361"
        app.checkNumTelephone(domicile)
        app.checkNumTelephone(portable)
        expect(document.getElementById('errorNumPortable').style.display).to.equal('block')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('block')

        document.getElementById("email").value = ""
        app.checkEmail()

        app.onLoadFunction()
        document.getElementById("jDn").value = "01"
        document.getElementById("mDn").value = "06"
        document.getElementById("aDn").value = "2005"
        app.checkBirth()

        app.patronChecked()

        document.getElementById("email").value = ""
        app.checkEmail()

        app.resetForm()

        //Checking errors displaying
        expect(document.getElementById('errorNumPortable').style.display).to.equal('none')
        expect(document.getElementById('errorNumDomicile').style.display).to.equal('none')
        expect(document.getElementById('errorCodePostal').style.display).to.equal('none')
        expect(document.getElementById('errorDateNaissance').style.display).to.equal('none')
        expect(document.getElementById('dateNaissanceMineur').style.display).to.equal('none')
        expect(document.getElementById('listePatron').style.display).to.equal('none')

        expect(document.getElementById('email').value).to.equal('')
        expect(document.getElementById('jDn').value).to.equal('01')
        expect(document.getElementById('mDn').value).to.equal('01')
        expect(document.getElementById('aDn').value).to.equal('1900')
        expect(document.getElementById('telephoneDomicile').value).to.equal('')
        expect(document.getElementById('telephonePortable').value).to.equal('06')
    })
})

describe('validateForm()', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('Filling correctly the form should render a page with all the details', function () {
        app.onLoadFunction()
        document.getElementById('nom').value = 'Nicolas'
        document.getElementById('jDn').value = '01'
        document.getElementById('mDn').value = '02'
        document.getElementById('aDn').value = '1997'
        document.getElementById('telephonePortable').value = '0621675015'
        document.getElementById('telephoneDomicile').value = '0164663888'
        document.getElementById('rue').value = '8 rue urgons'
        document.getElementById('ville').value = 'Roissy-en-Brie'
        document.getElementById('codePostal').value = '77136'
        document.getElementById('email').value = 'aGoodMail@hotmail.fr'
        document.getElementsByName('profession').forEach(radioButton => {
            if (radioButton.value == 'Patron') {
                radioButton.checked = true
            }
        })
        document.getElementsByName('qualification_etudiant').forEach(checkbox => {
            if (checkbox.value == 'Motivé') {
                checkbox.checked = true
            }
            if (checkbox.value == 'Intelligent') {
                checkbox.checked = true
            }
        })
        app.validateForm()
        let expectedResult = "<head></head><body><h1>Résumé de vos informations</h1><p>M/Mme Nicolas est né(e) le 01/02/1997. M/Mme Nicolas est étudiant(e) et intelligent(e) et motivé(e) . </p>Ses coordonées sont les suivantes : <ul><li><p>Téléphone portable : 0621675015</p></li><li><p>Téléphone fixe : 0164663888</p></li><li><p>Adresse : 8 rue urgons Roissy-en-Brie 77136</p></li><li><p>Adresse email : aGoodMail@hotmail.fr</p></li></ul></body>"
        expect(document.documentElement.innerHTML).to.equal(expectedResult)
    })


})

describe('validateForm nominal case', function () {
    before(function () {
        return JSDOM.fromFile('ST2TST_Sample_App.html')
            .then((dom) => {
                global.window = dom.window
                global.document = window.document
            })
    })
    it('Filling correctly the form should render a page with all the details', function () {
        app.onLoadFunction()
        document.getElementById('nom').value = 'Nicolas'
        document.getElementById('jDn').value = '01'
        document.getElementById('mDn').value = '02'
        document.getElementById('aDn').value = '1997'
        document.getElementById('telephonePortable').value = '0621675015'
        document.getElementById('telephoneDomicile').value = '0164663888'
        document.getElementById('rue').value = '8 rue urgons'
        document.getElementById('ville').value = 'Roissy-en-Brie'
        document.getElementById('codePostal').value = '77136'
        document.getElementById('email').value = 'aGoodMail@hotmail.fr'
        document.getElementsByName('profession').forEach(radioButton => {
            if (radioButton.value == 'Patron') {
                radioButton.checked = true
            }
        })
        document.getElementsByName('listePatron').value = '1..10'
        app.validateForm()
        let expectedResult = "<head></head><body><h1>Résumé de vos informations</h1><p>M/Mme Nicolas est né(e) le 01/02/1997. M/Mme Nicolas est patron(ne) et la valeur de la liste est : 1..10. </p>Ses coordonées sont les suivantes : <ul><li><p>Téléphone portable : 0621675015</p></li><li><p>Téléphone fixe : 0164663888</p></li><li><p>Adresse : 8 rue urgons Roissy-en-Brie 77136</p></li><li><p>Adresse email : aGoodMail@hotmail.fr</p></li></ul></body>"
        expect(document.documentElement.innerHTML).to.equal(expectedResult)
    })

})
