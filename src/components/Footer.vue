<template>
    <footer
        class="
            bg-primary-700
            h-9
            fixed
            bottom-0
            flex
            justify-center
            items-center
            text-white
            z-50
            md:right-0
        "
    >
        The F2E 3rd Week3 - Bus
    </footer>
</template>

<script>
export default {};
</script>

<style lang="postcss">
footer {
    border-top-left-radius: 100px;
    width: calc(100vw - 384px);
}
@media screen and (max-width: 768px) {
    footer {
        width: 100vw;
    }
}
</style>
