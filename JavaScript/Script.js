document.addEventListener("DOMContentLoaded", function () {
  const montantInput = document.getElementById("montant");
  const tauxInput = document.getElementById("taux");
  const dureeInput = document.getElementById("durée");
  const erreurMessage = document.getElementById("erreur");
  const resultat = document.getElementById("resultat");
  const tbody = document.getElementById("table-body");

  document
    .getElementById("calculer")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (!verifierChamps()) {
        afficherErreur();
        return;
      }

      masquerErreur();
      genererTableauAmortissement();
    });

  document
    .getElementById("download-pdf")
    .addEventListener("click", function () {
      telechargerPDF();
    });

  tauxInput.addEventListener("input", function (event) {
    validerDecimal(event);
  });

  montantInput.addEventListener("input", function (event) {
    validerChiffres(event);
  });

  dureeInput.addEventListener("input", function (event) {
    validerChiffres(event);
  });

  function verifierChamps() {
    let isValid = true;

    if (!montantInput.value) {
      montantInput.style.border = "2px solid orange";
      isValid = false;
    } else {
      montantInput.style.border = "";
    }

    if (!tauxInput.value || !/^\d+(\.\d+)?$/.test(tauxInput.value)) {
      tauxInput.style.border = "2px solid orange";
      isValid = false;
    } else {
      tauxInput.style.border = "";
    }

    if (!dureeInput.value) {
      dureeInput.style.border = "2px solid orange";
      isValid = false;
    } else {
      dureeInput.style.border = "";
    }

    return isValid;
  }

  function afficherErreur() {
    erreurMessage.style.display = "block";
    resultat.style.display = "none";
  }

  function masquerErreur() {
    erreurMessage.style.display = "none";
  }

  function genererTableauAmortissement() {
    const montant = parseFloat(montantInput.value);
    const taux = parseFloat(tauxInput.value) / 100;
    const duree = parseInt(dureeInput.value) * 12;
    let solde = montant;
    const mensualite =
      (montant * (taux / 12)) / (1 - Math.pow(1 + taux / 12, -duree));

    tbody.innerHTML = "";

    for (let mois = 1; mois <= duree; mois++) {
      const interet = solde * (taux / 12);
      const amortissement = mensualite - interet;
      const soldeRestant = solde - amortissement;

      const row = `
        <tr>
          <td>${mois}</td>
          <td>${solde.toFixed(2)} €</td>
          <td>${mensualite.toFixed(2)} €</td>
          <td>${interet.toFixed(2)} €</td>
          <td>${amortissement.toFixed(2)} €</td>
          <td>${soldeRestant.toFixed(2)} €</td>
        </tr>
      `;

      tbody.insertAdjacentHTML("beforeend", row);
      solde = soldeRestant;
    }

    resultat.style.display = "block";
  }

  function validerChiffres(event) {
    const valeur = event.target.value;
    if (!/^\d*$/.test(valeur)) {
      event.target.value = valeur.replace(/\D/g, "");
    }
  }

  function validerDecimal(event) {
    const valeur = event.target.value;
    if (!/^\d*\.?\d*$/.test(valeur)) {
      event.target.value = valeur.replace(/[^0-9.]/g, "");
    }
  }

  function telechargerPDF() {
    const tableElement = document.getElementById("table-container");

    html2canvas(tableElement).then(function (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf.jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("tableau_amortissement.pdf");
    });
  }
});
