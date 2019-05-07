/**
 * @author:  kenzyyang
 * @date:  2019-5-6
 * @desc:  首页的所有api均从此文件导出
 * */
import axios from "./audio-axios";

/**
 * @method:  POST
 * @desc:  新增有声书接口，有文件上传
 * @param:  audioName string  有声书名称
 * @param:  audioType string  有声书类别  1  英文   2  中文
 * */
const addAudio = (data) => {
    const url = '/audio/audioAdd';
    const {audioName, audioType, cover} = data;
    let params = new FormData();
    params.append('cover', cover);
    params.append('audioName', audioName);
    params.append('audioType', audioType);
    return axios.post(url, params, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
};

/**
 *  @method:  POST
 *  @desc:  获取所有有声书接口
 * */
const getAllAudio = (data) => {
    const url = '/audio/audioGetAll';
    const {currentPage} = data;
    const params = {
        currentPage: currentPage,
        currentSize: 10
    };
    return axios.post(url, params);
};

/**
 *  @method:  POST
 *  @desc:  删除有声书接口，仅超级管理员可使用
 *  @param:  id  number  有声书id
 * */
const deleteAudio = (data) => {
    const url = '/audio/audioDelete';
    const {id } =  data;
    const params = {
        id
    };
    return axios.post(url, params);
};


export {
    addAudio,
    getAllAudio,
    deleteAudio
};