<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import {
        makeRoom,
        playAgainstAI,
        startMultiplayerGame,
    } from "../../../utils";
    import { Button, Li, List } from "flowbite-svelte";
    import Topbar from "../../Topbar.svelte";
    import { getSocket } from "$lib/socket";
    import Game from "../../../components/Game.svelte";
    let itIsAI = false;
    let itIsMyRoom = false;
    let myTurn = $state(true);
    let myID = "";
    let socket;

    let data = $state({
        //this is only for single player
        plyrPos: [],
        pcPos: [],
    });
    let roomDataMultiplayer = $state({
        wins: [["", 0]], //array of arrays to support more than 2 players [playerID, wins]
        playerTurn: "", //playerID of the player whose turn it is
        playerPos: [["", 0]], //array of arrays to support more than 2 players [playerID, position]
    });

    onMount(async () => {

        

        if (page.params.userID === localStorage.getItem("userID")) {
            //making my own room
            itIsMyRoom = true;
            //if it's PC mode then use the REST API

            itIsAI = localStorage.getItem("target") === "AI";
            myID = localStorage.getItem("userID") ?? "";
            //otherwise use the socket.io client

            if (itIsAI) {
                await makeRoom();
            } else {
                socket = getSocket();

                socket.removeAllListeners();
                roomDataMultiplayer = await startMultiplayerGame(socket);
            }
        } else {
            //joining somebody's else room
            socket = getSocket();
            socket.removeAllListeners();
            roomDataMultiplayer = await startMultiplayerGame(socket);
            myTurn = roomDataMultiplayer.playerTurn === myID;
        }
    });
</script>




  
        <Game></Game>
 
