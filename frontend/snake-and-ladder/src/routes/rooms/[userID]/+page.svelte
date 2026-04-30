<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { makeRoom, playAgainstAI } from "../../../utils";
    import { Button, Li, List } from "flowbite-svelte";
    let itIsAI = false;
    let itIsMyRoom = false;
    let myTurn = $state(true);

    let data = $state({
        plyrPos: [],
        pcPos: [],
    });

    onMount(async () => {
        if (page.params.userID === localStorage.getItem("userID")) {
            //making my own room
            itIsMyRoom = true;
            //if it's PC mode then use the REST API

            itIsAI = localStorage.getItem("target") === "AI";

            //otherwise use the socket.io client

            if (itIsAI) {
                await makeRoom();
            } else {
            }
        } else {
            //joining somebody's else room
        }
    });
</script>

<div class="p-8">

    {#if myTurn}
    <Button
        onclick={async () => {
            myTurn = false;
            data = await playAgainstAI();
            myTurn = true;
        }}>Play</Button
    >
{/if}

<List>
    <Li>
        Player Positions : {data.plyrPos.join("...")}
    </Li>

    <Li>
        AI Positions : {data.pcPos.join("...")}
    </Li>
</List>

</div>