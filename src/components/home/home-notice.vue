<template>
    <div class="home-notice">
        <!-- 暂时分三个模块，公告，新闻，动态,虽然不知道有啥区别 -->
        <div class="notice">
            <div class="header">
                <p>公 告</p>
                <span>更多>></span>
            </div>
            <div class="content">
                <div class="content-item" v-for="item in notice" :key="item.id">
                    <p :title="item.title">{{item.title}}</p>
                    <span>{{item.date}}</span>
                </div>
            </div>
        </div>
        <div class="notice">
            <div class="header">
                <p>新 闻</p>
                <span>更多>></span>
            </div>
            <div class="content">
                <div class="content-item" v-for="item in news" :key="item.id">
                    <p :title="item.title">{{item.title}}</p>
                    <span>{{item.date}}</span>
                </div>
            </div>
        </div>
        <div class="notice">
            <div class="header">
                <p>动 态</p>
                <span>更多>></span>
            </div>
            <div class="content">
                <div class="content-item" v-for="item in dynamic" :key="item.id">
                    <p :title="item.title">{{item.title}}</p>
                    <span>{{item.date}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-notice",
        data() {
            return {
                // 控制所有内容仅有最新的八条
                notice: [
                    {
                        id: 1,
                        title: 'hello this is my first titlehello this is my first titlehello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 2,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    }
                ],
                news: [
                    {
                        id: 3,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 4,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    }
                ],
                dynamic: [
                    {
                        id: 5,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    },
                    {
                        id: 6,
                        title: 'hello this is my first title',
                        date: '2019-4-19'
                    }
                ]

            }
        }
    }
</script>

<style scoped lang="scss">
    .home-notice {
        width: 100%;
        min-width: 1200px;
        height: 400px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        padding-top: 10px;
        padding-bottom: 10px;

        .notice {
            width: 380px;
            height: 380px;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    margin-left: 40px;
                    display: inline-block;
                    font-size: 20px;
                    font-weight: 400;
                    color: #333;
                }

                span {
                    margin-right: 5px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #555;
                    cursor: pointer;
                }

                span:hover {
                    color: #409EFF;
                }
            }

            .content {
                margin-top: 20px;
                border-top: 5px solid #409EFF;

                .content-item {
                    width: 380px;
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    p {
                        display: inline-block;
                        margin-left: 5px;
                        font-size: 16px;
                        font-weight: 400;
                        font-color: #333;
                        cursor: pointer;
                        /* 内容过长时省略 */
                        max-width: 295px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    p:hover {
                        color: #409EFF;
                    }

                    span {
                        font-size: 12px;
                        font-weight: 400;
                        font-color: #888;
                    }
                }
            }
        }
    }
</style>