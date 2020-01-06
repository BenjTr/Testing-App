// Fonction faisant les appels de toutes les fonctions qui doivent être appelées au chargement de la page
function onLoadFunction() {
    document.getElementById('nom').focus()
    setJourDateDeNaissance()
    setMoisDateDeNaissance()
    setAnneeDateDeNaissance()
}

// Fonction qui créer la liste des jours pour la date de naissance
function setJourDateDeNaissance() {
    var select = document.getElementById('jDn')
    var i = 1
    var option
    for (i; i <= 31; i++) {
        option = document.createElement('option')
        if (i < 10) {
            option.text = '0' + i
            option.value = '0' + i
        } else {
            option.text = i
            option.value = i
        }
        select.add(option)
    }
}

// Fonction qui créer les listes des mois pour la date de naissance
function setMoisDateDeNaissance() {
    var select = document.getElementById('mDn')
    var i = 1
    var option
    for (i; i <= 12; i++) {
        option = document.createElement('option')
        if (i < 10) {
            option.text = '0' + i
            option.value = '0' + i
        } else {
            option.text = i
            option.value = i
        }
        select.add(option)
    }
}

// Fonction qui créer la liste des années pour la date de naissance
function setAnneeDateDeNaissance() {
    var select = document.getElementById('aDn')
    var i = 1900
    var option
    for (i; i <= 2100; i++) {
        option = document.createElement('option')
        option.text = i
        option.value = i
        select.add(option)
    }
}

// Fonction qui vérifie si la date de naissance est postérieure à la date
// du jour ou si la personne est mineure
function checkBirth() {
    // On récupère le champs date de naissance
    var dateNaissance = new Date(document.getElementById('aDn').value + '-' + document.getElementById('mDn').value + '-' + document.getElementById('jDn').value)
    // On récupère la date du jour
    var today = new Date()
    // Si date de naissance postérieure à la date du jour, on affiche l'erreur
    if (dateNaissance >= today) {
        document.getElementById('errorDateNaissance').style.display = 'block'
        // On cache le message en cas de mineur car elle n'a pas de sens de ce cas
        document.getElementById('dateNaissanceMineur').style.display = 'none'
    } else if (checkMineur(today, dateNaissance)) {
        // Si la personne est mineure on affiche le message
        document.getElementById('dateNaissanceMineur').style.display = 'block'
        // Et on cache celui de la date postérieure
        // (au cas où il aurait été affiché juste avant)
        document.getElementById('errorDateNaissance').style.display = 'none'
    } else {
        // Sinon on cache les messages (nettoyage)
        document.getElementById('errorDateNaissance').style.display = 'none'
        document.getElementById('dateNaissanceMineur').style.display = 'none'
    }
}

// Fonction qui vérifie si la personne est mineure
function checkMineur(today, dateNaissance) {
    // On récupère la date du jour
    var dateNaissanceMineur = new Date()
    // On set l'année de dateNaissanceMineur à la même que la date du jour moins
    // 18 ans afin de créer la date référence pour vérifier
    // si la personne est mineure
    dateNaissanceMineur.setYear(today.getFullYear() - 18)
    // On vérifie si la date de naissance est inférieure (mineur) à la date
    // de référence
    return dateNaissanceMineur < dateNaissance
}

// Fonction qui vérifie si le numéro de téléphone est correct.
// On passe en paramètre le champs pour pouvoir adapter le message
// (domicile ou mobile)
function checkNumTelephone(e) {
    // On récupère dans le document le numéro de téléphone
    var num = document.getElementById(e.id).value
    // Regex de vérification du numéro de téléphone (10 chiffres uniquement)
    var regex = /^[0-9]{10}$/
    // Résultat du test de l'éxactitude du numéro
    var estnumtelephone = regex.test(num)
    // Si le numéro n'est pas correct
    if (!estnumtelephone) {
        // Si le champs est celui du numéro de portable
        if (e.id == 'telephonePortable') {
            // On affiche le message d'erreur pour les portables
            document.getElementById('errorNumPortable').style.display = 'block'
        } else if (e.id == 'telephoneDomicile') {
            // Sinon on affiche celui pour le domocile
            document.getElementById('errorNumDomicile').style.display = 'block'
        }
    } else {
        // Sinon on cache les messages (nettoyage)
        if (e.id == 'telephonePortable') {
            document.getElementById('errorNumPortable').style.display = 'none'
            // Sinon on cache les messages (nettoyage)
        } else if (e.id == 'telephoneDomicile') {
            document.getElementById('errorNumDomicile').style.display = 'none'
        }
    }
}

