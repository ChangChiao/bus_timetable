<template>
    <div class="home">
        <img src="/images/Index-header-logo.svg" alt="" />
        <router-link to="/busRoute">/busRoute</router-link>
        <router-link to="/busSearch">/busSearch</router-link>
        <router-link to="/favorite">/favorite</router-link>
        <router-link to="/busNear">/busNear</router-link>
        <router-link to="/busmap">/busmap</router-link>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {},
};
</script>
