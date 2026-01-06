function createNode(person) {
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <strong>${person.firstName} ${person.lastName}</strong><br>
    <em>${person.role || 'Poste non renseigné'}</em><br>
    🏢 ${person.company}<br>
    ${person.email ? `📧 <a href="mailto:${person.email}">${person.email}</a><br>` : ''}
    ${person.phone ? `📞 ${person.phone}` : ''}
  `;

  const children = employees.filter(e => {
    if (Array.isArray(e.managerId)) return e.managerId.includes(person.id);
    return e.managerId === person.id;
  });

  if (children.length > 0) {
    const childrenContainer = document.createElement('div');
    childrenContainer.classList.add('children');
    children.forEach(child => {
      childrenContainer.appendChild(createNode(child));
    });
    node.appendChild(childrenContainer);
  }

  return node;
}

function createFullTree(person) {
  const companyBlock = document.createElement('div');
  companyBlock.classList.add('company-block');

  const companyTitle = document.createElement('div');
  companyTitle.classList.add('company-title');
  companyTitle.textContent = person.company;
  companyBlock.appendChild(companyTitle);

  const tree = document.createElement('div');
  tree.classList.add('tree');

  // Ajouter les supérieurs directs (tous niveaux)
  let current = person;
  const hierarchy = [];
  while (true) {
    let manager = null;
    if (Array.isArray(current.managerId)) {
      manager = employees.find(e => current.managerId.includes(e.id));
    } else if (current.managerId) {
      manager = employees.find(e => e.id === current.managerId);
    }
    if (manager) {
      hierarchy.unshift(manager);
      current = manager;
    } else break;
  }

  hierarchy.forEach(manager => {
    tree.appendChild(createNode(manager));
  });

  // Ajouter la personne recherchée et ses subordonnés
  tree.appendChild(createNode(person));

  companyBlock.appendChild(tree);
  return companyBlock;
}

const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('result');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  resultContainer.innerHTML = '';
  if (!query) return;

  const person = employees.find(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(query)
  );

  if (!person) {
    resultContainer.innerHTML = '<p>Aucun résultat</p>';
    return;
  }

  resultContainer.appendChild(createFullTree(person));
});
