<template>
    <div class="index">
        <div class="header">
            <el-button size="small" type="success" style="margin-left: 5px;" @click="showDialog('new')">新增章节</el-button>
            <p>当前有声书: </p>
            <el-select v-model="selectedAudio" filterable size="small" style="margin-left: 10px;" @change="updateTable">
                <el-option
                        v-for="audio in audios"
                        :label="audio.audioName"
                        :value="audio.id"
                        :key="audio.id"></el-option>
            </el-select>
        </div>
        <div class="table" style="width: 100%;">
            <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    border
                    stripe>
                <el-table-column
                        prop="chapter"
                        label="章节序号">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                </el-table-column>
                <el-table-column
                        label="音频">
                    <template slot-scope="scope">
                        {{/^default/.test(scope.row.audioPath)?'未上传':'已上传'}}
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
                        <el-button type="text" size="small" @click="showUploadDialog(scope.row)">上传录音</el-button>
                        <el-button type="text" size="small" @click="showDialog('change',scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="chapterDelete(scope.row)">删除
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
        <div class="dialog">
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="dialogVisible"
                    :close-on-click-modal="false"
                    @closed="dialogClosed"
                    @opened="dialogOpened"
                    width="600px">
                <el-form ref="addChapterForm" size="small" :model="addChapterForm" :rules="addChapterRules"
                         label-width="80px"
                         style="width: 500px;">
                    <el-form-item label="序号" prop="chapter">
                        <el-input v-model.trim.number="addChapterForm.chapter" placeholder="根据序号大小排序"></el-input>
                    </el-form-item>
                    <el-form-item label="章节标题" prop="title">
                        <el-input v-model.trim="addChapterForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="摘要" prop="abstract">
                        <el-input v-model.trim="addChapterForm.abstract" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button
                            size="small"
                            type="primary"
                            :loading="addChapterBtnLoading"
                            v-if="dialogType === 'new'"
                            @click="addChapter">新 增</el-button>
                    <el-button
                            size="small"
                            type="primary"
                            :loading="addChapterBtnLoading"
                            v-else-if="dialogType === 'change'"
                            @click="changeChapter">修 改</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    title="上传录音"
                    :visible.sync="uploadDialogVisible"
                    :close-on-click-modal="false"
                    @closed="uploadDialogClosed"
                    @opened="uploadDialogOpened"
                    width="600px">
                <!-- :todo 后续更改上传链接 -->
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        name="audio"
                        action="http://localhost:3000/chapter/chapterAddUpload"
                        :headers="{
                            'Authorization': $store.state.user.token,
                        }"
                        :data="{
                            id: selectedChapter
                        }"
                        :on-success="uploadSuccess"
                        :limit="1"
                        :on-exceed="audioExceed"
                        :on-change="audioUploadChange"
                        accept="audio/mp3"
                        :before-upload="audioUploadValidate"
                        list-type="picture"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="uploadDialogVisible = false">关 闭</el-button>
                     <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadAudio">上 传
                    </el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getAllAudio,
        deleteAudio
    } from '../../../common/api/audio';
    import {
        getAllChapterById,
        chapterAdd,
        chapterDelete
    } from '../../../common/api/chapter';


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
                addChapterForm: {
                    id: '',
                    chapter: '',
                    title: '',
                    abstract: ''
                },
                addChapterRules: {
                    chapter: [
                        {
                            required: true,
                            message: '序号不可为空',
                            trigger: 'change'
                        },
                        {
                            type: 'number',
                            message: '序号必须为数字值'
                        }
                    ],
                    title: [
                        {
                            required: true,
                            message: '标题不可为空',
                            trigger: 'change'
                        }
                    ],
                    abstract: [
                        {
                            required: true,
                            message: '摘要不可为空',
                            trigger: 'change'
                        }
                    ]
                },
                addChapterBtnLoading: false,
                // audio选择下拉框
                selectedAudio: -1,
                audios: [],
                // 录音上传dialog
                uploadDialogVisible: false,
                selectedChapter: -1,
                audioFileList: []
            }
        },
        methods: {
            updateTable() {
                this.tableLoading = true;
                let data = {
                        id: this.selectedAudio,
                        currentPage: this.currentPage,
                        currentSize: 10,
                        uploaded: "all"
                    };
                getAllChapterById(data).then((response) => {
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
                    console.log('请求有声书章节信息失败: ', err);
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
                    this.addChapterForm.id = data.id;
                    this.addChapterForm.title = data.title;
                    this.addChapterForm.abstract = data.abstract;
                    this.addChapterForm.chapter = data.chapter;
                } else {
                    this.dialogTitle = '新 增';
                }
                this.dialogVisible = true;
            },
            dialogOpened() {
                if (this.dialogType !== 'new') {
                    this.$refs.addChapterForm.validate();
                }
            },
            dialogClosed() {
                // 关闭时初始化内容
                this.$refs.addChapterForm.resetFields();
                this.addChapterForm = {
                    id: '',
                    title: '',
                    abstract: '',
                    chapter: ''
                };
            },
            addChapter() {
                this.$refs.addChapterForm.validate((valid) => {
                    if (valid) {
                        this.addChapterBtnLoading = true;
                        const data = {
                            title: this.addChapterForm.title,
                            abstract: this.addChapterForm.abstract,
                            chapter: this.addChapterForm.chapter,
                            belongedAudio: this.selectedAudio
                        };
                        chapterAdd(data).then((response) => {
                            if (response.status === 200 && response.data.code === 0) {
                                this.dialogVisible = false;
                                this.$message.success('新增章节成功');
                                this.updateTable();
                            } else {
                                this.$message.warning('有声书章节失败: ' + response.data.message);
                            }
                        }).catch((err) => {
                            console.log('有声书新增失败: ', err);
                        }).finally(() => {
                            this.addChapterBtnLoading = false;
                        });
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            changeChapter() {
                this.$refs.addChapterForm.validate((valid) => {
                    if (valid) {
                        this.addChapterBtnLoading = true;
                        const data = {
                            id: this.addAudioForm.id,
                            audioName: this.addAudioForm.audioName,
                            audioType: this.addAudioForm.audioType
                        };
                    } else {
                        this.$message.error('校验不通过');
                    }
                });
            },
            // 文件上传相关
            showUploadDialog(row) {
                this.uploadDialogVisible = true;
                this.selectedChapter = row.id;
            },
            uploadAudio() {
                if (this.audioFileList.length === 0) {
                    this.$message.warning('请选择一份录音上传');
                } else {
                    this.$refs.upload.submit();
                }
            },
            uploadSuccess() {
                this.$message.success('上传录音成功');
                this.updateTable();
                this.uploadDialogVisible = false;
            },
            uploadError() {
                this.$message.warning('上传录音失败');
                this.updateTable();
            },
            uploadDialogOpened() {

            },
            uploadDialogClosed() {
                this.$refs.upload.clearFiles();
            },
            audioExceed() {
                this.$message.warning('只能上传一份录音');
            },
            audioUploadChange(file, fileList) {
                this.audioFileList.splice(0);
                this.audioFileList.push(...fileList);
            },
            audioUploadValidate(file, fileList) {
                // 检查文件类型和大小
                if (file.type !== 'audio/mp3' && file.type !== 'audio/mpeg') {
                    this.$message.warning('录音只支持 mp3 格式');
                    return false;
                }
                if (file.size / 1024 / 1024 > 500) {
                    this.$message.warning('录音大小不要超过500M');
                    return false;
                }
            },
            chapterDelete(row) {
                this.$confirm(`是否删除章节 ${row.title}?`, '删除', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableLoading = true;
                    const data = {
                        id: row.id,
                    };
                    chapterDelete(data).then((response) => {
                        if (response.status === 200 && response.data.code === 0) {
                            this.$message.success('删除成功');
                            this.updateTable();
                        } else {
                            this.$message.warning('删除章节失败: ' + response.data.message);
                            this.tableLoading = false;
                        }
                    }).catch((err) => {
                        console.log('删除章节失败: ' + response.data.message);
                        this.tableLoading = false;
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 初始化audio选择下拉框
            initAudioSelect() {
                const data = {
                    currentPage: 1,
                    currentSize: 1000000
                };
                getAllAudio(data).then((response) => {
                    if (response.status === 200 && response.data.code === 0) {
                        this.audios.push(...response.data.data.list);
                        this.selectedAudio = this.audios[0].id;
                        this.updateTable();
                    } else {
                        this.$message.warning('获取audio信息失败: ' + response.data.message);
                    }
                }).catch((err) => {
                    console.log('获取audio信息失败: ' + err);
                });
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
                        this.initAudioSelect();
                    }
                }
            }
        },
        mounted() {
            if (this.userLoaded && this.userLogin) {
                this.isInit = true;
                this.initAudioSelect();
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
            display: flex;
            justify-content: flex-start;
            align-items: center;

            p {
                display: inline-block;
                margin-left: 10px;
                color: #555;
                font-size: 14px;
                font-weight: 400;
            }
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