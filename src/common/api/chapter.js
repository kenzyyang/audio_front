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
        currentSize
    } = data;
    const params = {
        id,
        currentPage,
        currentSize
    };
    return axios.post(url, params);
};


export {
    getAllChapterById
};