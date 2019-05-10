<!--
    @author:  kenzyyang
    @date:  2019-4-21
    @desc:  管理界面，管理用户，编写动态，等等
-->
<template>
    <div class="admin">
        <div class="slide">
            <el-menu default-active="user" class="slide-menu">
                <el-menu-item index="user" @click="menuClicked('user')">
                    <i class="fa fa-user-o fa-fw"></i>
                    <span slot="title">成员管理</span>
                </el-menu-item>
                <el-menu-item index="news" @click="menuClicked('news')">
                    <i class="fa fa-newspaper-o fa-fw"></i>
                    <span slot="title">新闻管理</span>
                </el-menu-item>
                <el-menu-item index="audio" @click="menuClicked('audio')">
                    <i class="fa fa-bullhorn fa-fw"></i>
                    <span slot="title">有声书管理</span>
                </el-menu-item>
                <el-menu-item index="chapter" @click="menuClicked('chapter')">
                    <i class="fa fa-bullhorn fa-fw"></i>
                    <span slot="title">章节管理</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "admin",
        methods: {
            menuClicked(val) {
                this.$router.push({
                    path: '/admin/' + val
                });
            }
        },
        computed: {
            userRole() {
                return this.$store.state.user.role;
            },
            userLoaded() {
                return this.$store.state.user.isLoaded;
            }
        },
        watch: {
            userLoaded: {
                handler(val){
                    if(val){
                        if (this.userLoaded && this.userRole === 2) {
                            this.$message.warning('您无权限查看此页面');
                            this.$router.push({
                                path: '/home'
                            });
                        }
                    }
                }
            }
        },
        created() {
            if (this.userLoaded && this.userRole === 2) {
                this.$message.warning('您无权限查看此页面');
                this.$router.push({
                    path: '/home'
                });
            }

        }
    }
</script>

<style scoped lang="scss">
    .admin {
        width: 100%;
        min-width: 1200px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;

        .slide {
            margin-top: 2px;
            border-right: solid 1px #e6e6e6;
            width: 198px;
            height: 800px;

            .slide-menu {
                i {
                    margin-left: 10px;
                    font-size: 16px;
                }

                span {
                    margin-left: 10px;
                }
            }
        }

        .main {
            width: 100%;
            padding: 20px;
        }

        /* 取消el menu 的右边界样式 */
        .el-menu {
            border-right: 0;
        }

        .el-menu-item {
            width: 200px;
        }
    }
</style>