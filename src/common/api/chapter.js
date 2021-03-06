/**
 * @author:  kenzyyang
 * @date:  2019-5-6
 * @desc:  首页的所有api均从此文件导出
 * */
import axios from "./audio-axios";

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-10
 *  @desc:  获取所有章节信息的分页接口
 * */
const getAllChapterById = (data) => {
    const url = '/chapter/chapterGetAllById';
    const {
        id,
        currentPage,
        currentSize,
        uploaded
    } = data;
    const params = {
        id,
        currentPage,
        currentSize,
        uploaded
    };
    return axios.post(url, params);
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-10
 *  @desc:  新增章节接口
 * */
const chapterAdd = (data) => {
    const url = '/chapter/chapterAdd';
    const {
        title,
        abstract,
        chapter,
        belongedAudio
    } = data;
    const params = {
        title,
        abstract,
        chapter,
        belongedAudio
    };
    return axios.post(url, params);
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-10
 *  @desc:  章节删除接口
 * */
const chapterDelete = (data) => {
    const url = '/chapter/chapterDelete';
    const {id} = data;
    const params = {
        id
    };
    return axios.post(url, params);
};


export {
    getAllChapterById,
    chapterAdd,
    chapterDelete
};