<script lang="ts">
    import {
        Alert,
        Button,
        Listgroup,
        ListgroupItem,
        Navbar,
        NavLi,
        NavUl,
    } from "flowbite-svelte";
    import Topbar from "./Topbar.svelte";
    import { goto } from "$app/navigation";

    async function playAgainstAI() {
        //if not logged in then login
        let userID = localStorage.getItem("userID");
        if (!userID) {
            await goto("/auth");
        } else {
            await goto(`/rooms/${userID}`);
        }
    }
</script>

<div class="p-8">
    <Topbar></Topbar>
    <div class="flex justify-center items-center self-center">
        <Listgroup>
            <ListgroupItem>
                <Button outline color="dark" onclick={playAgainstAI}>Play against AI</Button>
            </ListgroupItem>
            <ListgroupItem
                ><Button outline color="dark">Play with friends</Button>
            </ListgroupItem>
        </Listgroup>
    </div>
</div>
