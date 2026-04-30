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
</script>

<div class="p-8">
    <Topbar></Topbar>
    <div class="flex justify-center items-center self-center">
        <Listgroup>
            <ListgroupItem>
                <Button outline color="dark">Play against AI</Button>
            </ListgroupItem>
            <ListgroupItem
                ><Button outline color="dark">Play with friends</Button>
            </ListgroupItem>
        </Listgroup>
    </div>
</div>
