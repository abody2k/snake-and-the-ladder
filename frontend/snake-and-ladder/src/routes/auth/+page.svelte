<script>
    import {
        Alert,
        Button,
        Input,
        Label,
        Listgroup,
        ListgroupItem,
    } from "flowbite-svelte";
    import Topbar from "../Topbar.svelte";
    import { postRequest } from "../../utils";
    let login = $state(true);
    function flipLoginSignup() {
        login = !login;
    }




    
</script>

<Topbar></Topbar>

<div class="flex justify-center items-center">
    <Listgroup>
        <ListgroupItem>
            <Input type="text" placeholder="Username" bind:value={username}
            ></Input>
        </ListgroupItem>
        <ListgroupItem>
            <Input type="text" placeholder="password" bind:value={password}
            ></Input>
        </ListgroupItem>
        {#if login}
            <ListgroupItem>
                <Button color="dark">Login</Button>
            </ListgroupItem>
        {:else}
            <ListgroupItem>
                <Button color="dark">Sign up</Button>
            </ListgroupItem>
        {/if}

        {#if login}
            <ListgroupItem>
                <Button onclick={flipLoginSignup}>
                    Click here if you want to sign up</Button
                >
            </ListgroupItem>
        {:else}
            <ListgroupItem>
                <Button onclick={flipLoginSignup}
                    >Click here if you want to login</Button
                >
            </ListgroupItem>
        {/if}
    </Listgroup>
</div>
