<template>
    <div class="home-carousel">
        <!-- 走马灯，展示当前社团的主要活动 -->
        <el-carousel trigger="click" type="card" height="380px">
            <el-carousel-item>
                <img :src="pic1" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img :src="pic2" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img :src="pic3" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img :src="pic4" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import pic1 from "../../assets/home/images/1.jpg";
    import pic2 from "../../assets/home/images/2.jpeg";
    import pic3 from "../../assets/home/images/3.jpeg";
    import pic4 from "../../assets/home/images/4.jpeg";

    export default {
        name: "home-body",
        data() {
            return {
                pic1: pic1,
                pic2: pic2,
                pic3: pic3,
                pic4: pic4
            }
        },
    }
</script>

<style scoped lang="scss">
    .home-carousel {
        width: 100%;
        min-width: 1200px;
        height: 400px;
        padding-top: 10px;
        padding-bottom: 10px;
        img{
            width: 100%;
        }
    }
</style>