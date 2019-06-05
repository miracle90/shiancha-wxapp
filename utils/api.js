const baseUrl = 'https://shiancha.guduokeji.com'

export const getOpenidApi = baseUrl + '/main/user/insertNewUser'

// 常规赛开始答题
export const startRegularApi = baseUrl + '/main/user/startAnswerRegular'

// 常规赛答题
export const answerRegularApi = baseUrl + '/main/user/answerRegular'

// 专场赛开始答题
export const startFeatureApi = baseUrl + '/main/user/startAnswerSpecial'

// 专场赛答题
export const answerFeatureApi = baseUrl + '/main/user/answerSpecial'

// 校验是否可以进入专题赛
export const checkQualifiApi = baseUrl + '/main/user/checkQualification'

// 更新专题赛时间
export const updateTimeApi = baseUrl + '/main/user/updateAnswerTime'

// 排行榜
export const rankListApi = baseUrl + '/main/user/rankList'

// 分享
export const shareApi = baseUrl + '/main/user/share'

// 抽奖记录
export const getPrizeRecordApi = baseUrl + '/main/user/getPrizeRecord'

// 抽奖
export const awardApi = baseUrl + '/main/user/award'

// 获取内容
export const getContentApi = baseUrl + '/main/content/getContent'
