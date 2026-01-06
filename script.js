// Groupes prédéfinis
const companyGroups = {
  "friends of khadou": ["Khadou France", "Hubtoys", "Heathside"],
  "cube golem": ["Cube Golem France", "Cube Golem Germany", "Cube Golem Slovenia"]
};

// Classe couleur par société
function getCompanyClass(person) {
  const company = person.company.toLowerCase();
  if (company.includes("cube golem france")) return "cube-golem-france";
  if (company.includes("cube golem germany")) return "cube-golem-germany";
  if (company.includes("cube golem slovenia")) return "cube-golem-slovenia";
  if (company.includes("khadou")) return "khadou";
  if (company.includes("heathside")) return "heathside";
  if (company.includes("hubtoys")) return "hubtoys";
  return "";
}

// Crée une carte employé
function createNode(person, isCEO=false) {
  const node = document.createElement('div');
  node.classList.add('node');
  const companyClass = getCompanyClass(person);
  node.classList.add(companyClass);
  if (!person.managerId) node.classList.add('ceo');
  if (isCEO) node.classList.add('ceo');

  node.innerHTML = `
    <strong>${person.firstName} ${person.lastName}</strong><br>
    <em>${person.role || 'Poste non renseigné'}</em><br>
    🏢 ${person.company}<br>
    ${person.email ? `📧 <a href="mailto:${person.email}">${person.email}</a><br>` : ''}
    ${person.phone ? `📞 ${person.phone}` : ''}
  `;
  return node;
}

// Crée les subordonnés horizontaux
function buildChildren(parentNode, parentPerson) {
  const children = employees.filter(e => {
    if (Array.isArray(e.managerId)) return e.managerId.includes(parentPerson.id) && e.company === parentPerson.company;
    return e.managerId === parentPerson.id && e.company === parentPerson.company;
  });

  if (!children.length) return;

  const childrenContainer = document.createElement('div');
  childrenContainer.classList.add('children'); // flex horizontal

  children.forEach(child => {
    const childNode = createNode(child);
    childrenContainer.appendChild(childNode);
  });

  parentNode.appendChild(childrenContainer);

  // Récursion pour chaque enfant
  children.forEach(child => {
    buildChildren(childrenContainer.children[children.indexOf(child)], child);
  });
}

// Crée un arbre hiérarchique complet pour une personne
function createFullTree(person) {
  const companyBlock = document.createElement('div');
  companyBlock.classList.add('company-block');

  const companyTitle = document.createElement('div');
  companyTitle.classList.add('company-title');
  companyTitle.textContent = person.company;
  companyBlock.appendChild(companyTitle);

  const tree = document.createElement('div');
  tree.classList.add('tree');

  // Supérieurs hiérarchiques (pour afficher jusqu’au CEO)
  const hierarchy = [];
  let current = person;
  while (current.managerId) {
    let manager = Array.isArray(current.managerId)
      ? employees.find(e => current.managerId.includes(e.id) && e.company === person.company)
      : employees.find(e => e.id === current.managerId && e.company === person.company);
    if (!manager) break;
    hierarchy.unshift(manager);
    current = manager;
  }

  hierarchy.forEach(manager => tree.appendChild(createNode(manager, !manager.managerId)));

  const rootNode = createNode(person, !person.managerId);
  tree.appendChild(rootNode);

  buildChildren(rootNode, person);

  companyBlock.appendChild(tree);
  return companyBlock;
}

// Crée une liste plate (pour société ou poste)
function createFlatList(persons, title) {
  const block = document.createElement('div');
  block.classList.add('company-block');

  const companyTitle = document.createElement('div');
  companyTitle.classList.add('company-title');
  companyTitle.textContent = title;
  block.appendChild(companyTitle);

  const tree = document.createElement('div');
  tree.classList.add('tree');

  // Affiche tous les CEO sur la même ligne si plusieurs sociétés
  const ceos = persons.filter(e => !e.managerId);
  if (ceos.length > 0) {
    const ceoRow = document.createElement('div');
    ceoRow.classList.add('children');
    ceos.forEach(ceo => ceoRow.appendChild(createNode(ceo, true)));
    tree.appendChild(ceoRow);
  }

  // Tous les autres employés sous leur supérieur
  const nonCeo = persons.filter(e => e.managerId);
  nonCeo.forEach(emp => {
    const managerNode = tree.querySelector(`[data-id='${Array.isArray(emp.managerId) ? emp.managerId[0] : emp.managerId}']`);
    if (!managerNode) return;
    buildChildren(managerNode, employees.find(e => e.id === (Array.isArray(emp.managerId) ? emp.managerId[0] : emp.managerId)));
  });

  block.appendChild(tree);
  return block;
}

// Recherche interactive
const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('result');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  resultContainer.innerHTML = '';
  if (!query) return;

  // 1️⃣ Recherche "all"
  if (query === 'all') {
    const companies = [...new Set(employees.map(e => e.company))];
    companies.forEach(companyName => {
      const members = employees.filter(e => e.company === companyName);
      resultContainer.appendChild(createFlatList(members, companyName));
    });
    return;
  }

  // 2️⃣ Recherche par groupe
  if (companyGroups[query]) {
    const groupCompanies = companyGroups[query];
    const groupMembers = employees.filter(e => groupCompanies.includes(e.company));
    resultContainer.appendChild(createFlatList(groupMembers, `Groupe: ${query}`));
    return;
  }

  // 3️⃣ Recherche par nom/prénom
  const person = employees.find(e => `${e.firstName} ${e.lastName}`.toLowerCase().includes(query));
  if (person) {
    resultContainer.appendChild(createFullTree(person));
    return;
  }

  // 4️⃣ Recherche par société exacte ou partielle
  const orgMatches = employees.filter(e => e.company.toLowerCase().includes(query));
  if (orgMatches.length > 0) {
    const companyName = orgMatches[0].company;
    resultContainer.appendChild(createFlatList(orgMatches, `Membres de ${companyName}`));
    return;
  }

  // 5️⃣ Recherche par poste
  const roleMatches = employees.filter(e => e.role && e.role.toLowerCase().includes(query));
  if (roleMatches.length > 0) {
    resultContainer.appendChild(createFlatList(roleMatches, `Poste(s): "${query}"`));
    return;
  }

  resultContainer.innerHTML = '<p>Aucun résultat</p>';
});
