import { Page } from "playwright"
export class Home {


    constructor(private page: Page) {


    }

    async goHome() {

        await this.page.goto(process.env.BASE_URL);

    }

    async clickOnHomeTopBar() {

        await this.page.getByRole('link', { name: 'Home' }).click();
    }


    async clickOnAuthInTopBar() {

        await this.page.getByRole('link', { name: 'sign in / sign up' }).click();
    }


    async clickOnLeaderboardInTopBar() {

        await this.page.getByRole('link', { name: 'leaderboard' }).click();
    }



    async clickOnPlayAgainstAI() {

        await this.page.getByRole('button', { name: 'Play against AI' }).click();
    }



        async clickOnPlayWithFriends() {

        await this.page.getByRole('button', { name: 'Play with friends' }).click();
    }

}