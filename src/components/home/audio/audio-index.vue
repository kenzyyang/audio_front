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
            <div class="content-item" v-for="i in 5">
                <img :src="book" alt="">
                <p title="哈利波特与魔法石">哈利波特与魔法石</p>
                <span>kenzyyang</span>
            </div>
        </div>
        <div class="title">
            <p>中文书</p>
        </div>
        <div class="content">
            <div class="content-item" v-for="i in 5">
                <img :src="book" alt="">
                <p title="哈利波特与魔法石">哈利波特与魔法石</p>
                <span>kenzyyang</span>
            </div>
        </div>
        <div class="title">
            <p>英文书</p>
        </div>
        <div class="content">
            <div class="content-item" v-for="i in 5">
                <img :src="book" alt="">
                <p title="哈利波特与魔法石">哈利波特与魔法石</p>
                <span>kenzyyang</span>
            </div>
        </div>
    </div>
</template>

<script>
    import book from "../../../assets/home/images/book.jpeg";

    export default {
        name: "home-audio",
        data() {
            return {
                book: book
            }
        }
    }
</script>

<style scoped lang="scss">
    .home-audio {
        width: 1200px;

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