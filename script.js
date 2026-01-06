const searchInput = document.getElementById('searchInput');
const orgChart = document.getElementById('orgChart');

// Fonction pour obtenir les subordonnés
function getSubordinates(managerId, list) {
  return list.filter(emp => emp.managerId === managerId);
}

// Fonction pour obtenir un employé par ID
function getEmployeeById(id, list) {
  return list.find(emp => emp.id === id);
}

// Fonction pour générer une carte HTML
function createCard(emp, colorClass) {
  const div = document.createElement('div');
  div.className = `employee-card ${colorClass}`;
  div.innerHTML = `
    <div class="name">${emp.firstName} ${emp.lastName}</div>
    <div class="role">${emp.role}</div>
    <div class="company">${emp.company}</div>
    <div class="contact">📧 ${emp.email}<br>📞 ${emp.phone}</div>
  `;
  return div;
}

// Fonction pour créer l’organigramme horizontal
function renderOrgChart(list) {
  orgChart.innerHTML = '';

  // Récupérer les CEO / supérieurs sans manager
  const ceos = list.filter(emp => !emp.managerId);

  const ceoRow = document.createElement('div');
  ceoRow.className = 'ceo-row';
  ceos.forEach(ceo => {
    const colorClass = getColorClass(ceo);
    const card = createCard(ceo, colorClass);
    ceoRow.appendChild(card);
    appendSubordinates(card, ceo.id, list);
  });

  orgChart.appendChild(ceoRow);
}

// Fonction pour ajouter les subordonnés horizontalement
function appendSubordinates(parentCard, managerId, list) {
  const subs = getSubordinates(managerId, list);
  if (subs.length === 0) return;

  const subRow = document.createElement('div');
  subRow.className = 'subordinates';

  subs.forEach(sub => {
    const colorClass = getColorClass(sub);
    const card = createCard(sub, colorClass);
    subRow.appendChild(card);
    appendSubordinates(card, sub.id, list);
  });

  parentCard.appendChild(subRow);
}

// Fonction pour attribuer une couleur par société
function getColorClass(emp) {
  switch(emp.company) {
    case "Cube Golem France": return 'cube-golem';
    case "Cube Golem Germany": return 'cube-golem-2';
    case "Cube Golem Slovenia": return 'cube-golem-2';
    case "Cube Golem Group": return 'cube-golem';
    case "Khadou France": return 'khadou';
    case "Heathside": return 'heathside';
    case "Hubtoys": return 'hubtoys';
    default: return '';
  }
}

// Recherche avancée
function filterEmployees(query) {
  query = query.toLowerCase().trim();

  if (query === "all") return employees;

  if (query === "friends of khadou") {
    return employees.filter(emp => ["Khadou France","Heathside","Hubtoys"].includes(emp.company));
  }

  return employees.filter(emp => {
    // Nom ou prénom
    if ((emp.firstName && emp.firstName.toLowerCase().includes(query)) || 
        (emp.lastName && emp.lastName.toLowerCase().includes(query))) {
      return true;
    }
    // Société
    if (emp.company.toLowerCase().includes(query)) return true;
    // Poste exact
    if (emp.role.toLowerCase().includes(query)) return true;

    return false;
  });
}

// Événement recherche
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  const filtered = filterEmployees(query);

  if (query === '') {
    renderOrgChart(employees);
  } else {
    renderOrgChart(filtered);
  }
});

// Initialisation
renderOrgChart(employees);
