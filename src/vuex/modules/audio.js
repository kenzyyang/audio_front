/**
 *  @author: kenzyyang
 *  @date:  2019-5-13
 *  @desc:  全局控制audio播放
 * */
const sourceHost = window.HOST;

export default {
    state: {
        // audio 元数据
        audio: null,
        src: '',
        list: [
            {
                audioCover: '',
                audioPath: '',
                title: ''
            }
        ],
        // audio播放相关
        audioStatus: false,
        index: 0,
        // 当前播放的audioId
        audioId: -1,
        title: '未播放'

    },
    mutations: {
        INIT_AUDIO(state, audio) {
            state.audio = audio;
        },
        // 元数据相关
        AUDIO_SET_LIST(state, list) {
            state.list.splice(0);
            state.list.push(...list);
            state.src = '';
            state.index = 0;
        },
        AUDIO_SET_AUDIO_ID(state, id) {
            state.audioId = id;
        },
        // 播放相关
        AUDIO_PLAY(state) {
            if (state.src === '') {
                state.src = sourceHost + state.list[0].audioPath;
                state.title = state.list[0].title;
            }
            state.audio.play();
            state.audioStatus = true;
        },
        AUDIO_PAUSE(state) {
            state.audio.pause();
            state.audioStatus = false;
        },
        AUDIO_STATUS_CHANGE(state, status) {
            state.audioStatus = status;
        },
        AUDIO_PLAY_LIST(state, number) {
            if (number > state.list.length) {
                number = state.list.length;
            }
            state.index = number;
            state.src = sourceHost + state.list[number - 1].audioPath;
            state.title = state.list[number - 1].title;
            state.audio.play();
            state.audioStatus = true;
        },
        AUDIO_PLAY_NEXT(state) {
            let number;
            if (state.index === state.list.length) {
                number = 1;
            } else {
                number = state.index + 1;
            }
            state.index = number;
            state.src = sourceHost + state.list[number - 1].audioPath;
            state.title = state.list[number - 1].title;
            state.audio.play();
            state.audioStatus = true;
        },
        AUDIO_PLAY_LAST(state) {
            let number;
            if (state.index === 1) {
                number = state.list.length;
            } else {
                number = state.index - 1;
            }
            state.index = number;
            state.src = sourceHost + state.list[number - 1].audioPath;
            state.audioPath = state.list[number - 1].audioPath;
            state.audio.play();
            state.audioStatus = true;
        }
    },
    action: {}
};