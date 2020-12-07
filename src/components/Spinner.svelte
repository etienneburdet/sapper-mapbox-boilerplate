<div class="button is-loading"></div>

<style lang="scss">
    div {
        z-index: 100000;
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        width: 100%;
        background: #ffffff66;
        border-radius: 0;
        border: none;
        font-size: 7rem;
    }

    :global(.button.is-loading:after) {
            border: 2px solid #565656;
            border-right-color: transparent;
            border-top-color: transparent;
    }
</style>