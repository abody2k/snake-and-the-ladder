import { randomInt } from "node:crypto";
import { expect, test } from "../fixtures/globalFixture";
import { login, register } from "../flows/auth.flows";



test.describe("Auth tests goes here", () => {



    test("Signs up with new valid credentials", async ({ page, home, auth }) => {


        await home.goHome();
        await home.clickOnAuthInTopBar();
        const username = "username : " + randomInt(100000);
        await register(username, "cool passworddd", auth,page);
        
        await expect(page).toHaveURL(process.env.CLIENT,{timeout:30000});


    })


    test("Logs in when valid credentials are provided", async ({ page, home, auth }) => {


        await home.goHome();
        await home.clickOnAuthInTopBar();
        const username = "username : " + randomInt(1000);

        await register(username, "pass", auth,page);
        

        await home.clickOnAuthInTopBar()
        await auth.clickOnLogOut();
        await login(username, "pass", auth);

        await expect(page).toHaveURL(process.env.CLIENT);


    })





})