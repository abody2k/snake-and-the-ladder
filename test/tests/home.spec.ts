import { randomInt } from "crypto";
import { expect, test } from "../fixtures/globalFixture";
import { register } from "../flows/auth.flows";


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

        await expect(page).toHaveURL(process.env.CLIENT)
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



/**
 * Same logic applies to multiplayer
 */
    test("Play against AI", async ({ home, page, auth }) => {



        await home.goHome(); // goes to homepage
        await home.clickOnAuthInTopBar(); //go to auth
        const username = "username : " + randomInt(100);
        await register(username, "sss", auth,page); //make an account that will take you back home
        await home.clickOnPlayAgainstAI(); // clicks on leaderboard link on topbar

        await expect(page).toHaveURL(/.*rooms/);
        const userID = await page.evaluate(() => {

            return localStorage.getItem("userID");
        })
        expect(page).toHaveURL( RegExp(`**/rooms/${userID}`))

    })


    

})