import { deleteRequest, getPlumbers, getRequests, sendCompletion, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")


            const completion = {
                requestId: +requestId, // + performs same as parseInt() it forces js to convert to number 
                plumberId: parseInt(plumberId),
                date_created: new Date()
            }

            sendCompletion(completion)

        }
    }
)

const convertRequestToListElement = (request, plumbers) => {
    return ` <li class="request"> ${request.description} 
        <select class="plumbers" id="plumbers">
        <option value="">Choose plumber</option>
        ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>
    <button class="request__delete" id="request--${request.id}"> Delete </button>
    </li>`
}

const convertCompletedtoListElement = (request) => {
    return` <li class="compl"> ${request.description} <button class="request__delete" id="request--${request.id}"> Delete </button>
                </li>`
}

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completed = getCompletions()

    return `
    <ul> 
    ${
        requests.map(
            (request) =>{
                const isCompleted = completed.find(
                    (complete) => {
                        return request.id === complete.requestId
                    }
                )
                if (isCompleted){
                    return convertCompletedtoListElement(request)
                } else {
                    return convertRequestToListElement(request, plumbers)
                }
            }).join("")
    }
    </ul>
    `

}
