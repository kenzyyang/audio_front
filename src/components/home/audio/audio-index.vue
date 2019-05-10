<!--
    @author:  kenzyyang
    @date:  2019-4-16
    @desc:  用于展示当前社团正在录制的书籍
-->
<template>
    <div class="home-audio">
        <div class="title" style="border-bottom: 5px solid #67C23A;">
            <p>我参与的</p>
        </div>
        <div class="content">
            <div class="content-item" v-for="audio in myAudio">
                <img :src="book" alt="">
                <div>
                    <p :title="audio.audioName" @click="toAudioDetail(audio.id)">{{audio.audioName}}</p>
                </div>
                <span>kenzyyang</span>
            </div>
        </div>
        <div class="title">
            <p>英文书</p>
        </div>
        <div class="content">
            <div class="content-item" v-for="audio in enAudio">
                <img :src="'http://localhost:3000' + audio.coverPath" alt="">
                <div>
                    <p :title="audio.audioName" @click="toAudioDetail(audio.id)">{{audio.audioName}}</p>
                </div>
                <span>{{audio.createUser}}</span>
            </div>
        </div>
        <div class="title">
            <p>中文书</p>
        </div>
        <div class="content">
            <div class="content-item" v-for="audio in cnAudio">
                <img :src="'http://localhost:3000' + audio.coverPath" alt="">
                <div>
                    <p :title="audio.audioName" @click="toAudioDetail(audio.id)">{{audio.audioName}}</p>
                </div>
                <span>kenzyyang</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAllAudio
    } from "../../../common/api/audio"

    // 中英文书类型宏定义
    const enType = 1, cnType = 2;

    export default {
        name: "home-audio",
        data() {
            return {
                myAudio: [],
                enAudio: [],
                cnAudio: []
            }
        },
        methods: {
            initAudioList() {
                const data = {
                    currentPage: 1,
                    currentSize: 10000
                };
                let cnList = [], enList = [];
                getAllAudio(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        let audioList = response.data.data.list;
                        for (let audio of audioList) {
                            if (audio.audioType === enType) {
                                enList.push(audio);
                            } else if (audio.audioType === cnType) {
                                cnList.push(audio);
                            }
                        }
                        this.enAudio.splice(0);
                        this.cnAudio.splice(0);
                        this.enAudio.push(...enList);
                        this.cnAudio.push(...cnList);
                    } else {
                        console.log('获取有声书信息失败: ' + response.data.message);
                    }
                }).catch((err) => {
                    console.log('获取有声书信息失败: ', err);
                }).finally(() => {

                });
            },
            toAudioDetail(id) {
                this.$router.push({
                    path: '/audio/detail/' + id
                });
            }
        },
        mounted() {
            this.initAudioList();
        }
    }
</script>

<style scoped lang="scss">
    .home-audio {
        width: 1200px;
        margin-bottom: 30px;

        .title {
            padding-bottom: 5px;
            padding-left: 10px;
            border-bottom: 5px solid #409EFF;
            margin-top: 10px;
            font-size: 20px;
            font-weight: 400;
            color: #555;
        }

        .content {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-top: 20px;

            .content-item {
                width: 200px;
                height: 250px;
                margin-left: 20px;

                img {
                    width: 200px;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 5px;
                }

                p {
                    font-size: 16px;
                    color: #333;
                    cursor: pointer;
                    margin-left: 5px;
                    display: inline-block;
                    /* 内容过长时省略 */
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                p:hover {
                    color: #409EFF;
                }

                span {
                    display: inline-block;
                    font-size: 14px;
                    color: #888;
                    cursor: pointer;
                    margin-left: 5px;
                }

                span:hover {
                    color: #E6A23C;
                }
            }
        }
    }
</style>