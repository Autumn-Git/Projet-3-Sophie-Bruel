export function getWorks() {
  return fetch("http://localhost:5678/api/works")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    return response.json();
  })
}



export function getCategories() {
  return fetch("http://localhost:5678/api/categories")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    return response.json();
  })
}
