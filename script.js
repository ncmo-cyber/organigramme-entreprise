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
function createNode(person, isSuperior=false) {
  const node = document.createElement('div');
  node.classList.add('node');
  const companyClass = getCompanyClass(person);
  node.classList.add(companyClass);
  if (!person.managerId) node.classList.add('ceo');
  if (isSuperior) node.classList.add('superior');

  node.innerHTML = `
    <strong>${person.firstName} ${person.lastName}</strong><br>
    <em>${person.role || 'Poste non renseigné'}</em><br>
    🏢 ${person.company}<br>
    ${person.email ? `📧 <a href="mailto:${person.email}">${person.email}</a><br>` : ''}
    ${person.phone ? `📞 ${person.phone}` : ''}
  `;
  return node;
}

// Arbre hiérarchique complet
function createFullTree(person) {
  const companyBlock = document.createElement('div');
  companyBlock.classList.add('company-block');

  const companyTitle = document.createElement('div');
  companyTitle.classList.add('company-title');
  companyTitle.textContent = person.company;
  companyBlock.appendChild(companyTitle);

  const tree = document.createElement('div');
  tree.classList.add('tree');

  let current = person;
  const hierarchy = [];
  while (true) {
    let manager = null;
    if (Array.isArray(current.managerId)) {
      manager = employees.find(e => current.managerId.includes(e.id) && e.company === person.company);
    } else if (current.managerId) {
      manager = employees.find(e => e.id === current.managerId && e.company === person.company);
    }
    if (manager) { hierarchy.unshift(manager); current = manager; }
    else break;
  }
  hierarchy.forEach(manager => tree.appendChild(createNode(manager, true)));
  tree.appendChild(createNode(person));

  const appendChildren = (parentNode, parentPerson) => {
    const children = employees.filter(e => {
      if (Array.isArray(e.managerId)) return e.managerId.includes(parentPerson.id) && e.company === parentPerson.company;
      return e.managerId === parentPerson.id && e.company === parentPerson.company;
    });
    if (children.length === 0) return;
    const childrenContainer = document.createElement('div');
    childrenContainer.classList.add('children');
    children.forEach(child => {
      const childNode = createNode(child);
      childrenContainer.appendChild(childNode);
      appendChildren(childNode, child);
    });
    parentNode.appendChild(childrenContainer);
  };
  appendChildren(tree, person);

  companyBlock.appendChild(tree);
  return companyBlock;
}

// Affichage plat (liste)
function createFlatList(persons, title) {
  const block = document.createElement('div');
  block.classList.add('company-block');

  const companyTitle = document.createElement('div');
  companyTitle.classList.add('company-title');
  companyTitle.textContent = title;
  block.appendChild(companyTitle);

  const tree = document.createElement('div');
  tree.classList.add('tree');

  persons.forEach(person => tree.appendChild(createNode(person)));

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
    groupCompanies.forEach(companyName => {
      const members = employees.filter(e => e.company === companyName);
      resultContainer.appendChild(createFlatList(members, companyName));
    });
    return;
  }

  // 3️⃣ Recherche par nom/prénom
  let person = employees.find(e => `${e.firstName} ${e.lastName}`.toLowerCase().includes(query));
  if (person) {
    resultContainer.appendChild(createFullTree(person));
    return;
  }

  // 4️⃣ Recherche par société
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
