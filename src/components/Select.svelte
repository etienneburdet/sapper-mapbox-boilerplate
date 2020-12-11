<!-- Ex :
let services = ['Producteur','Point de vente'];
let serviceSelected = services;

<Select placeholder="Choisissez un service"
        items={services}
        selectedValue={serviceSelected}></Select>
<div>{serviceSelected && serviceSelected[0] && serviceSelected[0].label}</div>
-->
<script>
    import { onMount } from 'svelte';

    export let placeholder;
    export let items;
    export let selectedValue = [];

    let open = false;
    let btn;

    onMount(() => {
        btn.addEventListener('click', () => {
            open = !open;
        });
    });
</script>


<div class="dropdown" class:is-active={open}>
    <div class="dropdown-trigger" bind:this={btn}>
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{(selectedValue.length > 0 && selectedValue.join(', ')) || placeholder}</span>
            <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
        </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
            {#each items as item}
                <label class="dropdown-item">
                    <input type="checkbox" bind:group={selectedValue} value={item} class="checkbox">
                    {item}
                </label>
            {/each}
        </div>
    </div>
</div>


<style lang="scss" global>
    .dropdown,
    .dropdown-trigger {
        width: 100%;

        button {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    .dropdown-item {
        display: flex !important;
        align-items: center;

        .checkbox {
            margin-right: 5px;
        }
    }

</style>
