<template>
    <div class="index">
        <main-header></main-header>
        <router-view/>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import mainHeader from "../components/index/main-header";
    import mainFooter from "../components/index/main-footer";

    export default {
        name: "index",
        components: {
            mainHeader,
            mainFooter
        }
    }
</script>

<style scoped lang="scss">
    .index {
        width: 100%;
        min-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>