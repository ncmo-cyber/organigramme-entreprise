const employees = [
  {
    id: 1,
    firstName: "Alexis",
    lastName: "DESPLATS",
    role: "CEO",
    company: "Cube Golem France", "Khadou France",
    managerId: null,
    email: "a.desplats@saga-alliance.com",
    phone: "+33 647321375"
  },
  {
    id: 2,
    firstName: "Fabien",
    lastName: "SOUTIF",
    role: "Logistic director",
    company: "Cube Golem France", "Khadou France",
    managerId: 1,
    email: "f.soutif@khadou.fr",
    phone: "+33 130474729"
  },
  {
    id: 3,
    firstName: "Adrien",
    lastName: "REAUX",
    role: "Sales director",
    company: "Cube Golem France", "Khadou France",
    managerId: 1,
    email: "a.reaux@cubegolemm.fr",
    phone: "+33 130474728"
  },
  {
    id: 4,
    firstName: "Solène",
    lastName: "GUEBLE",
    role: "Administrative manager",
    company: "Khadou France",
    managerId: 3,
    email: "s.gueble@khadou.fr",
    phone: "+33 130474727"
  },
  {
    id: 5,
    firstName: "Roberto",
    lastName: "LLORENS",
    role: "Customer support",
    company: "Cube Golem France",
    managerId: 3,
    email: "r.llorens@cubegolem.fr",
    phone: "+33 130472160"
  },
  {
    id: 6,
    firstName: "Doaa",
    lastName: "Kaddouri",
    role: "Sales and purchase assistant",
    company: "Khadou France",
    managerId: 3,
    email: "d.kaddouri@khadou.fr",
    phone: "+33 0130472161"
  },
  {
    id: 7,
    firstName: "Noémie",
    lastName: "CUOMO",
    role: "Supply chain & logistic assistant",
    company: "Cube Golem France", "Khadou France",
    managerId: 2,
    email: "n.cuomo@khadou.fr",
    phone: "+33 130472162"
  },
  {
    id: 8,
    firstName: "Matthieu",
    lastName: "BONNINGUE",
    role: "Forklift operator",
    company: "Cube Golem France", "Khadou France",
    managerId: 2,
    email: "m.bonningue@cubegolem.fr",
    phone: "+33 130474731"
  },
  {
    id: 9,
    firstName: "Thibaud",
    lastName: "HERPIN",
    role: "Stock Manager",
    company: "Cube Golem France", "Khadou France",
    managerId: 2,
    email: "logistique@cubegolem.fr",
    phone: "+33 130472160"
  },
  {
    id: 10,
    firstName: "Alexander",
    lastName: "DUBYNSKI",
    role: "Managing Partner",
    company: "Cube Golem Group",
    managerId: null,
    email: "a.dubynski@saga_alliance.com",
    phone: "491773000000"
  },
  {
    id: 11,
    firstName: "Gregory",
    lastName: "BENASSAR",
    role: "CEO",
    company: "Heathside",
    managerId: null,
    email: "greg@heathside.biz",
    phone: "+33632125460"
  },
  {
    id: 12,
    firstName: "Alistair",
    lastName: "RINGLAND",
    role: "logistic director",
    company: "Heathside",
    managerId: 11,
    email: "alistair@heathside.biz",
    phone: "+4477719000240"
  },
  {
    id: 13,
    firstName: "Nic",
    lastName: "ALDRIDGE",
    role: "Head of Khadou Global",
    company: "Heathside",
    managerId: 11,
    email: "nic@khadou.com",
    phone: "+447947825133"
  },
  {
    id: 14,
    firstName: "Sam",
    lastName: "MYERS",
    role: "Head of Product Management",
    company: "Heathside",
    managerId: 11,
    email: "sam@heathside.biz",
    phone: "+447534914120"
  },
  {
    id: 15,
    firstName: "Reinhard",
    lastName: "SIGEL",
    role: "General manager",
    company: "Cube Golem Germany",
    managerId: null,
    email: "reinhard.sigel@funtainment.de",
    phone: "0049/089/614219-32"
  },
  {
    id: 26,
    firstName: "Jurgen",
    lastName: "Broy",
    role: "CO CEO",
    company: "Cube Golem Germany",
    managerId: null,
    email: "",
    phone: ""
  },
  {
    id: 16,
    firstName: "Peter",
    lastName: "MÜLLER",
    role: "Head of Logistics",
    company: "Cube Golem Germany",
    managerId: 15, 16,
    email: "peter.mueller@funtainment.de",
    phone: "0049/089/614219-22"
  },
  {
    id: 17,
    firstName: "",
    lastName: "",
    role: "Head of Sales",
    company: "Cube Golem Germany",
    managerId: 15, 16,
    email: "",
    phone: ""
  },
  {
    id: 18,
    firstName: "Daniel",
    lastName: "KRÜCKEL",
    role: "Head of Purchase",
    company: "Cube Golem Germany",
    managerId: 15, 16,
    email: "daniel.krueckel@funtainment.de",
    phone: "0049/089/614219-26"
  },
  {
    id: 19,
    firstName: "Andrea",
    lastName: "KLÜGER",
    role: "Head of Bookkeeping",
    company: "Cube Golem Germany",
    managerId: 15, 16,
    email: "andrea.klueger@funtainment.de",
    phone: "0049/089/614219-24"
  },
  {
    id: 20,
    firstName: "Arnaud",
    lastName: "FRANGEUL",
    role: "CO CEO",
    company: "hubtoys",
    managerId: null,
    email: "a.frangeul@hubtoys.fr",
    phone: "+33 675253260"
  },
  {
    id: 21,
    firstName: "José",
    lastName: "MARTINEZ",
    role: "CO CEO",
    company: "hubtoys",
    managerId: null,
    email: "j.martinez@hubtoys.fr",
    phone: ""
  },
  {
    id: 22,
    firstName: "Thomas",
    lastName: "TURBE",
    role: "",
    company: "hubtoys",
    managerId: 20, 21
    email: "t.turbe@hubtoys.fr",
    phone: ""
  },
  {
    id: 23,
    firstName: "Eve",
    lastName: "SOULLIER",
    role: "Administrative assistant",
    company: "hubtoys",
    managerId: 20, 21,
    email: "support@hubtoys.fr",
    phone: "+33 689933369"
  }
  {
    id: 24,
    firstName: "Nik",
    lastName: "KROSELJ",
    role: "CEO",
    company: "Cube Golem Slovenia",
    managerId: null,
    email: "n.kroselj@cubegolem.si",
    phone: "+38 651240440"
  }
  {
    id: 25,
    firstName: "Adja",
    lastName: "SOSKO",
    role: "Warehouse manager",
    company: "Cube Golem Slovenia",
    managerId: 23,
    email: "a.sosko@cubegolem.si",
    phone: "+38 640752517"
  },
];
