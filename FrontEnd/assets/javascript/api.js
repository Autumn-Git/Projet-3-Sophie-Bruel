export function getWorks() {

  return fetch("http://localhost:5678/api/works") // requete GET : envoie des données, pas beoin de token parcce que la liste eds données est public
    
  .then((response) => {

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des travaux");
      }

      return response.json(); // sinon on lit le contenu du serveur, tableau texte
    });
};



export function getCategories() {

  return fetch("http://localhost:5678/api/categories") // fetch = la pormesse qu'une réponse va arriver
    
  .then((response) => {
      
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      
      return response.json();
    });
};
