<!--
    @author:  kenzyyang
    @date:  2019-4-16
    @desc:  展示版权信息
-->
<template>
    <div class="home-footer">
        <p>&copy;版权所属 武汉理工大学计算机科学与技术学院 2019</p>
    </div>
</template>

<script>
    export default {
        name: "home-footer"
    }
</script>

<style scoped lang="scss">
    .home-footer {
        width: 100%;
        min-width: 1200px;
        height: 120px;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>