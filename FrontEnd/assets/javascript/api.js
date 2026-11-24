export const API_URL = "http://localhost:5678/api";

export function getWorks() {
  return fetch(`${API_URL}/works`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    };

    return response.json();
  });
};

export function getCategories() {
  return fetch(`${API_URL}/categories`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    };

    return response.json();
  });
};
