import { initWorks, initCategories, initEditionMode } from "./load.js";


// const token = localStorage.getItem("token");
// const isAuthenticated = Boolean(token);
const isAuthenticated = localStorage.getItem("token") !== null;

initWorks(isAuthenticated);
initCategories(isAuthenticated);
initEditionMode(isAuthenticated);




