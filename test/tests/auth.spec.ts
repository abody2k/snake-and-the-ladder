import { expect, test } from "../fixtures/globalFixture";
import { login, register } from "../flows/auth.flows";



test.describe("Auth tests goes here", () => {



    test("Signs up with new valid credentials", async ({ page, home, auth }) => {


        await home.goHome();
        await home.clickOnAuthInTopBar();
        await register("a very new username", "cool password", auth);

        await expect(page).toHaveURL(process.env.BASE_URL);


    })


    test("Logs in when valid credentials are provided", async ({ page, home, auth }) => {


        await home.goHome();
        await home.clickOnAuthInTopBar();
        await register("nneww username", "pass", auth);

        await home.clickOnAuthInTopBar()
        await auth.clickOnLogOut();
        await login("nneww username", "pass", auth);

        await expect(page).toHaveURL(process.env.BASE_URL);


    })


    


})