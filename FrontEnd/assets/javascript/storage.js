//saveWorks → quand la liste change. Pour que le casier soit à jour.
export function saveWorks(works) {
  const worksString = JSON.stringify(works); //on transforme le tableau en texte
  sessionStorage.setItem("works", worksString);  // on enregistre sous l'tétiquette works
}


//readStorageWorks → quand on a besoin de la liste. Pour l’avoir sans variable globale.
export function readStorageWorks() {
  const worksString = sessionStorage.getItem("works");

  try {
    if (worksString) { // si y'a un tableau texte
      return JSON.parse(worksString); // on transforme le etxte en tableau
    } else {
      return [];
    }
  } catch (error) {
    console.error("Impossible de lire les travaux enregistrés :", error);
    sessionStorage.removeItem("works"); 
    return [];
  }
}
