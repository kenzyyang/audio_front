<!--
    @author:  kenzyyang
    @date:  2019-4-16
    @desc:  首页头部，主要功能为 logo展示，跳回主页，登录注册，个人中心等。
-->

<template>
    <div class="header">
        <div class="logo" @click="returnToHome">
            有声小说社团
        </div>
        <div class="login">
            <div class="login-btn" v-if="!isLogin" @click="showDialog">登录/注册</div>
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
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                @closed="dialogClosed"
                width="600px">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane label="登录" name="login">
                    <el-form ref="loginForm" size="small" :model="loginForm" :rules="loginRules" label-width="80px"
                             style="width: 500px;">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model.trim="loginForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    注册
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button
                        v-if="activeTab === 'login'"
                        size="small"
                        type="primary"
                        @click="login">登 录</el-button>
                <el-button
                        v-else
                        size="small"
                        type="primary"
                        @click="register">注 册</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {login} from "../../common/api/home";

    export default {
        name: "home-header",
        data() {
            return {
                dialogVisible: false,
                activeTab: 'login',
                isLogin: false,
                // 登录表单
                loginForm: {
                    userName: '',
                    password: ''
                },
                loginRules: {
                    userName: [
                        {
                            required: true,
                            message: '用户名不可为空',
                            trigger: 'change'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不可为空',
                            trigger: 'change'
                        }
                    ]
                },
                registerForm: {
                    userName: '',
                    nickName: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            returnToHome() {
                this.$router.push({
                    path: '/'
                })
            },
            showDialog() {
                this.dialogVisible = true;
            },
            dialogClosed() {
                // 关闭时初始化内容
                this.$refs.loginForm.resetFields();
                this.loginForm = {
                    userName: '',
                    password: ''
                };
            },
            login() {

                const data = {
                    userName: this.loginForm.userName,
                    password: this.loginForm.password
                };
                login(data).then((response) => {
                    debugger
                    if (response.status === 200 && response.data.code === 0) {

                    } else {
                        this.$message.warning('登录失败： '+ response.data.message);
                    }
                }).catch((err) => {
                    console.log('请求出错' + err);
                });
            },
            register() {

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

            .login-btn {
                cursor: pointer;
            }

            .login-btn:hover {
                color: #409EFF;
            }
        }
    }
</style>