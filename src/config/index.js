import NetInfo from "@react-native-community/netinfo";

function getIPv4Address() {
    NetInfo.fetch().then(state => {
        return state.details.ipAddress;
    });
}

export const Config = {
    API_URL: `http://192.168.22.100:8000/api`,
    NUM_WORDS_PREVIEW: 5,
    REVIEW_STATUS_LOGS: {
        FINISHED: 'finished',
        UN_FINISHED: 'un-finished',
        CANCELLED: 'cancelled',
    },
    MAX_RANKING_OF_DAY: 1,
    GAMES: {
        PUZZLE: 'puzzle',
    },
    MAX_WRONG_ANSWER: 3,
    POINT_OF_RIGHT_ANSWER: 10,
};
