// cette fonction en une phrase : « Je reçois un tableau, je le traduis en texte, et je le range dans le casier. »
export function saveWorks(works) { // la fonction saveWorks permet faire un tableau des travaux et de sauvegarder les travaux dans le localStorage
  const worksString = JSON.stringify(works);  // on transforme le tableau en chaîne de caractères pour pouvoir le stocker dans le localStorage
  localStorage.setItem("works", worksString); // on stocke la chaîne de caractères dans le localStorage avec la clé "works"
}



// « J’ouvre le casier ; s’il y a du texte, je le retraduis en tableau et je le renvoie ; sinon, je renvoie un tableau vide. »
export function readStorageWorks() {
  const worksString = localStorage.getItem("works"); // elle va chercher works
  if (worksString) { // le truthy : un texte non vide est considéré comme vrai
    return JSON.parse(worksString);  // on transforme la chaîne de caractères en tableau pour pouvoir l'utiliser dans le code (l'inverse de JSON.stringify)
  } else {
    return [];
  }
}