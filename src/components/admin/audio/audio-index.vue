<template>
    <div class="index">
        <div class="header">
            <el-button size="small" type="success" @click="showDialog('new')">新增用户</el-button>
<!--            <el-dialog-->
<!--                    :title="dialogTitle"-->
<!--                    :visible.sync="dialogVisible"-->
<!--                    :close-on-click-modal="false"-->
<!--                    @closed="dialogClosed"-->
<!--                    width="600px">-->
<!--                <el-form ref="addAudioForm" size="small" :model="registerForm" :rules="registerRules"-->
<!--                         label-width="80px"-->
<!--                         style="width: 500px;">-->
<!--                    <el-form-item label="用户名" prop="userName">-->
<!--                        <el-input v-model.trim="registerForm.userName" :disabled="dialogType!=='new'"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="昵称" prop="nickName">-->
<!--                        <el-input v-model.trim="registerForm.nickName" :disabled="dialogType==='password'"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="邮箱" prop="email">-->
<!--                        <el-input v-model="registerForm.email" :disabled="dialogType==='password'"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="密码" prop="password" v-if="dialogType!=='change'">-->
<!--                        <el-input v-model="registerForm.password" type="password"></el-input>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--                <span slot="footer" class="dialog-footer">-->
<!--                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>-->
<!--                    <el-button-->
<!--                            size="small"-->
<!--                            type="primary"-->
<!--                            :loading="registerBtnLoading"-->
<!--                            v-if="dialogType === 'new'"-->
<!--                            @click="register">注 册</el-button>-->
<!--                    <el-button-->
<!--                            size="small"-->
<!--                            type="primary"-->
<!--                            :loading="registerBtnLoading"-->
<!--                            v-else-if="dialogType === 'change'"-->
<!--                            @click="changeUserInfo">修 改</el-button>-->
<!--                    <el-button-->
<!--                            size="small"-->
<!--                            type="primary"-->
<!--                            :loading="registerBtnLoading"-->
<!--                            v-else-if="dialogType === 'password'"-->
<!--                            @click="changePassword">修 改</el-button>-->
<!--                </span>-->
<!--            </el-dialog>-->
        </div>
        <div class="table" style="width: 100%;">
            <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    border
                    stripe>
                <el-table-column
                        prop="id"
                        label="编号">
                </el-table-column>
                <el-table-column
                        prop="audioName"
                        label="书名">
                </el-table-column>
                <el-table-column
                        prop="audioType"
                        label="类别">
                </el-table-column>
                <el-table-column
                        prop="createUser"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDialog('change',scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="userDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    import {
        getAllUser,
        register,
        changeUserInfo,
        changeUserPassword,
        userDelete, userSertAdmin
    } from '../../../common/api/user';

    export default {
        name: "user-index",
        data() {
            return {
                // 表格相关
                currentPage: 1,
                total: 100,
                tableData: [
                    // {
                    //     userName: 'kenzyyang',
                    //     nickName: '123',
                    //     email: '827506072@qq.com',
                    //     role: 2
                    // }
                ],
                tableLoading: false,
                isInit: false,
                // 新增用户dialog
                dialogVisible: false,
                dialogType: 'new',
                dialogTitle: '新增用户',
                // 注册表单
                registerForm: {
                    id: '',
                    role: '',
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
                registerBtnLoading: false
            }
        },
        methods: {
            updateTable() {
                this.tableLoading = true;
                let data = {
                    currentPage: this.currentPage,
                    currentSize: 10
                };
                getAllUser(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        const result = response.data.data;
                        let tableData = [];
                        this.total = result.count;
                        for (let i in result.list) {
                            tableData.push(result.list[i]);
                        }
                        this.tableData.splice(0);
                        this.tableData.push(...tableData);
                    }
                }).catch((err) => {
                    console.log('请求用户信息失败: ', err);
                }).finally(() => {
                    this.tableLoading = false;
                });
            },
            currentChange(val) {
                this.currentPage = val;
                this.updateTable();
            },
            // dialog 相关
            showDialog(type, data) {
                this.dialogType = type;
                if (type !== 'new') {
                    this.registerForm.id = data.id;
                    this.registerForm.role = data.role;
                    this.registerForm.userName = data.userName;
                    this.registerForm.email = data.email;
                    this.registerForm.nickName = data.nickName;
                    this.registerForm.password = '';
                    if (this.dialogTitle === 'password') {
                        this.dialogTitle = '修改密码';
                    } else {
                        this.dialogTitle = '修改用户信息';
                    }
                } else {
                    this.dialogTitle = '新增用户';
                }
                this.dialogVisible = true;
            },
            dialogClosed() {
                // 关闭时初始化内容
                this.$refs.registerForm.resetFields();
                this.registerForm = {
                    userName: '',
                    password: '',
                    nickName: '',
                    email: ''
                };
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
                                this.$message.success('新增用户成功');
                                this.updateTable();
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('新增用户失败： ' + response.data.message);
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
            changeUserInfo() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.registerBtnLoading = true;
                        const data = {
                            id: this.registerForm.id,
                            nickName: this.registerForm.nickName,
                            email: this.registerForm.email
                        };
                        changeUserInfo(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                this.$message.success('修改信息成功');
                                this.updateTable();
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('修改信息失败： ' + response.data.message);
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
            changePassword() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.registerBtnLoading = true;
                        const data = {
                            id: this.registerForm.id,
                            role: this.registerForm.role,
                            password: this.registerForm.password
                        };
                        changeUserPassword(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                this.$message.success('修改密码成功');
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('修改信息失败： ' + response.data.message);
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
            userDelete(row) {
                this.$confirm(`是否删除用户 ${row.nickName}?`, '删除', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableLoading = true;
                    const data = {
                        id: row.id,
                        role: row.role
                    };
                    userDelete(data).then((response) => {
                        if (response.status === 200 && response.data.code === 0) {
                            this.$message.success('删除成功');
                            this.updateTable();
                        } else {
                            this.$message.warning('删除用户失败: ' + response.data.message);
                            this.tableLoading = false;
                        }
                    }).catch((err) => {
                        console.log('删除用户失败: ' + response.data.message);
                        this.tableLoading = false;
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            userSetAdmin(bool, row) {
                this.tableLoading = true;
                const data = {
                    id: row.id,
                    role: bool ? 1 : 2
                };
                userSertAdmin(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        this.$message.success('操作成功');
                        this.updateTable();
                    } else {
                        this.$message.warning('操作失败: ' + response.data.message);
                        this.tableLoading = false;
                    }
                }).catch((err) => {
                    console.log('操作失败: ' + err);
                    this.tableLoading = false;
                });
            },
            // role转换为中文
            roleToName(role) {
                if (role === 2) {
                    return '普通用户';
                } else if (role === 1) {
                    return '管理员';
                } else if (role === 0) {
                    return '超级管理员';
                }
            }
        },
        computed: {
            userLogin() {
                return this.$store.state.user.isLogin;
            },
            userLoaded() {
                return this.$store.state.user.isLoaded;
            },
            userRole() {
                return this.$store.state.user.role;
            }
        },
        watch: {
            userLoaded: {
                handler(val) {
                    if (val && this.userLogin && !this.isInit) {
                        this.updateTable();
                    }
                }
            }
        },
        mounted() {
            if (this.userLoaded && this.userLogin) {
                this.isInit = true;
                this.updateTable();
            }
        }
    }
</script>

<style scoped lang="scss">
    .index {
        width: 100%;
        min-width: 1200px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;

        .header {
            width: 100%;
        }

        .table {
            margin-top: 10px;
        }

        .pagination {
            margin-top: 10px;
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>