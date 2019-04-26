/**
 *  @author: kenzyyang
 *  @date:  2019-4-26
 *  @desc:  存放页面header中的相关全局变量
 * */

export default {
    state: {
        activeTab: 'home',
    },
    mutations: {
        CHANGE_ACTIVE_TAB(state, activeTab) {
            state.activeTab = activeTab;
        },
    },
    action: {}
};