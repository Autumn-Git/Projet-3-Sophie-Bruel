import { initWorks, initCategories, initEditionMode } from "./load.js"


const token = localStorage.getItem("token");
const isAuthenticated = Boolean(token);

initWorks(isAuthenticated)
initCategories(isAuthenticated)
initEditionMode(isAuthenticated)




