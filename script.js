const searchInput = document.getElementById("search");
const resultContainer = document.getElementById("result");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length < 2) {
    resultContainer.innerHTML = "";
    return;
  }

  const person = employees.find(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query)
  );

  if (!person) {
    resultContainer.innerHTML = "<p>Aucun résultat</p>";
    return;
  }

  // Supérieur(s)
  let managers = [];
  if (Array.isArray(person.managerId)) {
    managers = employees.filter(e => person.managerId.includes(e.id));
  } else if (person.managerId !== null) {
    const manager = employees.find(e => e.id === person.managerId);
    if (manager) managers.push(manager);
  }

  // Subordonnés
  const subordinates = employees.filter(e => {
    if (Array.isArray(e.managerId)) {
      return e.managerId.includes(person.id);
    }
    return e.managerId === person.id;
  });

  resultContainer.innerHTML = `
    <div class="card">
      <h2>${person.firstName} ${person.lastName}</h2>
      <p><strong>${person.role || "Poste non renseigné"}</strong></p>
      <p>🏢 ${person.company}</p>

      ${person.email ? `<p>📧 <a href="mailto:${person.email}">${person.email}</a></p>` : ""}
      ${person.phone ? `<p>📞 ${person.phone}</p>` : ""}

      ${
        managers.length
          ? `<hr><p><strong>Supérieur(s) hiérarchique(s)</strong><br>
              ${managers.map(m => `${m.firstName} ${m.lastName} – ${m.role}`).join("<br>")}
            </p>`
          : ""
      }

      ${
        subordinates.length
          ? `<hr><p><strong>Supervise</strong><br>
              ${subordinates.map(s => `${s.firstName} ${s.lastName} – ${s.role}`).join("<br>")}
            </p>`
          : ""
      }
    </div>
  `;
});
