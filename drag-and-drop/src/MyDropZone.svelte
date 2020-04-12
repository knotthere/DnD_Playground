<script>
    import { droparea } from "./drag.drop.handling";

    let files = ["Drop Here!"];

    const onFilesDrop = async event => {
        // Update the message
        console.log(event);
        console.log(event.detail);
        files = event.detail.files.map(file => file.name);
    };
</script>

<section class="section">
    <div class="container">
        <div class="drophere" use:droparea on:files={onFilesDrop}>
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
        margin: 20px;
    }

    .drophere {
        background-color: aquamarine;
        min-height: 100;
        text-align: middle;
        color: #0084ff;
        font-size: 2em;
        font-weight: 300;
    }
</style>
