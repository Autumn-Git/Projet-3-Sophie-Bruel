export function saveWorks(works) {
  const worksString = JSON.stringify(works);  
  localStorage.setItem("works", worksString);
}



export function readStorageWorks() {
  const worksString = localStorage.getItem("works"); 
  if (worksString) { 
    return JSON.parse(worksString); 
  } else {
    return [];
  }
}