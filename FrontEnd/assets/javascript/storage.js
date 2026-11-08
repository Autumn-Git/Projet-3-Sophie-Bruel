export function saveWorks(works) {
  const worksString = JSON.stringify(works);  
  localStorage.setItem("works", worksString);
}



export function readStorageWorks() {
    const worksString = localStorage.getItem("works");

    try {
        if (worksString) {
            return JSON.parse(worksString);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Impossible de lire les travaux enregistrés :", error);
        localStorage.removeItem("works");
        return [];
    }
}
