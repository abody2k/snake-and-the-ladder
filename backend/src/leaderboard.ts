import type { LeaderBoard } from "./rooms.ts";
import { CreateRedisClient } from "./util.ts";

/**
 * checks if the player has more than the least number of wins,
 * if so, it will sort the array to include this player and exlude the
 * last one. otherwise it will just keep things as it is
 * @param numberOfWins number of wins
 * @param playerName the name of the player
 */
export async function updateLeaderboard(numberOfWins: number, playerName: string) {


    let client = await CreateRedisClient();
    let minimumWins = Number(await client.get("minimum_win"))

    if (numberOfWins > minimumWins) {

        let leaderboard: LeaderBoard[] = JSON.parse(await client.get("leaderboard") as string);
        leaderboard.push({
            playerName: playerName,
            wins: numberOfWins
        })
        leaderboard.sort((a, b) => b.wins - a.wins); // b - a to make it desc order
        leaderboard = leaderboard.slice(0, 10)
        await client.set("leaderboard", JSON.stringify(leaderboard));
        await client.set("minimum_win", leaderboard[(leaderboard.length - 1) as number]?.wins as number)
    }
    client.destroy();
}