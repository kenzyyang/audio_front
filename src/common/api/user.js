/**
 * @author:  kenzyyang
 * @date:  2019-4-16
 * @desc:  首页的所有api均从此文件导出
 * */
import axios from "./audio-axios";
// 密码加密手段，数据库不存明文，使用sha1 进行不可逆的密码加密
import Sha1 from 'sha1';
// 引入store中的token
import store from '../../vuex/store';

/**
 * @method:  POST
 * @desc:  用户登录接口
 * @param:  userName string  用户名
 * @param:  password string  密码
 * */
const login = (data) => {
    const url = '/user/userLogin';
    const {userName, password} = data;
    const params = {
        userName,
        password: Sha1(password)
    };
    return axios.post(url, params);
};

/**
 * @method:  POST
 * @desc:  用户注册接口
 * @param:  userName string  用户名
 * @param:  password string  密码
 * @param:  nickName string  用户昵称
 * @param:  email string 用户邮箱
 * */
const register = (data) => {
    const url = '/user/userRegister';
    const {userName, password, email, nickName} = data;
    const params = {
        userName,
        email,
        nickName,
        password: Sha1(password)
    };
    return axios.post(url, params);
};

/**
 * @method:  POST
 * @author:  kenzyyang
 * @desc:  用户列表分页接口
 * @param:  currentPage string  当前页
 * @param:  currentSize string  当前页尺寸
 * */
const getAllUser = (data) => {
    const url = '/user/getAllUser';
    const {currentPage, currentSize} = data;
    const params = {
        currentPage,
        currentSize
    };
    return axios.post(url, params);
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-22
 *   @desc:  用户信息修改接口
 *   @method:  POST
 *   @param:  email  string  新邮箱
 *   @param:  nickName  string  用户昵称
 * */
const changeUserInfo = (data) => {
    const url = '/user/userChangeInfo';
    const {
        id,
        email,
        nickName
    } = data;
    const params = {
        id,
        email,
        nickName
    };
    return axios.post(url, params);
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-22
 *   @desc:  修改密码接口
 *   @method:  POST
 *   @param:  password  string  用户密码
 * */
const changeUserPassword = (data) => {
    const url = '/user/userChangePassword';
    const {password, id, role} = data;
    const params = {
        id,
        role,
        password: Sha1(password)
    };
    return axios.post(url, params);
};

/**
 *  @author:  kenzyyang
 *  @date: 2019-4-24
 *  @desc:  用户删除接口
 *  @method: POST
 *  @param: id number  用户id
 *  @param: role  number  用户权限id
 * */
const userDelete = (data) => {
    const url = '/user/userDelete';
    const {id,role} = data;
    const params = {
      id,
      role
    };
    return axios.post(url,params);
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-4-24
 *  @desc:  设置为管理员，以及取消管理员接口
 *  @method: POST
 *  @param: id  number  用户id
 *  @param: role  number  设置的编号
 * */
const userSertAdmin = (data) => {
    const url = '/user/userSetAdmin';
    const {id,role} = data;
    const params = {
        id,
        role
    };
    return axios.post(url,params);
};


export {
    login,
    register,
    getAllUser,
    changeUserInfo,
    changeUserPassword,
    userDelete,
    userSertAdmin
};