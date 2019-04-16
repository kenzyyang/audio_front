<template>
    <div class="header">
        <div class="logo" @click="returnToHome">
            有声小说社团
        </div>
        <div class="login">
            <div v-if="!isLogin" @click="isLogin=true">登录/注册</div>
            <div v-else>
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="hover">
                    <div class="loged-item">
                        <i class="el-icon-setting"></i>
                        <p>个人中心</p>
                    </div>
                    <div class="loged-item">
                        <i class="el-icon-delete"></i>
                        <p>注销</p>
                    </div>
                    <p slot="reference">kenzyyang</p>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-header",
        data() {
            return {
                isLogin: false
            }
        },
        methods: {
            returnToHome(){
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        width: 100%;
        min-width: 1200px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
        /* logo */
        .logo {
            font-size: 20px;
            font-weight: 700;
            color: #409EFF;
            margin-left: 120px;
            cursor: pointer;
        }

        .login {
            margin-right: 120px;
        }
    }
</style>