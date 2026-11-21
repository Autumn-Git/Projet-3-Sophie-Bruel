import { initWorks, initCategories, initEditionMode } from "./load.js";

const isAuthenticated = localStorage.getItem("token") !== null;

initWorks(isAuthenticated);
initCategories(isAuthenticated);
initEditionMode(isAuthenticated);




