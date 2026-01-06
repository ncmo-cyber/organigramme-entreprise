const employees = [
  // Cube Golem France
  {id:1, firstName:"Alexis", lastName:"DESPLATS", role:"CEO", company:"Cube Golem France", managerId:null, email:"a.desplats@saga-alliance.com", phone:"+33 6 47 32 13 75"},
  {id:2, firstName:"Fabien", lastName:"SOUTIF", role:"Logistics Director", company:"Cube Golem France", managerId:1, email:"f.soutif@khadou.fr", phone:"+33 1 30 47 47 29"},
  {id:3, firstName:"Adrien", lastName:"REAUX", role:"Sales Director", company:"Cube Golem France", managerId:1, email:"a.reaux@cubegolem.fr", phone:"+33 1 30 47 47 28"},
  {id:4, firstName:"Solène", lastName:"GUEBLE", role:"Administrative Manager", company:"Cube Golem France", managerId:3, email:"s.gueble@khadou.fr", phone:"+33 1 30 47 47 27"},
  {id:5, firstName:"Roberto", lastName:"LLORENS", role:"Customer Support", company:"Cube Golem France", managerId:3, email:"r.llorens@cubegolem.fr", phone:"+33 1 30 47 21 60"},
  {id:6, firstName:"Doaa", lastName:"KADDOURI", role:"Sales & Purchase Assistant", company:"Cube Golem France", managerId:3, email:"d.kaddouri@khadou.fr", phone:"+33 1 30 47 21 61"},
  {id:7, firstName:"Noémie", lastName:"CUOMO", role:"Supply Chain & Logistic Assistant", company:"Cube Golem France", managerId:2, email:"n.cuomo@khadou.fr", phone:"+33 1 30 47 21 62"},
  {id:8, firstName:"Matthieu", lastName:"BONNINGUE", role:"Forklift Operator", company:"Cube Golem France", managerId:2, email:"m.bonningue@cubegolem.fr", phone:"+33 1 30 47 47 31"},
  {id:9, firstName:"Thibaud", lastName:"HERPIN", role:"Stock Manager", company:"Cube Golem France", managerId:2, email:"logistique@cubegolem.fr", phone:"+33 1 30 47 21 60"},

  // Cube Golem Germany
  {id:15, firstName:"Reinhard", lastName:"SIGEL", role:"CO-CEO", company:"Cube Golem Germany", managerId:10, email:"reinhard.sigel@funtainment.de", phone:"0049 89 614219 32"},
  {id:16, firstName:"Jurgen", lastName:"BROY", role:"CO-CEO", company:"Cube Golem Germany", managerId:10, email:"", phone:""},
  {id:17, firstName:"Peter", lastName:"MÜLLER", role:"Logistics Director", company:"Cube Golem Germany", managerId:15, email:"peter.mueller@funtainment.de", phone:"0049 89 614219 22"},
  {id:18, firstName:"", lastName:"", role:"Sales Director", company:"Cube Golem Germany", managerId:15, email:"", phone:""},
  {id:19, firstName:"Daniel", lastName:"KRÜCKEL", role:"Purchase Director", company:"Cube Golem Germany", managerId:15, email:"daniel.krueckel@funtainment.de", phone:"0049 89 614219 26"},
  {id:20, firstName:"Andrea", lastName:"KLÜGER", role:"Head of Bookkeeping", company:"Cube Golem Germany", managerId:15, email:"andrea.klueger@funtainment.de", phone:"0049 89 614219 24"},

  // Cube Golem Slovenia
  {id:25, firstName:"Nik", lastName:"KROSELJ", role:"CEO", company:"Cube Golem Slovenia", managerId:null, email:"n.kroselj@cubegolem.si", phone:"+38 6 51 24 04 40"},
  {id:26, firstName:"Adja", lastName:"SOSKO", role:"Warehouse Manager", company:"Cube Golem Slovenia", managerId:25, email:"a.sosko@cubegolem.si", phone:"+38 6 40 75 25 17"},

  // Cube Golem Group
  {id:10, firstName:"Alexander", lastName:"DUBYNSKI", role:"Managing Partner", company:"Cube Golem Group", managerId:null, email:"a.dubynski@saga_alliance.com", phone:"+49 177 300 0000"},

  // Khadou France
  {id:27, firstName:"Alexis", lastName:"DESPLATS", role:"CEO", company:"Khadou France", managerId:null, email:"a.desplats@saga-alliance.com", phone:"+33 6 47 32 13 75"},
  {id:28, firstName:"Fabien", lastName:"SOUTIF", role:"Logistics Director", company:"Khadou France", managerId:27, email:"f.soutif@khadou.fr", phone:"+33 1 30 47 47 29"},
  {id:29, firstName:"Adrien", lastName:"REAUX", role:"Sales & Purchases Director", company:"Khadou France", managerId:27, email:"a.reaux@cubegolem.fr", phone:"+33 1 30 47 47 28"},
  {id:30, firstName:"Solène", lastName:"GUEBLE", role:"Administrative Manager", company:"Khadou France", managerId:29, email:"s.gueble@khadou.fr", phone:"+33 1 30 47 47 27"},
  {id:31, firstName:"Roberto", lastName:"LLORENS", role:"Customer Support", company:"Khadou France", managerId:29, email:"r.llorens@cubegolem.fr", phone:"+33 1 30 47 21 60"},
  {id:32, firstName:"Doaa", lastName:"KADDOURI", role:"Sales & Purchase Assistant", company:"Khadou France", managerId:29, email:"d.kaddouri@khadou.fr", phone:"+33 1 30 47 21 61"},
  {id:33, firstName:"Noémie", lastName:"CUOMO", role:"Supply Chain & Logistic Assistant", company:"Khadou France", managerId:28, email:"n.cuomo@khadou.fr", phone:"+33 1 30 47 21 62"},
  {id:34, firstName:"Matthieu", lastName:"BONNINGUE", role:"Forklift Operator", company:"Khadou France", managerId:28, email:"m.bonningue@cubegolem.fr", phone:"+33 1 30 47 47 31"},
  {id:35, firstName:"Thibaud", lastName:"HERPIN", role:"Stock Manager", company:"Khadou France", managerId:28, email:"logistique@cubegolem.fr", phone:"+33 1 30 47 21 60"},

  // Heathside
  {id:11, firstName:"Gregory", lastName:"BENASSAR", role:"CEO", company:"Heathside", managerId:null, email:"greg@heathside.biz", phone:"+33 6 32 12 54 60"},
  {id:12, firstName:"Alistair
