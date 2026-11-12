import { handleEditionModeDisplay } from "./edition.js"
import { initModal, displayWorksModal } from "./modal-gallery.js"

export function loadAdmin(works, categories) {

    handleEditionModeDisplay();
    displayWorksModal(works);
    initModal(categories)
    
}