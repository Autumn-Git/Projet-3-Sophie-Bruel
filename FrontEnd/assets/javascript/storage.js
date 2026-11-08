export function saveWorks(works) {
  const worksString = JSON.stringify(works);  
  sessionStorage.setItem("works", worksString);
}



export function readStorageWorks() {
    const worksString = sessionStorage.getItem("works");

    try {
        if (worksString) {
            return JSON.parse(worksString);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Impossible de lire les travaux enregistrés :", error);
        sessionStorage.removeItem("works");
        return [];
    }
}
