<script lang="ts">
    import { Alert, Button, Navbar, NavLi, NavUl } from "flowbite-svelte";
    import Topbar from "./Topbar.svelte";
</script>

<div class="p-8">
    <Topbar></Topbar>
        <Button color="blue">Play against AI</Button>
    <Button color="dark">Play with friends</Button>
</div>
