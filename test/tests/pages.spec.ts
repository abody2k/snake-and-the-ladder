import { expect, test } from "../fixtures/globalFixture";
import { login, register } from "./flows/auth.flows";


/**
 * 
 * 
 * Because there are only few UI tests I decided to group them
 * in one place, otherwise I would have use seperate files for
 * each UI
 */
test.describe("UI tests go here", () => {




    test("Goes home when clicking on Home link in top bat", async ({ home, page }) => {



        await home.goHome();
        await home.clickOnHomeTopBar();

        await expect(page).toHaveURL(process.env.BASE_URL)
    })


    test("Goes to Leaderboard when clicking on Leaderboard link in top bat", async ({ home, page }) => {



        await home.goHome(); // goes to homepage
        await home.clickOnLeaderboardInTopBar(); // clicks on leaderboard link on topbar

        await expect(page).toHaveURL(/.*leaderboard/)
    })



    test("Goes to Auth UI when clicking on Auth link in top bat", async ({ home, page }) => {



        await home.goHome(); // goes to homepage
        await home.clickOnAuthInTopBar(); // clicks on leaderboard link on topbar

        await expect(page).toHaveURL(/.*auth/)
    })


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