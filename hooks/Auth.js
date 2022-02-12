import axios from 'axios'

const isLogger = true
const logger = (log, type = 'warn') => {
    const msg = '[useInyApi]: ' + log
    if (!isLogger) return
    console[type](msg)
}

const API_CONFIG = {
    protocol: 'https:',
    host: 'iny.su',
    pathname: 'api/method/'
}

const API_PATH_METHOD = `${API_CONFIG.protocol}//${API_CONFIG.host}/${API_CONFIG.pathname}`

function useInyDeviceObject() {
    return {
        android: 'fab fa-android',
        iphone: 'fab fa-apple',
        ipad: 'fab fa-apple',
        symbian: 'fas fa-mobile',
        'windows phone': 'fas fa-mobile',
        'tablet os': 'fas fa-mobile',
        linux: 'fab fa-linux',
        windows: 'fab fa-microsoft',
        macintosh: 'fab fa-apple',
        undefined: 'fas fa-globe'
    }
}

function useInyDeviceTest() {
    return [
        { device: 'Android', platform: /Android/ },
        { device: 'iPhone', platform: /iPhone/ },
        { device: 'iPad', platform: /iPad/ },
        { device: 'Symbian', platform: /Symbian/ },
        { device: 'Windows Phone', platform: /Windows Phone/ },
        { device: 'Tablet OS', platform: /Tablet OS/ },
        { device: 'Linux', platform: /Linux/ },
        { device: 'Windows', platform: /Windows NT/ },
        { device: 'Macintosh', platform: /Macintosh/ }
    ]
}

const deviceObject = useInyDeviceObject()
const deviceTest = useInyDeviceTest()

function useInyDevice() {
    const platform = navigator.userAgent
    for (const index in deviceTest) {
        if (deviceTest[index].platform.test(platform)) {
            return deviceTest[index].device
        }
    }

    return 'unavailable platform: ' + platform
}

function useInyMiddleware(response) {
    if (response.data.status === 419) {
        logger('Fatal error / Reloading page')
        Api.setClientId(() => { }, () => {
            document.location.reload()
        })
        return false
    }
    return response.data
}

