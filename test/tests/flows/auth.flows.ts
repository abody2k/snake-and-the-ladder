import { Auth } from "../../pages/auth.pages";

export async function register(username: string, password: string, auth: Auth) {

    await auth.fillUsername(username);
    await auth.fillPassword(password);
    if ((await auth.switchingLocator.textContent())?.includes("sign up")) {
        await auth.switchBetweenLoginAndSignUp(); // switch only if the current UI is for logging in
    }
    await auth.clickOnSignUp();


}


export async function login(username: string, password: string, auth: Auth) {

    await auth.fillUsername(username);
    await auth.fillPassword(password);
    if ((await auth.switchingLocator.textContent())?.includes("login")) {
        await auth.switchBetweenLoginAndSignUp(); // switch only if the current UI is for logging in
    }
    await auth.clickOnLogin();

}