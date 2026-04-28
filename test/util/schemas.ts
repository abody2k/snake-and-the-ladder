import zod from "zod";

export const authSchema = zod.object(

    {

        token: zod.string()
    }
)


export const playingSchema = zod.object(

    {

        plyrPos: zod.array(zod.number()),
        pcPos: zod.array(zod.number())
    }
)


export const roomSchema = zod.object({

    wins: zod.number(),
    loses: zod.number(),
    playerTurn: zod.number(),
    playerPos: zod.number(),
    pcPos: zod.number()
})


export const multiplayRoomSchema = zod.object({

    wins: zod.array((zod.tuple([zod.string(), zod.number()]))),
    playerTurn: zod.string(),
    playerPos: zod.array((zod.tuple([zod.string(), zod.number()]))),
})

/**
 * used when a player makes a move and the socket sends
 * data back to all players
 */
export const multiplayerSyncSchema = zod.object({


    newPos: zod.array((zod.tuple([zod.string(), zod.number()]))),
    prePlyrPos: zod.array(zod.number()),
    prePlyr: zod.string()
})