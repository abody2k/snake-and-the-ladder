<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { makeRoom } from "../../../utils";
    let itIsAI = false;
    let itIsMyRoom = false;
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