export const Api = new Proxy({
    /* system */
    system: {
        guardInterval: 0
    },

    /* config */
    config: {
        /* system */
        appId: 0,
        guardIntervalOffset: 5 * 60 * 1000,

        /* flags */
        flags: {
            isAuthorizeWithUrl: true,
            isGuardInterval: true
        },

        /* localStorage */
        localStorageName: {
            clientId: 'client_id',
            jwt: 'jwt',
            fastLogin: 'fastLogin'
        },

        /* router api */
        routerPush: (routeName, routeReason) => {
            logger('routerPush key in config')
            logger('you have not installed callback for getters')
            logger('name: ', routeName, 'routeReason: ', routeReason)
        },

        /* store api */
        /**
         * @param {('login', 'register', 'logout')} what
         * @param {Object} payload
         */
        storeCommit: (what, payload) => {
            logger('routerPush key in config')
            logger('you have not installed callback for getters')
            logger('what: ', what, 'payload: ', payload)
        }
    },

    setConfig(appId, config = {}) {
        if (!appId) {
            logger('specify the app id')
            return false
        }
        this.config.appId = appId

        if (typeof config?.routerPush === 'function') this.config.routerPush = config.routerPush
        if (typeof config?.storeCommit === 'function') this.config.storeCommit = config.storeCommit
        if (typeof config?.localStorageName?.clientId === 'string') this.config.localStorageName.clientId = config.localStorageName.clientId
        if (typeof config?.localStorageName?.jwt === 'string') this.config.localStorageName.jwt = config.localStorageName.jwt
        if (typeof config?.localStorageName?.fastLogin === 'string') this.config.localStorageName.fastLogin = config.localStorageName.fastLogin
        if (typeof config?.guardIntervalOffset === 'number') this.config.guardIntervalOffset = config.guardIntervalOffset
    },

    /* callback alias */
    routerPush(routeName, routeReason = '') {
        return this.config.routerPush(routeName, routeReason)
    },

    /**
     * @returns {Boolean}
     */
    storeGetterIsAuth() {
        return this.user.isAuth
    },
    /**
     * @returns {Object}
     */
    storeGetterUser() {
        return this.user.data
    },
    /**
     * @param {('login', 'register', 'logout')} type
     * @param {Object} payload
     * @returns
     */
    storeCommit(type, payload) {
        this.setUserObject(type, payload)
        return this.config.storeCommit(type, payload)
    },

    /* user store */
    user: new Proxy({
        _listIsAuth: [],
        _listUser: [],
        isAuth: false,
        data: {}
    }, {
        get(target, key) {
            return target[key]
        },
        set(target, key, value) {
            if (key === 'isAuth') {
                target._listIsAuth.forEach(fn => {
                    fn(value)
                })
            }
            if (key === 'data') {
                target._listUser.forEach(fn => {
                    fn(value)
                })
            }
            target[key] = value
            return true
        }
    }),

    /* instance and callback init */
    install(appId, config = {
        localStorageName: {},
        routerPush: (routeName, routeReason) => { },
        storeCommit: (what, payload) => { }
    }) {
        this.setConfig(appId, config)
        return this
    },

    /* app */
    getAppById() { },

    /* life cycle */
    mounted() {
        const clientId = localStorage.getItem(this.config.localStorageName.clientId)

        if (!clientId) this.setClientId()
        this.restoreSession()
        this.refreshJwt()

        if (this.config.flags.isGuardInterval) {
            this.system.guardInterval = setInterval(() => {
                this.refreshJwt()
            }, this.config.guardIntervalOffset)
        }

        if (this.config.flags.isAuthorizeWithUrl) {
            const authParamName = 'auth'
            const searchParams = new URLSearchParams(location.search)
            if (searchParams.get(authParamName)) {
                const jwt = searchParams.get(authParamName)
                localStorage.setItem(this.config.localStorageName.jwt, jwt)
                this.restoreSession()
                this.routerPush('Current', 'Fix query auth')
            }
        }

        const storageEvent = (event) => {
            if (event.key === 'jwt') {
                localStorage.setItem(this.config.localStorageName.jwt, event.newValue)
                this.restoreSession()
            }
        }

        window.addEventListener('storage', storageEvent)
    },
    unmounted() {
        if (this.system.guardInterval) clearInterval(this.system.guardInterval)
    },

    /* client */
    setClientId(fnStart = () => { }, fnEnd = () => { }) {
        const appId = this.config.appId
        const platform = useInyDevice()
        fnStart(appId, platform)
        axios.get(API_PATH_METHOD + `device.getClientId?v=1.0&app_id=${appId}&platform=${platform}`)
            .then((response) => {
                useInyMiddleware(response)
                const clientId = response.data.clientId
                localStorage.setItem(this.config.localStorageName.clientId, clientId)
                fnEnd(clientId, appId, platform)
            })
    },
    getDeviceIcon(device) {
        return deviceObject[device.toLowerCase()]
    },

    /* auth */
    /**
     * @description При успешной авторизации возвращает userData, иначе то, что пришло с сервера
     * @async
     * @param {String} username
     * @param {String} password
     * @returns {Object} user object
     * @returns {Object} error object
     */
    async login(username, password) {
        const clientId = localStorage.getItem(this.config.localStorageName.clientId)
        const response = await axios.get(API_PATH_METHOD + `user.login?v=1.0&email=${username}&password=${password}&client_id=${clientId}`)
        const userData = this.parseJwt(response.data.jwt)
        if (userData) {
            localStorage.setItem(this.config.localStorageName.jwt, response.data.jwt)
            this.storeCommit('login', userData)
            return userData
        }
        this.storeCommit('login', response.data)
        return response.data
    },
    /**
     * @description При успешной авторизации возвращает userData, иначе то, что пришло с сервера
     * @async
     * @param {String} name
     * @param {String} surname
     * @param {String} email
     * @param {String} gender - male, female
     * @param {String} password
     * @returns {Object} user object
     * @returns {Object} error object
     */
    async register(name, surname, email, gender, password) {
        const clientId = localStorage.getItem(this.config.localStorageName.clientId)
        const response = await axios.get(API_PATH_METHOD + `user.register?v=1.0&client_id=${clientId}&name=${name}&surname=${surname}&email=${email}&gender=${gender}&password=${password}`)
        const userData = this.parseJwt(response.data.jwt)
        if (userData) {
            localStorage.setItem(this.config.localStorageName.jwt, response.data.jwt)
            this.storeCommit('register', userData)
            return userData
        }
        this.storeCommit('register', response.data)
        return response.data
    },
    logout() {
        /**
         * @todo add fast login user data
         */
        localStorage.setItem(this.config.localStorageName.jwt, 'logout')
        this.storeCommit('logout', { data: 'logout' })
        this.routerPush('main', 'because the user logged out')
    },
    async refreshJwt() {
        const isAuth = this.storeGetterIsAuth()
        const jwt = localStorage.getItem(this.config.localStorageName.jwt)
        const clientId = localStorage.getItem(this.config.localStorageName.clientId)
        if (!isAuth) return true
        if (!navigator.onLine) return true

        const response = await axios.get(API_PATH_METHOD + `user.refreshJwt?v=1.0&jwt=${jwt}&client_id=${clientId}`).catch(() => {
            this.logout()
        })

        const user = useInyMiddleware(response)
        if (user.jwt !== jwt) {
            if (user.jwt === 'logout') this.logout()
            else this.storeCommit('login', user.jwt)
        }
        if (user.permission === 'deny') this.logout()
    },
    restoreSession() {
        const jwt = localStorage.getItem(this.config.localStorageName.jwt)
        const userData = this.parseJwt(jwt)
        if (!userData) this.logout()
        this.setUserObject('login', userData)
    },
    parseJwt(jwt) {
        if (typeof jwt !== 'string') return false
        const [headerB64, dataB64, salt] = jwt.split('.')
        if (!headerB64 || !dataB64 || !salt) return false
        const json = atob(dataB64)
        const data = JSON.parse(json)
        return data
    },
    /**
     * @param {('login', 'register', 'logout')} type
     * @param {Object} payload
     */
    setUserObject(type, payload) {
        if (typeof payload !== 'object') return
        if ((type === 'login' || type === 'register') && payload.uid) {
            // login:set
            this.user.isAuth = true
            this.user.data = {
                ...payload
            }
        }
        if (type === 'logout' || !payload.uid) {
            this.user.isAuth = false
            this.user.data = {}
        }
    },

    getFastLogin() { },
    addFastLogin() { },
    deleteFastLogin() { },

    /* user methods */
    getUserPublicInfo() { },
    getUserPrivateInfo() { },
    userEditSave() { },
    isOnline() { },

    /* device */
    sessionsShow() { },
    sessionDelete() { }
}, {
    get(target, prop) {
        return target[prop]
    },
    set(target, prop, value) {
        target[prop] = value
    }
})

export function useAuth() {
    return Api
}

export function useUser(_listUser = () => { }) {
    const user = Api.user.data
    Api.user._listUser.push(_listUser)
    _listUser(user)
}

export function useIsAuth(_listIsAuth = () => { }) {
    const isAuth = Api.user.isAuth
    Api.user._listIsAuth.push(_listIsAuth)
    _listIsAuth(isAuth)
}