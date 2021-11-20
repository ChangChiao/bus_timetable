<template>
    <div class="flex">
        <ul>
            <li>
                <span>{{}}</span>
                <span>{{}}</span>
            </li>
        </ul>
        <ul>
            <li>
                <span>{{}}</span>
                <span></span>
            </li>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    props: {
        busInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
};
</script>
