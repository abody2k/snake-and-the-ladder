<script>
    import {
        Alert,
        Button,
        Img,
        Input,
        Label,
        Listgroup,
        ListgroupItem,
        Modal,
        Spinner,
    } from "flowbite-svelte";
    import Topbar from "../Topbar.svelte";
    import { handleAuthData, postRequest } from "../../utils";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    let login = $state(true);
    let alreadySignedIn = $state(false);
    function flipLoginSignup() {
        login = !login;
    }

    let username = $state("");
    let password = $state("");
    let busy = $state(false);

    async function loginRequest() {
        let data;
        busy = true;
        try {
            data = await postRequest("login", {
                username: username,
                password: password,
            });

            await handleAuthData(data, username);

            goto("/");
        } catch (error) {
            console.log(error);
        }

        busy = false;
    }

    async function signupRequest() {
        let data;
        busy = true;
        try {
            data = await postRequest("register", {
                username: username,
                password: password,
            });

            await handleAuthData(data, username);

            goto("/");
        } catch (error) {
            console.log(error);
        }

        busy = false;
    }

    onMount(async () => {
        if (localStorage.getItem("username")) {
            alreadySignedIn= true;
        }
    });
</script>

<Topbar></Topbar>

{#if alreadySignedIn}

<div class="flex flex-col justify-center items-center">

    <Alert color="gray">
    You Have already signed in!
</Alert>

<Img width={200} src={"/snake-and-the-ladder.png"}>
</Img>

<Button onclick={()=>{


    localStorage.clear()
}}> Click here to logout</Button>

</div>
{:else}
    <Modal
        class="flex items-center justify-center  size-fit"
        form
        title={login ? "Logging in" : "Signing up"}
        open={busy}
        permanent
    >
        <Spinner size="12" type="pulse"></Spinner>
    </Modal>
    <div class="flex justify-center items-center">
        <Listgroup>
            <ListgroupItem>
                <Input type="text" placeholder="Username" bind:value={username}
                ></Input>
            </ListgroupItem>
            <ListgroupItem>
                <Input
                    type="password"
                    placeholder="password"
                    bind:value={password}
                ></Input>
            </ListgroupItem>
            {#if login}
                <ListgroupItem>
                    <Button color="dark" onclick={loginRequest}>Login</Button>
                </ListgroupItem>
            {:else}
                <ListgroupItem>
                    <Button color="dark" onclick={signupRequest}>Sign up</Button
                    >
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
{/if}
