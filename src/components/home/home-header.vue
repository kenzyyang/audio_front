<template>
    <div class="header">
        <div v-if="!isLogin" @click="isLogin=true">登录</div>
        <div v-else>kenzyyang</div>
    </div>
</template>

<script>
    export default {
        name: "home-header",
        data() {
            return {
                isLogin: false
            }
        },

    }
</script>

<style scoped lang="scss">
    .header {
        width: 100%;
        min-width: 1200px;
        height: 60px;
        background-color: #409EFF;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>