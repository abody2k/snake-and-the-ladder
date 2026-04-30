<script lang="ts">
    import { Alert, Button, Navbar, NavLi, NavUl } from "flowbite-svelte";
</script>

<div class="p-8">
    <Navbar>
        <NavUl>
            <NavLi href="/">Home</NavLi>
            <NavLi href="/about-us">About us</NavLi>
            <NavLi href="/leaderboard">leaderboard</NavLi>
        </NavUl>

        <Button color="blue">Play against AI</Button>
        <Button color="dark">Play with friends</Button>
    </Navbar>
</div>
