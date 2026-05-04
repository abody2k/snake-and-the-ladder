import { Auth } from "../../pages/auth.pages";

export async function register(username: string, password: string, auth: Auth) {

    await auth.fillUsername(username);
    await auth.fillPassword(password);

}