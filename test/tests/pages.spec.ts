import { expect, test } from "../fixtures/globalFixture";


/**
 * 
 * 
 * Because there are only few UI tests I decided to group them
 * in one place, otherwise I would have use seperate files for
 * each UI
 */
test.describe("UI tests go here",()=>{




    test("Goes home when clicking on Home link in top bat",async({home,page})=>{



        await home.goHome();
        await home.clickOnHomeTopBar();

        await expect(page).toHaveURL(process.env.BASE_URL)
    })


})