<script>
    import { getSocket } from "$lib/socket";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";

    let socket = getSocket()

    let items = $state([{playerName:"",wins:""}])
    socket.emitWithAck("leaderboard",{})

    socket.on("lbu",(data)=>{

        items=data
        
    })



</script>


<div class="p-10">
    <Table>
        <TableHead>
            <TableHeadCell>Player name</TableHeadCell>
            <TableHeadCell>Number of wins</TableHeadCell>
        </TableHead>

        <TableBody>
 
            {#each items as playerData}
                            <TableBodyRow>
                <TableBodyCell>{playerData.playerName}</TableBodyCell>
                <TableBodyCell>{playerData.wins}</TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>

    </Table>

</div>