<template>
    <div class="index">
        <div class="header">
            <el-button size="small" type="success" @click="showDialog('new')">新增有声书</el-button>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="dialogVisible"
                    :close-on-click-modal="false"
                    @opened="dialogOpened"
                    @closed="dialogClosed"
                    width="600px">
                <el-form ref="addAudioForm" size="small" :model="addAudioForm" :rules="addAudioRules"
                         label-width="80px"
                         style="width: 500px;">
                    <el-form-item label="书名" prop="audioName">
                        <el-input v-model.trim="addAudioForm.audioName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="audioType">
                        <el-select v-model.trim="addAudioForm.audioType">
                            <el-option label="英文" :value="1"></el-option>
                            <el-option label="中文" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="简介" prop="audioAbstract">
                        <el-input v-model.trim="addAudioForm.audioAbstract"></el-input>
                    </el-form-item>
                    <el-form-item label="封面" v-if="dialogType === 'new'">
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
                        label="类别">
                    <template slot-scope="scope">
                        <p>{{typeDisplay(scope.row.audioType)}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createUser"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        prop="createdTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toChapterDetail(scope.row)">章节信息</el-button>
                        <el-button type="text" size="small" @click="showDialog('change',scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="audioDelete(scope.row)">删除
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
        getAllAudio,
        deleteAudio,
        audioChange
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
                    audioAbstract: ''
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
                    ],
                    audioAbstract: [
                        {
                            required: true,
                            message: '简介不可为空',
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
                    this.addAudioForm.audioAbstract = data.audioAbstract;
                } else {
                    this.dialogTitle = '新 增';
                }
                this.dialogVisible = true;
            },
            dialogOpened() {
                if (this.dialogType !== 'new') {
                    this.$refs.addAudioForm.validate();
                }
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
                if (this.dialogType === 'new') {
                    this.$refs.coverUpload.clearFiles();
                }
            },
            addAudio() {
                this.$refs.addAudioForm.validate((valid) => {
                    if (valid) {
                        if (this.coverList.length !== 1) {
                            this.$message.warning('请选择封面图片');
                            return;
                        }
                        this.addAudioBtnLoading = true;
                        const data = {
                            id: this.addAudioForm.id,
                            audioName: this.addAudioForm.audioName,
                            audioType: this.addAudioForm.audioType,
                            cover: this.coverList[0].raw,
                            audioAbstract: this.addAudioForm.audioAbstract
                        };
                        addAudio(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                this.dialogVisible = false;
                                this.$message.success('新增有声书成功');
                                this.updateTable();
                            } else {
                                this.$message.warning('有声书新增失败: ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('有声书新增失败: ', err);
                        }).finally(() => {
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
                            audioType: this.addAudioForm.audioType,
                            audioAbstract: this.addAudioForm.audioAbstract
                        };
                        audioChange(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                this.$message.success('修改有声书信息成功');
                                this.updateTable();
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('修改有声书信息失败： ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('修改有声书信息失败: ' + err);
                        }).finally(() => {
                            this.addAudioBtnLoading = false;
                        });
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
            coverValidate(file, fileList) {
                // 检查文件类型和大小
                if (file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
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
            audioDelete(row) {
                this.$confirm(`是否删除有声书 ${row.audioName}?`, '删除', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableLoading = true;
                    const data = {
                        id: row.id,
                        role: row.role
                    };
                    deleteAudio(data).then((response) => {
                        if (response.status === 200 && response.data.code === 0) {
                            this.$message.success('删除成功');
                            this.updateTable();
                        } else {
                            this.$message.warning('删除有声书失败: ' + response.data.message);
                            this.tableLoading = false;
                        }
                    }).catch((err) => {
                        console.log('删除有声书失败: ' + response.data.message);
                        this.tableLoading = false;
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 跳转到章节管理
            toChapterDetail() {

            },
            // 类型转换为中文
            typeDisplay(type) {
                type = type - 0;
                if (type === 1) {
                    return '英文书';
                } else if (type === 1) {
                    return '中文书';
                } else {
                    return '未知类型';
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
        min-width: 1000px;
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