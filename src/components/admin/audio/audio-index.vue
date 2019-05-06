<template>
    <div class="index">
        <div class="header">
            <el-button size="small" type="success" @click="showDialog('new')">新增有声书</el-button>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="dialogVisible"
                    :close-on-click-modal="false"
                    @closed="dialogClosed"
                    width="600px">
                <el-form ref="addAudioForm" size="small" :model="addAudioForm" :rules="addAudioRules"
                         label-width="80px"
                         style="width: 500px;">
                    <el-form-item label="书名" prop="audioName">
                        <el-input v-model.trim="addAudioForm.audioName" :disabled="dialogType!=='new'"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="audioType">
                        <el-select v-model.trim="addAudioForm.audioType">
                            <el-option label="英文" :value="1"></el-option>
                            <el-option label="中文" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="封面">
                        <el-upload
                                action="123"
                                ref="coverUpload"
                                :on-change="coverChange"
                                :on-remove="coverChange"
                                :limit="1"
                                :on-exceed="coverExceed"
                                accept="image/jpg,image/jpeg"
                                :auto-upload="false"
                                :before-upload="coverValidate"
                                list-type="picture">
                            <el-button size="small" type="primary" :disabled="coverList.length>=1">点击上传</el-button>
                            <div slot="tip">只能上传jpg格式图片,且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button
                            size="small"
                            type="primary"
                            :loading="addAudioBtnLoading"
                            v-if="dialogType === 'new'"
                            @click="addAudio">新 增</el-button>
                    <el-button
                            size="small"
                            type="primary"
                            :loading="addAudioBtnLoading"
                            v-else-if="dialogType === 'change'"
                            @click="changeAudio">修 改</el-button>
                </span>
            </el-dialog>
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
        addAudio,
        getAllAudio
    } from '../../../common/api/audio';


    export default {
        name: "user-index",
        data() {
            return {
                // 表格相关
                currentPage: 1,
                total: 0,
                tableData: [
                    // {
                    //     id: 1,
                    //     audioName: '123',
                    //     audioType: '827506072@qq.com'
                    // }
                ],
                tableLoading: false,
                isInit: false,
                // 新增用户dialog
                dialogVisible: false,
                dialogType: 'new',
                dialogTitle: '新 增',
                // 注册表单
                addAudioForm: {
                    id: '',
                    audioName: '',
                    audioType: 1,
                },
                addAudioRules: {
                    audioName: [
                        {
                            required: true,
                            message: '有声书名称不可为空',
                            trigger: 'change'
                        }
                    ],
                    audioType: [
                        {
                            required: true,
                            message: '请选择有声书类型',
                            trigger: 'change'
                        }
                    ]
                },
                coverList: [],
                addAudioBtnLoading: false
            }
        },
        methods: {
            updateTable() {
                this.tableLoading = true;
                let data = {
                    currentPage: this.currentPage,
                    currentSize: 10
                };
                getAllAudio(data).then((response) => {
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
                    console.log('请求有声书信息失败: ', err);
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
                    this.dialogTitle = '编 辑';
                    this.addAudioForm.id = data.id;
                    this.addAudioForm.audioName = data.audioName;
                    this.addAudioForm.audioType = data.audioType;
                } else {
                    this.dialogTitle = '新 增';
                }
                this.dialogVisible = true;
            },
            dialogClosed() {
                // 关闭时初始化内容
                this.$refs.addAudioForm.resetFields();
                this.addAudioForm = {
                    id: '',
                    audioName: '',
                    audioType: 1,
                };
                this.coverList.splice(0);
                this.$refs.coverUpload.clearFiles();
            },
            addAudio() {
                this.$refs.addAudioForm.validate((valid) => {
                    if (valid) {
                        if (this.coverList.length !== 1) {
                            this.$message.warning('请选择封面图片');
                            return;
                        }
                        this.addAudioBtnLoading = true;
                        console.log(this.coverList[0].raw);
                        const data = {
                            id: this.addAudioForm.id,
                            audioName: this.addAudioForm.audioName,
                            audioType: this.addAudioForm.audioType,
                            cover: this.coverList[0].raw
                        };
                        addAudio(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {

                            } else {
                                this.$message.warning('有声书新增失败: ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('有声书新增失败: ', err);
                        }).finally(()=>{
                            this.addAudioBtnLoading = false;
                        });
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            changeAudio() {
                this.$refs.addAudioForm.validate((valid) => {
                    if (valid) {
                        this.addAudioBtnLoading = true;
                        const data = {
                            id: this.addAudioForm.id,
                            audioName: this.addAudioForm.audioName,
                            audioType: this.addAudioForm.audioType
                        };
                        console.log(JSON.stringify(data), null, 4);
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            // 文件上传相关
            coverExceed() {
                this.$message.warning('只能上传一张图片');
            },
            coverChange(file, fileList) {
                this.coverList.splice(0);
                this.coverList.push(...fileList);
            },
            coverValidate() {
                // 检查文件类型和大小
                if (file.type !== 'image/jpg' || file.type !== 'image/jpeg') {
                    this.$message.warning('图片仅支持 jpg/jpeg 格式');
                    fileList.splice(0);
                    return false;
                }
                if (file.size / 1024 / 1024 > 2) {
                    this.$message.warning('图片大小不要超过2M');
                    fileList.splice(0);
                    return false;
                }
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