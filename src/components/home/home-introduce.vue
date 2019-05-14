<template>
    <div class="introduce">
        <div class="club-background-introduce">
            <div class="club-background club-box">
                <div class="club-image">
                    <img :src="introduce4" alt="">
                </div>
                <div class="club-title">
                    <p>
                        社团背景
                    </p>
                </div>
                <div class="club-content">
                    <p>
                        英文有声小说在学生中并不流行。所以，这个社团的初衷在于通过同学们合作朗读一本书，提高大家的口语，写作能力，并且在学生中推广英文有声小说。与此同时，挑战仅有用声音来演绎一个角色也是一个很有意思的表演经历。
                    </p>
                </div>
            </div>
            <div class="club-introduce club-box">
                <div class="club-image">
                    <img :src="introduce4" alt="">
                </div>
                <div class="club-title">
                    <p>
                        活动概述
                    </p>
                </div>
                <div class="club-content">
                    <p>
                        社员们会被分成旁白和小说中的各种角色，通过练习，共同朗读出来一本书，做成audiobook
                    </p>
                </div>
            </div>
        </div>
        <div class="learn-form">
            <p class="title">
                寓教于乐，在轻松的活动中学习知识
            </p>
            <div class="content">
                <div class="content-item">
                    <div class="content-item-img">
                        <img :src="introduce1" alt="">
                    </div>
                    <div class="content-item-title">
                        <p>别样的演绎</p>
                    </div>
                    <div class="content-item-content">
                        <p>尝试仅仅使用声音来打动听众,表现人物性格，情感，是一种不同于一般形式的表演。</p>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-item-img">
                        <img :src="introduce2" alt="">
                    </div>
                    <div class="content-item-title">
                        <p>潜移默化的口语练习</p>
                    </div>
                    <div class="content-item-content">
                        <p>朗读大量英文，模仿已有的英国人炉石的audiobook，口音，让你的语音语调变得更加地道，说话也会更大胆。</p>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-item-img">
                        <img :src="introduce3" alt="">
                    </div>
                    <div class="content-item-title">
                        <p>写作水平的提升</p>
                    </div>
                    <div class="content-item-content">
                        <p>网站上的字词整理，好词好句，让你边读边写，边玩边提分。</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import pic1 from "../../assets/home/images/1.jpg";
    import pic2 from "../../assets/home/images/2.jpeg";
    import pic3 from "../../assets/home/images/3.jpeg";
    import pic4 from "../../assets/home/images/4.jpeg";
    import introduce1 from "../../assets/home/images/introduce_1.png";
    import introduce2 from "../../assets/home/images/introduce_2.png";
    import introduce3 from "../../assets/home/images/introduce_3.png";
    import introduce4 from "../../assets/home/images/introduce_4.png";
    import introduce5 from "../../assets/home/images/introduce_5.png";

    export default {
        name: "home-introduce",
        data() {
            return {
                pic1: pic1,
                introduce1: introduce1,
                introduce2: introduce2,
                introduce3: introduce3,
                introduce4: introduce4,
                introduce5: introduce5
            }
        }
    }
</script>

<style scoped lang="scss">
    .introduce {
        position: relative;
        width: 100%;
        min-width: 1200px;


        .club-background-introduce {
            height: 300px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: flex-start;

            .club-box {
                width: 45%;
                display: inline-flex;
                justify-content: center;
                align-items: flex-start;
                flex-wrap: wrap;
                height: 300px;
                flex-grow: 1;

                .club-image {
                    width: 100%;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .club-title {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    width: 100%;
                    height: 30px;

                    p {
                        font-size: 20px;
                        font-weight: 700;
                    }

                }

                .club-content {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    width: 85%;
                    height: 140px;
                    margin-top: 20px;

                    p {
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
            }

            .club-box:hover {
                .club-title {
                    p {
                        color: #409EFF;
                    }
                }
            }

            .club-background {
                .club-title {
                    p {
                        color: #333;
                    }
                }

                .club-content {
                    p {
                        color: #888;
                    }
                }
            }

            .club-introduce {
                background-color: #777777;

                p {
                    color: white;
                }
            }
        }

        .learn-form {
            width: 100%;
            height: 450px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            background-color: rgb(245, 245, 245);

            .title {
                margin-top: 40px;
                font-size: 22px;
                font-weight: 500;
                color: #409EFF;
            }

            .content {
                width: 100%;
                height: 300px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;

                .content-item {
                    width: 300px;
                    margin-left: 25px;
                    margin-right: 25px;
                    border-radius: 10px;
                    height: 320px;
                    border: solid 1px rgb(220, 220, 220);

                    .content-item-img {
                        margin-top: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                    }

                    .content-item-title {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 5px;

                        p {
                            font-size: 20px;
                            font-weight: 700;
                            color: #333;
                        }
                    }

                    .content-item-content {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 40px;

                        p {
                            width: 250px;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: 400;
                            color: #888;
                        }
                    }
                }

                .content-item:hover {
                    .content-item-title {
                        p {
                            color: #409EFF;
                        }
                    }
                }

                .content-item:hover {
                    box-shadow: rgba(100, 100, 100, 0.1) 0 1px 1px 1px;
                }
            }

        }
    }
</style>