// Fonction qui vérifie le code postal
function checkCodePostal() {
    // On récupère le code postal
    var codePostal = document.getElementById('codePostal').value
    // Regex de vérification du code postal (5 chiffres uniquement)
    var regex = /^[0-9]{5}$/
    // On récupère le résultat du test
    var estCodePostal = regex.test(codePostal)
    // Si le code postal est correct
    if (estCodePostal) {
        // On cache les messages (nettoyage)
        document.getElementById('errorCodePostal').style.display = 'none'
        // Le cas spécial du 21000
        if (codePostal == '21000') {
            // On réupère le champs ville et on lui donne la valeur Dijon
            document.getElementById('ville').value = 'Dijon'
        } else {
            // Sinon on remet le champs ville à vide
            document.getElementById('ville').value = ''
        }
    } else {
        // Sinon on cache les messages (nettoyage)
        document.getElementById('ville').value = ''
        document.getElementById('errorCodePostal').style.display = 'block'
    }
}

// Fonction qui vérifie si la ville est Dijon
function checkCityDijon() {
    // On récuèpre le code postal
    var codePostal = document.getElementById('codePostal').value
    // On récupère la ville
    var ville = document.getElementById('ville').value
    // Si le code postal est celui de Dijon mais que la ville n'est pas Dijon
    if (codePostal == '21000' && ville.toLowerCase() != 'dijon') {
        // On colorie le fond du champs
        document.getElementById('ville').style.background = '#FFD674'
    } else {
        // Sinon on le remet blanc
        document.getElementById('ville').style.background = 'white'
    }
}

// Fonction de vérification des addresses email
function checkEmail() {
    // On récupère l'email
    var email = document.getElementById('email').value
    // Regex de vérification de l'email (n'importe quoi suivit de .fr ou .com)
    var regex = /^.+(\.fr)|(\.com)$/
    // On récupère le résultat du test
    var estEmail = regex.test(email)
    // Si l'email est valide
    if (estEmail) {
        // On cache les messages (nettoyage)
        document.getElementById('errorEmail').style.display = 'none'
    } else {
        // Sinon on affiche le message d'erreur
        document.getElementById('errorEmail').style.display = 'block'
    }
}

// Fonction appelée lorsque l'on coche la case étudiant
function etudiantChecked() {
    // On affiche les checkbox liées à l'étudiant
    document.getElementById('div_qualification_etudiant').style.display = 'block'
    // On cache celles liées au patron
    // (au cas où le patron aurait été séléctionné précédemment)
    document.getElementById('listePatron').style.display = 'none'
}

// Fonction qui cache les choses ne devant pas être affichées lorsque
// l'on sélectionne le cadre
function cadreChecked() {
    document.getElementById('div_qualification_etudiant').style.display = 'none'
    document.getElementById('listePatron').style.display = 'none'
}

// Fonction qui cache les choses ne devant pas être affichées lorsque
// l'on sélectionne le fonctionnaire
function fonctionnaireChecked() {
    document.getElementById('div_qualification_etudiant').style.display = 'none'
    document.getElementById('listePatron').style.display = 'none'
}

// Fonction qui affiche la liste du patron quand il est sélectionné
function patronChecked() {
    // Cache les checkbox de l'étudiant (s'il avait été sélectionné précédemment)
    document.getElementById('div_qualification_etudiant').style.display = 'none'
    // Affiche la liste déroulante
    document.getElementById('listePatron').style.display = 'block'
}

