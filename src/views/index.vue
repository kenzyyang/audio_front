<template>
    <div class="index">
        <main-header></main-header>
        <router-view/>
        <main-footer></main-footer>
        <audio-player></audio-player>
    </div>
</template>

<script>
    import mainHeader from "../components/index/main-header";
    import mainFooter from "../components/index/main-footer";
    import audioPlayer from '../components/home/player/audio-player';

    export default {
        name: "index",
        components: {
            mainHeader,
            mainFooter,
            audioPlayer
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