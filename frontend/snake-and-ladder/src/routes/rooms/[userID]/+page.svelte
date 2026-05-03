<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import {
    initUserWithData,
        joinRoom,
        listenToAllEvents,
        makeRoom,
        playAgainstAI,
        playAgainstPlayer,
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
        let intervalID = setInterval(() => {
            console.log("checking ...");
            console.log(window);
            console.log(window[0]);

            if (window[0]) {
                listenToAllEvents(getSocket());
                clearInterval(intervalID);
                window[0].play = playAgainstPlayer;
            }
        }, 250);

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
                window.play = playAgainstPlayer;
                socket = getSocket();

                socket.removeAllListeners();
                console.log("Making a new room as the room owner");

                roomDataMultiplayer = await startMultiplayerGame(socket);
                initUserWithData(roomDataMultiplayer);
                console.log(roomDataMultiplayer);
            }
        } else {
            //joining somebody's else room
            socket = getSocket();
            window.play = playAgainstPlayer;
            socket.removeAllListeners();
            console.log("Joining somebody's else room");
            roomDataMultiplayer = await joinRoom(socket, page.params.userID);
            initUserWithData(roomDataMultiplayer);
            console.log(roomDataMultiplayer);

            myTurn = roomDataMultiplayer.playerTurn === myID;
        }
    });
</script>

<Game></Game>
