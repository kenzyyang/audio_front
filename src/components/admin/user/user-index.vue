<template>
    <div class="index">
        <div class="header">
            <el-button>新增用户</el-button>
        </div>
        <div class="table" style="width: 100%;">
            <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    height="500"
                    border
                    stripe>
                <el-table-column
                        prop="userName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="昵称">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="role"
                        label="职位">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">移除</el-button>
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
        getAllUser
    } from '../../../common/api/user';

    export default {
        name: "user-index",
        data() {
            return {
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
                isInit: false
            }
        },
        methods: {
            updateTable() {
                this.tableLoading = true;
                let data = {
                    currentPage: 1,
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
            }
        },
        computed: {
            userLogin() {
                return this.$store.state.user.isLogin;
            },
            userLoaded() {
                return this.$store.state.user.isLoaded;
            }
        },
        watch: {
            userLoaded: {
                handler(val) {
                    if (val && this.userLogin &&  !this.isInit) {
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