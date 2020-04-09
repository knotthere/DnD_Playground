<script>
    import { onMount } from "svelte";
    import { droparea } from "./files.drag.drop.LTK";

    let files = ["Drop Here!"];

    const id = "drophere";

    const onFilesDrop = async event => {
        // Update the message
        console.log(event)
        console.log(event.detail)
        files = event.detail.files.map(file => file.name);
    };
</script>

<section class="section">
    <div class="container">
        <div {id} class="drophere" use:droparea on:files={onFilesDrop}>
            {#each files as file}
                <p>{file}</p>
            {/each}
        </div>
    </div>
</section>

<style>
    section {
        height: 500px;
    }

    p {
        margin: 20px
    }

    .drophere {
        background-color: aquamarine;
        min-height: 400px;
        text-align: center;
        vertical-align: middle;
        color: #0084ff;
        font-size: 2em;
        font-weight: 300;
    }
</style>
