document.getElementById("calculer").addEventListener("click", function (event) {
  event.preventDefault();

  const montant = parseFloat(document.getElementById("montant").value);
  const taux = parseFloat(document.getElementById("taux").value) / 100;
  const duree = parseInt(document.getElementById("durée").value) * 12;

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
});
