<template>
    <div class="home">
        <home-header></home-header>
        <home-carousel></home-carousel>
        <home-notice></home-notice>
        <home-audio></home-audio>
        <home-footer></home-footer>
    </div>
</template>

<script>
    import homeHeader from "../components/home/home-header";
    import homeCarousel from "../components/home/home-carousel";
    import homeNotice from "../components/home/home-notice";
    import homeAudio from "../components/home/home-audio";
    import homeFooter from "../components/home/home-footer";

    export default {
        name: "home",
        data() {
            return {}
        },
        methods: {},
        components: {
            homeHeader,
            homeCarousel,
            homeNotice,
            homeAudio,
            homeFooter
        }
    }
</script>

<style scoped lang="scss">
    .home{
        width: 100%;
        min-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>