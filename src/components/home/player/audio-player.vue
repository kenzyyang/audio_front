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
                <i class="fa fa-play-circle-o play controller" v-if="!audioStatus" @click="audioPlay"></i>
                <i class="fa fa-pause-circle-o controller pause" v-else
                   @click="audioPause"></i>
                <i class="fa fa-step-forward forward controller"></i>
            </div>
            <div class="audio-process">
                <div class="title">
                    <p>
                        hello
                    </p>
                </div>
                <div class="slider">
                    <el-slider v-model="currentTime" @change="currentTimeChange" :max="duration"
                               :show-tooltip="false"></el-slider>
                </div>
            </div>
            <div class="audio-time">
                <p>
                    {{currentHours<10?'0'+currentHours:currentHours}}:
                    {{currentMinutes<10?'0'+currentMinutes:currentMinutes}}:
                    {{currentSeconds<10?'0'+currentSeconds:currentSeconds}}/
                    {{totalHours<10?'0'+totalHours:totalHours}}:
                    {{totalMinutes<10?'0'+totalMinutes:totalMinutes}}:
                    {{totalSeconds<10?'0'+totalSeconds:totalSeconds}}
                </p>
            </div>
            <div class="audio-button-group">
                <i class="fa fa-download" style="margin-left: 25px;"></i>
                <el-tooltip class="item" placement="top" effect="light">
                    <div slot="content">
                        <el-slider
                                v-model="volume"
                                :max="100"
                                vertical
                                @change="volumeChange"
                                height="100px">
                        </el-slider>
                    </div>
                    <i class="fa fa-volume-up" style="margin-left: 20px;"></i>
                </el-tooltip>
                <i class="fa fa-lock" style="margin-left: 20px;color: #409EFF;" @click="locked=!locked"
                   v-if="locked"></i>
                <i class="fa fa-unlock" style="margin-left: 20px;" @click="locked=!locked" v-else></i>
                <el-tooltip class="item" placement="top" effect="light">
                    <div slot="content">
                        播放列表
                        <p>11</p>
                        <p>11</p>
                        <p>11</p>
                        <p>11</p>
                    </div>
                    <i class="fa fa-list-ul" style="margin-left: 20px;"></i>
                </el-tooltip>
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
                source: 'http://localhost:3000/audio/11.mp3',
                player: null,
                // audio相关参数
                audioStatus: true,
                currentTime: 0,
                duration: 0,
                // 播放时间
                currentHours: 0,
                currentMinutes: 0,
                currentSeconds: 0,
                totalHours: 0,
                totalMinutes: 0,
                totalSeconds: 0,
                // 声音
                volume: 50
            }
        },
        methods: {
            audioPlay() {
                this.player.play();
                this.audioStatus = true;
            },
            audioPause() {
                this.player.pause();
                this.audioStatus = false;
            },
            initAudio() {
                this.duration = this.player.duration;
                // 初始化播放时间
                this.player.volume = 0.5;
                this.totalHours = Number.parseInt(this.duration / 3600);
                this.totalMinutes = Number.parseInt(this.duration / 60);
                this.totalSeconds = Number.parseInt(this.duration % 60);
            },
            currentTimeChange() {
                this.player.currentTime = this.currentTime;
            },
            updateCurrentTime() {
                this.currentTime = this.player.currentTime;
                this.currentHours = Number.parseInt(this.currentTime / 3600);
                this.currentMinutes = Number.parseInt(this.currentTime / 60);
                this.currentSeconds = Number.parseInt(this.currentTime % 60);
            },
            volumeChange() {
                this.player.volume = this.volume / 100;
            }
        },
        mounted() {
            this.player = document.getElementById('music');
            this.player.oncanplay = this.initAudio;
            this.player.ontimeupdate = this.updateCurrentTime;
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

                .pause {
                    font-size: 36px;
                    margin-left: 15px;
                    color: #409EFF;
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
                width: 450px;
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

            .audio-time {
                p {
                    font-size: 14px;
                    margin-left: 5px;
                    display: inline-block;
                    color: white;
                }

                p:hover {
                    color: #409EFF;
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

    .el-tooltip__popper {
        padding: 0;
    }
</style>