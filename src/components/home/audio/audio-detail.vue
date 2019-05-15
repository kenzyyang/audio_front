<template>
    <div class="audio-detail">
        <div class="detail-header">
            <div class="detail-header-left">
                <img :src="audioCover" alt="">
            </div>
            <div class="detail-header-right">
                <div>
                    <p class="audio-title">{{audioName}}</p>
                    <p class="audio-introduce">
                        {{audioAbstract}}
                    </p>
                    <div class="audio-play-all">
                        <div class="audio-play-inside" @click="audioPlayAll" v-if="!audioPlayStatus">
                            <i class="fa fa-play-circle-o"></i>
                            <p>立即播放</p>
                        </div>
                        <div class="audio-play-inside" @click="audioPause" v-else>
                            <i class="fa fa-pause-circle-o"></i>
                            <p>停止播放</p>
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
            <div class="audio-list-item" v-for="(chapter, index) in chapters" :key="index"
                 :class="{
                    'audio-list-item_active': audioPlayStatus && audioIndex === index + 1
                 }"
                 @click="audioPlayList(index+1)">
                <div>
                    <p class="audio-list-item-order">{{(currentPage - 1) * 10 + index + 1}} {{ audioPlayStatus &&
                        audioIndex === index + 1?'播放中': ''}}</p>
                    <p class="audio-list-item-name">{{chapter.title}}</p>
                </div>
                <div>
                    <p class="audio-list-item-time">{{chapter.createdTime}}</p>
                </div>
            </div>
        </div>
        <div class="pagination">
            <el-pagination
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import book from "../../../assets/home/images/book.jpeg";
    import {
        getOneAudio
    } from "../../../common/api/audio";
    import {
        getAllChapterById
    } from "../../../common/api/chapter";

    export default {
        name: "audio-detail",
        data() {
            return {
                book: book,
                // 有声书信息相关
                audioName: '',
                audioAbstract: '',
                audioCover: book,
                // 章节信息相关
                chapters: [],
                //分页相关
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            initAudio() {
                const data = {
                    id: this.audioId
                };
                getOneAudio(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        const audio = response.data.data;
                        this.audioName = audio.audioName;
                        this.audioAbstract = audio.audioAbstract;
                        this.audioCover = window.HOST + audio.coverPath;
                    } else {
                        this.$message.warning('获取有声书信息失败: ' + response.data.message);
                    }
                }).catch((err) => {
                    console.log('获取有声书信息失败: ' + err);
                });
            },
            currentChange(val) {
                this.currentPage = val;
                this.updateChapter();
            },
            updateChapter() {
                const data = {
                    id: this.audioId,
                    currentPage: this.currentPage,
                    currentSize: 10,
                    uploaded: true
                };
                getAllChapterById(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        this.total = response.data.data.count;
                        const chapters = response.data.data.list;
                        this.chapters.splice(0);
                        this.chapters.push(...chapters);
                    } else {
                        this.$message.warning('获取有声书章节信息失败: ' + response.data.message);
                    }
                }).catch((err) => {
                    console.log('获取有声书章节信息失败: ' + err);
                });
            },
            audioPlayAll() {
                if (this.chapters.length === 0) {
                    this.$message.warning('该有声书没有录音，无法播放');
                    return;
                }
                this.$store.commit('AUDIO_SET_LIST', this.chapters);
                this.$store.commit('AUDIO_SET_AUDIO_ID', this.audioId);
                this.$store.commit('AUDIO_PLAY');
            },
            audioPause() {
                this.$store.commit('AUDIO_PAUSE');
            },
            audioPlayList(number) {
                this.$store.commit('AUDIO_PLAY_LIST', number);
            }
        },
        computed: {
            audioId: {
                get() {
                    return this.$route.params.audioId;
                }
            },
            audioPlayStatus() {
                if (this.$store.state.audio.audioId - 0 === this.audioId - 0) {
                    return this.$store.state.audio.audioStatus;
                } else {
                    return false;
                }
            },
            audioIndex: {
                get() {
                    return this.$store.state.audio.index;
                }
            }
        },
        mounted() {
            if (isNaN(Number.parseInt(this.audioId))) {
                this.$message.error('页面访问失败');
                this.$router.push({
                    path: '/audio'
                })
            } else {
                this.initAudio();
                this.updateChapter();
            }
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

                .audio-play-all {
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
                cursor: pointer;
                color: #333;

                .audio-list-item-order {
                    display: inline-block;
                    width: 80px;
                    font-size: 14px;
                    margin-left: 20px;
                    color: #a3a3ac;
                }

                .audio-list-item-name {
                    display: inline-block;
                    width: 400px;
                    margin-left: 30px;
                    font-size: 14px;
                    color: #333;
                }

                .audio-list-item-time {
                    float: right;
                    margin-right: 50px;
                    font-size: 12px;
                    color: #888;

                }
            }

            .audio-list-item:hover {
                .audio-list-item-name {
                    color: #409EFF;
                }
            }

            .audio-list-item_active {
                .audio-list-item-name {
                    color: #409EFF;
                }
            }
        }

        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5px;
        }
    }
</style>