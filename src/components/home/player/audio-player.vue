<!--
   @author:  kenzyyang
   @date:  2019-5-12
   @desc:  原生实现的MP3播放器
 -->
<template>
    <div class="player">
        <div class="content">
            <div class="audio-image">
                <img :src="book" alt="不存在">
            </div>
            <div class="audio-controller">
                <i class="fa fa-step-backward backward controller"></i>
                <i class="fa fa-play-circle-o play controller"></i>
                <i class="fa fa-step-forward forward controller"></i>
            </div>
            <div class="audio-process">
                <div class="title">
                    <p>
                        hello
                    </p>
                </div>
                <div class="slider">
                    <el-slider v-model="value1" :show-tooltip="false"></el-slider>
                </div>
            </div>
            <div class="audio-button-group">
                <p>x&nbsp;&nbsp;{{times}}</p>
                <i class="fa fa-download" style="margin-left: 25px;"></i>
                <i class="fa fa-volume-up" style="margin-left: 20px;"></i>
                <i class="fa fa-lock" style="margin-left: 20px;color: #409EFF;" @click="locked=!locked"
                   v-if="locked"></i>
                <i class="fa fa-unlock" style="margin-left: 20px;" @click="locked=!locked" v-else></i>
                <i class="fa fa-list-ul" style="margin-left: 20px;"></i>
            </div>
        </div>
        <div>
            <audio ref="music" id="music" autoplay>
                <source :src="source" type="audio/mpeg">
            </audio>
        </div>
    </div>
</template>

<script>
    import book from '../../../assets/home/images/book.jpg'

    export default {
        name: "audio-player",
        data() {
            return {
                book: book,
                times: 1,
                locked: false,
                source: 'http://dl.stream.qqmusic.qq.com/C400001D2YIg48iyRW.m4a?guid=8543671434&vkey=F45C4B54998CA81863ADBE171CB6297256091E46618CF01E16C0545BF8C6C913B52C06D4A9D8D94A6E73CFD4C9E3152911BF357D39DC0E9B&uin=0&fromtag=66',
                player: null
            }
        },
        mounted() {
            this.player = document.getElementById('music');
            console.log(this.player);
        }
    }
</script>

<style lang="scss">
    .player {
        position: fixed;
        bottom: 0 !important;
        width: 100%;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);

        .content {
            width: 1000px;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            /*
            图片链接 */
            .audio-image {
                width: 30px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 2px;
                }
            }

            /* 控制器 */
            .audio-controller {
                margin-left: 40px;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .backward {
                    font-size: 16px;
                }

                .play {
                    font-size: 36px;
                    margin-left: 15px;
                    font-weight: 300;
                }

                .forward {
                    font-size: 16px;
                    margin-left: 15px;
                }

                .controller {
                    color: white;
                    cursor: pointer;
                }

                .controller:hover {
                    color: #409EFF;
                }
            }

            /* 标题和进度条 */
            .audio-process {
                margin-left: 30px;
                width: 600px;
                height: 60px;

                .title {
                    p {
                        margin-top: 5px;
                        font-size: 14px;
                        color: white;
                        cursor: pointer;
                        display: inline-block;
                    }

                    p:hover {
                        color: #409EFF;
                    }
                }
            }

            .audio-button-group {
                width: 200px;
                height: 60px;
                margin-left: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 18px;

                p {
                    color: white;
                    font-size: 14px;
                }

                i {
                    cursor: pointer;
                    color: white;
                }

                i:hover {
                    color: #409EFF;
                }
            }
        }
    }
</style>