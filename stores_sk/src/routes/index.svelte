<script>
import {count} from "$lib/stores/main.js";

</script>


<p on:click={count.increment}>{$count}</p>
<button on:click={count.increment}>+</button>
<button on:click={count.reset}>0</button>

