<template>
    <div class="audio-detail">
        <div class="detail-header">
            <div class="detail-header-left">
                <img :src="book" alt="">
            </div>
            <div class="detail-header-right">
                <div>
                    <p class="audio-title">哈利波特</p>
                    <p class="audio-introduce">
                        这是和奇奇妙妙一起唱国学儿歌——让宝宝快乐启蒙！
                        国学唱出来，好听又好记！让宝贝在潜移默化中记住唐诗、宋词、汉乐府、三字经等国学经典，和奇奇妙妙一起唱国学儿歌，领略经典的魅力！
                        古诗词儿歌：有唐诗、宋词、汉乐府，涵盖了小学必背古诗词，从简单到复杂，从五言到七言，童音吟唱三遍+童音诵读一遍，让宝贝爱上古诗词！
                        三字经儿歌：奇奇和妙妙把《三字经》唱出来，非常适合低幼小朋友识记。小朋友不用刻意背诵，优美的音乐，稚嫩的童音，作为磨耳朵内容就很好。
                    </p>
                    <div class="audio-play">
                        <div class="audio-play-inside">
                            <i class="fa fa-play-circle-o"></i>
                            <p>立即播放</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="audio-list">
            <div class="audio-list-title">
                <p>
                    有声书音频章节
                </p>
            </div>
            <div class="audio-list-item" v-for="i in 10" :key="i">
                <div>
                    <p class="audio-list-item-order">{{i}}</p>
                    <p class="audio-list-item-name">{{i}}</p>
                </div>
                <div>
                    <p class="audio-list-item-time">{{i}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import book from "../../../assets/home/images/book.jpeg";

    export default {
        name: "audio-detail",
        data() {
            return {
                book: book
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .audio-detail {
        height: 800px;
        /* 头部样式 */
        .detail-header {
            width: 1200px;
            height: 200px;
            margin-top: 30px;
            padding-bottom: 40px;
            border-bottom: 1px solid rgb(232, 232, 232);
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: nowrap;

            .detail-header-left {
                margin-left: 50px;

                img {
                    width: 250px;
                    height: 210px;
                    overflow: hidden;
                    border-radius: 5px;
                }
            }

            .detail-header-right {
                margin-left: 50px;

                .audio-title {
                    font-size: 24px;
                    font-weight: 500;
                    color: #333;
                }

                .audio-introduce {
                    margin-top: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #555;
                }

                .audio-play {
                    margin-top: 30px;
                    display: flex;
                    align-items: center;

                    .audio-play-inside {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        cursor: pointer;
                    }

                    i {
                        font-size: 35px;
                        font-weight: 400;
                        color: #409EFF;
                    }

                    p {
                        display: inline-block;
                        font-size: 20px;
                        font-weight: 400;
                        color: #333;
                        margin-left: 5px;
                    }
                }
            }
        }

        .audio-list {
            width: 1000px;
            padding-left: 80px;

            .audio-list-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgb(232, 232, 232);

                p {
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                }
            }

            .audio-list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                border-bottom: 1px solid rgb(232, 232, 232);
                .audio-list-item-order {
                    display: inline-block;
                    width: 30px;
                    font-size: 14px;
                    margin-left: 20px;
                    color: #a3a3ac;
                }
                .audio-list-item-name{
                    display: inline-block;
                    width: 400px;
                    margin-left: 30px;
                    font-size: 14px;
                    color: #333;
                }
                .audio-list-item-time{
                    float: right;
                    margin-right: 50px;
                    font-size: 12px;
                    color: #888;

                }
            }
        }
    }
</style>