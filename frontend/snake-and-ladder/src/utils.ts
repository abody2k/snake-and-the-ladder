export async function postRequest(url: string, data: {}) {


    fetch("http://app:3000/"+url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            'Content-Type': "Application/json"
        },

    })

}

