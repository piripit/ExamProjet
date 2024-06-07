document.getElementById("calculer").addEventListener("click", function (event) {
  event.preventDefault();

  const montantInput = document.getElementById("montant");
  const tauxInput = document.getElementById("taux");
  const dureeInput = document.getElementById("durée");

  if (!verifierChamps()) {
    document.getElementById("erreur").style.display = "block";
    document.getElementById("resultat").style.display = "none";
    return;
  }

  if (!montantInput.value || !tauxInput.value || !dureeInput.value) {
    document.getElementById("erreur").style.display = "block";
    montantInput.style.border = "2px solid orange";
    tauxInput.style.border = "2px solid orange";
    dureeInput.style.border = "2px solid orange";
    return;
  }

  const montant = parseFloat(montantInput.value);
  const taux = parseFloat(tauxInput.value) / 100;
  const duree = parseInt(dureeInput.value) * 12;

  const resultat = document.getElementById("resultat");
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  let solde = montant;
  const mensualite =
    (montant * (taux / 12)) / (1 - Math.pow(1 + taux / 12, -duree));

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
  document.getElementById("erreur").style.display = "none";
  montantInput.style.border = "";
  tauxInput.style.border = "";
  dureeInput.style.border = "";
});

function verifierChamps() {
  const montantInput = document.getElementById("montant");
  const tauxInput = document.getElementById("taux");
  const dureeInput = document.getElementById("durée");

  if (!montantInput.value || !tauxInput.value || !dureeInput.value) {
    montantInput.style.border = "2px solid orange";
    tauxInput.style.border = "2px solid orange";
    dureeInput.style.border = "2px solid orange";
    return false;
  }

  montantInput.style.border = "";
  tauxInput.style.border = "";
  dureeInput.style.border = "";
  return true;
}

const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const valeur = event.target.value;
    if (!/^[0-9]+$/.test(valeur)) {
      event.target.value = valeur.replace(/[^0-9]/g, "");
    }
  });
});
