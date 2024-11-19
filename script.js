function saveStudentInfo() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const dateInscription = document.getElementById('dateInscription').value;
    const filiere = document.getElementById('filiere').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const observation = document.getElementById('observation').value;
    const message = document.getElementById('message');

    if (!nom || !prenom || !dateNaissance || !dateInscription || !filiere || !email || !telephone) {
        message.innerText = "Veuillez remplir tous les champs obligatoires.";
        message.style.color = "red";
        return false;
    }

    if (!/^[0-9]{10}$/.test(telephone)) {
        message.innerText = "Numéro de téléphone invalide. Il doit contenir 10 chiffres.";
        message.style.color = "red";
        return false;
    }

    // Récupérer les données existantes
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Ajouter les nouvelles données
    students.push({ nom, prenom, dateNaissance, dateInscription, filiere, email, telephone, observation });
    
    // Enregistrer dans le LocalStorage
    localStorage.setItem("students", JSON.stringify(students));

    message.innerText = "Étudiant enregistré avec succès !";
    message.style.color = "green";

    return false; // Empêche l'envoi du formulaire pour la démonstration
}

// Exporter vers un fichier Excel
function exportToExcel() {
    const password = prompt("Entrez le mot de passe pour exporter les données :");
    if (password !== "Imkal@89") { // Remplacez par un mot de passe sécurisé
        alert("Mot de passe incorrect !");
        return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    if (students.length === 0) {
        alert("Aucune donnée à exporter.");
        return;
    }

    // Préparation des données pour le fichier Excel
    const worksheetData = [["Nom", "Prénom", "Date de naissance", "Date d'inscription", "Filière", "Email", "Téléphone", "Observations"]];
    students.forEach(student => {
        worksheetData.push([
            student.nom,
            student.prenom,
            student.dateNaissance,
            student.dateInscription,
            student.filiere,
            student.email,
            student.telephone,
            student.observation
        ]);
    });
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    

    // Création d'une feuille de calcul et d'un classeur
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Étudiants");

    // Génération du fichier Excel et téléchargement
    XLSX.writeFile(workbook, "etudiants.xlsx");
}
