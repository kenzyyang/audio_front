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
        <div class="tabs">
            <div class="tab-item" :class="{
                'tab-item_active': activeHeaderTab === 'home'
            }"
                 @click="headerTabClick('home')"
                 style="margin-right: 70px;">
                <i class="fa fa-home"></i>
                <p>首页</p>
            </div>
<!--            <div class="tab-item " :class="{-->
<!--                'tab-item_active': activeHeaderTab === 'news'-->
<!--            }"-->
<!--                 @click="headerTabClick('news')"-->
<!--                 style="margin-right: 70px;">-->
<!--                <i class="fa fa-newspaper-o"></i>-->
<!--                <p>新闻</p>-->
<!--            </div>-->
            <div class="tab-item" :class="{
                'tab-item_active': activeHeaderTab === 'audio'
            }"
                 @click="headerTabClick('audio')">
                <i class="fa fa-volume-up"></i>
                <p>有声书</p>
            </div>
        </div>
        <div class="login">
            <div class="login-btn" v-if="!isLogin" @click="showDialog">登录/注册</div>
            <div v-else>
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="hover">
                    <div class="logged-item" @click="toAdmin" v-if="userRole !== 2">
                        <i class="fa fa-user-circle"></i>
                        <p>成员管理</p>
                    </div>
                    <div class="logged-item" @click="toUserCenter">
                        <i class="fa fa-user-circle"></i>
                        <p>个人中心</p>
                    </div>
                    <div class="logged-item" @click="logout">
                        <i class="fa fa-sign-out"></i>
                        <p>注销</p>
                    </div>
                    <p style="cursor: pointer;" slot="reference">{{userName}}</p>
                </el-popover>
            </div>
        </div>
        <el-dialog
                title="登录/注册"
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
                    <el-form ref="registerForm" size="small" :model="registerForm" :rules="registerRules"
                             label-width="80px"
                             style="width: 500px;">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model.trim="registerForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model.trim="registerForm.nickName"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="registerForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="registerForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button
                        v-if="activeTab === 'login'"
                        :loading="loginBtnLoading"
                        size="small"
                        type="primary"
                        @click="login">登 录</el-button>
                <el-button
                        v-else
                        size="small"
                        type="primary"
                        :loading="registerBtnLoading"
                        @click="register">注 册</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {login, register} from "../../common/api/user";

    export default {
        name: "home-header",
        data() {
            return {
                dialogVisible: false,
                activeTab: 'login',
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
                loginBtnLoading: false,
                // 注册表单
                registerForm: {
                    userName: '',
                    nickName: '',
                    password: '',
                    email: ''
                },
                registerRules: {
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
                    ],
                    nickName: [
                        {
                            required: true,
                            message: '昵称不可为空',
                            trigger: 'change'
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: '邮箱不可为空',
                            trigger: 'change'
                        },
                        {
                            type: 'email',
                            message: '请输入正确的邮箱',
                            trigger: 'change'
                        }
                    ]
                },
                registerBtnLoading: false,
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
                this.$refs.registerForm.resetFields();
                this.loginForm = {
                    userName: '',
                    password: ''
                };
                this.register = {
                    userName: '',
                    password: '',
                    nickName: '',
                    email: ''
                };
            },
            login() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loginBtnLoading = true;
                        const data = {
                            userName: this.loginForm.userName,
                            password: this.loginForm.password
                        };
                        login(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                // 登录成功
                                const data = {
                                    userName: response.data.data.user.userName,
                                    role: response.data.data.user.role,
                                    token: response.data.data.token
                                };
                                this.$message.success('登录成功');
                                this.$store.commit('USER_LOGIN', data);
                                localStorage.setItem('userInfo', JSON.stringify(data));
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('登录失败： ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('请求出错' + err);
                        }).finally(() => {
                            this.loginBtnLoading = false;
                        });
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            logout() {
                this.$confirm('是否确定注销?', '注销', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.clear();
                    this.$store.commit('USER_LOGOUT');
                    this.$message.success('注销成功');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            register() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.registerBtnLoading = true;
                        const data = {
                            userName: this.registerForm.userName,
                            password: this.registerForm.password,
                            nickName: this.registerForm.nickName,
                            email: this.registerForm.email
                        };
                        register(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                // 注册成功
                                const data = {
                                    userName: response.data.data.user.userName,
                                    role: response.data.data.user.role,
                                    token: response.data.data.token
                                };
                                this.$message.success('注册成功');
                                this.$store.commit('USER_LOGIN', data);
                                localStorage.setItem('userInfo', JSON.stringify(data));
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('注册失败： ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('请求出错' + err);
                        }).finally(() => {
                            this.registerBtnLoading = false;
                        });
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            toUserCenter() {

            },
            toAdmin() {
                this.$router.push({
                    path: '/admin'
                });
            },
            headerTabClick(tabName){
                if(tabName === 'home'){
                    this.$store.commit('CHANGE_ACTIVE_TAB','home');
                    this.$router.push({
                        path: '/home'
                    });
                }
                else if(tabName === 'news'){
                    this.$store.commit('CHANGE_ACTIVE_TAB','news');
                    this.$router.push({
                        path: '/news'
                    });
                }
                else if(tabName === 'audio'){
                    this.$store.commit('CHANGE_ACTIVE_TAB','audio');
                    this.$router.push({
                        path: '/audio'
                    });
                }
            }
        },
        computed: {
            isLogin: {
                get() {
                    return this.$store.state.user.isLogin;
                }
            },
            userName: {
                get() {
                    return this.$store.state.user.userName;
                }
            },
            userRole: {
                get() {
                    return this.$store.state.user.role;
                }
            },
            activeHeaderTab: {
                get(){
                    return this.$store.state.header.activeTab;
                }
            }
        },
        mounted() {
            // 从localstorage 里面获取用户登录信息
            let data = JSON.parse(localStorage.getItem('userInfo'));
            // :todo 判断时间
            if (data !== null && data.token && data.userName) {
                this.$store.commit('USER_LOGIN', data);
            }
            // 表明登录状态已经完成，可以开始判断权限
            this.$store.commit('USER_LOAD');
            // 判断当前header 激活态
            if(/\/#\/home/.test(location.href)){
                this.headerTabClick('home');
            }
            else if(/\/#\/news/.test(location.href)){
                this.headerTabClick('news');
            }
            else if(/\/#\/audio/.test(location.href)){
                this.headerTabClick('audio');
            }
        }
    }
</script>

<style lang="scss" scoped>
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

        .tabs {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 100px;
            flex-grow: 1;
            .tab-item {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                flex-wrap:  wrap;
                padding-top: 5px;
                cursor: pointer;
                i{
                    width: 100%;
                    text-align: center;
                    font-size: 20px;
                    color: #ccc;
                }
                p{
                    font-size: 12px;
                    color: #888;
                    font-weight: 400;
                    margin-top: 3px;
                }
            }
            .tab-item:hover{
                i{
                    color: #409EFF;
                }
            }
            .tab-item_active{
                i{
                    color: #409EFF;
                }
            }
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

    .logged-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        padding-left: 15px;
        cursor: pointer;

        i {
            font-size: 16px;
        }

        p {
            display: inline-block;
            margin-left: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #333;
        }
    }

    .logged-item:hover {
        i {
            color: #409EFF;
        }

        p {
            color: #409EFF;
        }

        background-color: rgb(233, 233, 235);
    }
</style>