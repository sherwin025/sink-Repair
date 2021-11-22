const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                applicationState.plumbers = serviceRequests
            }
        )
}

export const fetchCompletion = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                applicationState.completions = serviceRequests
            }
        )
}

export const getPlumbers = () => {

    return applicationState.plumbers.map((request) => ({ ...request }))
}


export const getRequests = () => {
    const completed = getCompletions()

    applicationState.requests.map(
        (request) => {
            const isCompleted = completed.find(
                (complete) => {
                    return request.id === complete.requestId
                }
            )

                request.completed = !!isCompleted
                    // !! converts truthy or falsy to actual true and false values
            // if (isCompleted) {
            //     request.completed = true
            // } else {
            //     request.completed = false
            // }
            return request
        })

    applicationState.requests.sort(
        (current, next) => {
            return current.completed - next.completed
        }
    )
    return applicationState.requests.map((request) => ({ ...request }))
}

export const getCompletions = () => {
    return applicationState.completions.map((request) => ({ ...request }))
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendCompletion = (userServiceCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceCompletion)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
