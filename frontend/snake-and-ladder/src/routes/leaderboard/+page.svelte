<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";

    let items

    

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
                <TableBodyCell>NUS NUS</TableBodyCell>
                <TableBodyCell>100</TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>

    </Table>

</div>