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