export async function postRequest(url: string, data: {}) {


    fetch("http://app:3000/api/"+url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            'Content-Type': "Application/json"
        },

    })

}


export async function getRequest(url: string, ) {


    fetch("http://app:3000/api/"+url, {
        method: "GET",
        headers: {
            'Content-Type': "Application/json"
        },

    })

}