// Fonction qui reset le formulaire
function resetForm() {
    // On récupère le formulaire et on reset les champs
    document.getElementById('myForm').reset()
    // On récupère les éléments du document dit "évennementiel"
    // (ceux qui sont affichés dans certains cas)
    var element_evenementiel = document.getElementsByClassName('element_evenementiel')
    // On parcourt la liste de ces éléments et on les caches
    for (var i = 0; i < element_evenementiel.length; i++) {
        element_evenementiel[i].style.display = 'none'
    }
}

// Fonction de validation du formulaire
function validateForm() {
    // Dans un premier temps on récupère toutes les données
    var nom = document.getElementById('nom').value
    var dateNaissance = document.getElementById('jDn').value + '/' + document.getElementById('mDn').value + '/' + document.getElementById('aDn').value
    var portable = document.getElementById('telephonePortable').value
    var domicile = document.getElementById('telephoneDomicile').value
    var rue = document.getElementById('rue').value
    var ville = document.getElementById('ville').value
    var codePostal = document.getElementById('codePostal').value
    var email = document.getElementById('email').value

    // On récupère aussi les checkbox et les radios button pour les informations
    var radioButton = document.getElementsByName('profession')
    var checkBox = document.getElementsByName('qualification_etudiant')
    // On crée string qui contient le contenu de la page HTML à affiher
    // Et on la complète petit à petit
    var stringResume = '<h1>Résumé de vos informations<\/h1>' +
        '<p>M/Mme ' + nom + ' est né(e) le ' + dateNaissance + '. '

    // On parcourt la liste des radios pour adapter le message en fonction des
    // choix
    for (var i = 0; i < radioButton.length; i++) {
        // Si le bouton est coché
        if (radioButton[i].checked) {
            // Et si la valeur est étudiant
            if (radioButton[i].value = 'Etudiant') {
                stringResume += 'M/Mme ' + nom + ' est étudiant(e)'
                // On vérifie les choix des checkbox
                for (var j = 0; j < checkBox.length; j++) {
                    // Si la checkbox est cochée, on rajoute sa valeur à la string
                    if (checkBox[j].checked) {
                        stringResume += ' et ' + checkBox[j].value.toLowerCase() + '(e)'
                    }
                }
                // Quand on a finit avec l'étudiant, on met un point
                stringResume += ' . '

            } else if (radioButton[i].value = 'Patron') {
                // Si c'est le patron qui est coché on ajoute une phrase spéciale et
                // la valeur qui est sélectionnée dans la liste liée au parton
                stringResume += 'M/Mme ' + nom + ' est patron(ne) et la valeur de la liste est : ' + document.getElementById('listePatron').value + '. '
            } else {
                // Sinon on met la fonction qui est spécifiée (cadre ou fonctionnaire)
                stringResume += 'M/Mme ' + nom + ' est ' + radioButton[i].value.toLowerCase() + '. '
            }
        }
    }
    // On ferme la balise p qui correspond au paragraphe de la profession
    stringResume += '</p>'
    // On créer la liste de ses coordonées en ajoutant les valeurs de
    // tous ce qui constitue ses coordonnées
    stringResume += 'Ses coordonées sont les suivantes : ' +
        '<ul>' +
        '<li>' +
        '<p>Téléphone portable : ' + portable + '</p>' +
        '</li>' +
        '<li>' +
        '<p>Téléphone fixe : ' + domicile + '</p>' +
        '</li>' +
        '<li>' +
        '<p>Adresse : ' + rue + ' ' + ville + ' ' + codePostal + '</p>' +
        '</li>' +
        '<li>' +
        '<p>Adresse email : ' + email + '</p>' +
        '</li>' +
        '</ul>'

    // Et pour finir on écrit la string dans le document
    // (ce qui crée la nouvelle page)
    document.write(stringResume)
}

module.exports = {
    checkEmail,
    cadreChecked,
    checkBirth,
    checkCityDijon,
    checkCodePostal,
    checkMineur,
    checkNumTelephone,
    etudiantChecked,
    fonctionnaireChecked,
    onLoadFunction,
    patronChecked,
    resetForm,
    setAnneeDateDeNaissance,
    setJourDateDeNaissance,
    setMoisDateDeNaissance,
    validateForm
}
