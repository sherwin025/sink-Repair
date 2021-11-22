import { SinkRepair } from "./SinkRepair.js"
import { fetchCompletion, fetchPlumbers, fetchRequests } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchPlumbers()
    .then(
        () => {
            return fetchRequests()
        }
    )
    .then(
        () => {
            return fetchCompletion()
        }
    )
    .then(
        () => {
            
            mainContainer.innerHTML = SinkRepair()
            
        }
        )
}

render()


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
