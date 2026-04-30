<script>
    import { Button, Navbar, NavHamburger, NavLi, NavUl } from "flowbite-svelte";




    
</script>


<Navbar class="size-fit" fluid={true}>
<NavHamburger></NavHamburger>
    <NavUl>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/auth">sign in / sign up</NavLi>
        <NavLi href="/leaderboard">leaderboard</NavLi>
    </NavUl>


</Navbar>
