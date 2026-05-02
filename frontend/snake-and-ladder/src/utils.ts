export async function postRequest(url: string, data: {}, token?: string) {

    if (token) {
        return await fetch("http://localhost:3000/api/" + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json",
                'Authorization': `Bearer ${token}`
            },

        });
    } else {

        return await fetch("http://localhost:3000/api/" + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },

        });
    }


}


export async function getRequest(url: string,) {


    return await fetch("http://localhost:3000/api/" + url, {
        method: "GET",
        headers: {
            'Content-Type': "Application/json"
        },

    })

}


export async function handleAuthData(data: Response, username: string) {


    const responseObj = await data.json();
    let token = responseObj.token;
    let userID = responseObj.userID;

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);

}




export async function makeRoom() {


    await postRequest("startGame", {}, localStorage.getItem("token") as string)
}



export async function playAgainstAI() {

    return await (await postRequest("play", {}, localStorage.getItem("token") as string)).json()

}



export async function startMultiplayerGame() {




}