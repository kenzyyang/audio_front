<!--
    @author:  kenzyyang
    @date:  2019-4-16
    @desc:  首页的整体页面构成，包含其他多个子模块。
-->
<template>
    <div class="home">
        <home-carousel></home-carousel>
        <home-notice></home-notice>
        <home-audio></home-audio>
    </div>
</template>

<script>
    import homeCarousel from "../components/home/home-carousel";
    import homeNotice from "../components/home/home-notice";
    import homeAudio from "../components/home/home-audio";

    export default {
        name: "home",
        data() {
            return {}
        },
        methods: {},
        components: {
            homeCarousel,
            homeNotice,
            homeAudio
        }
    }
</script>

<style scoped lang="scss">
    .home {
        width: 100%;
        min-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>