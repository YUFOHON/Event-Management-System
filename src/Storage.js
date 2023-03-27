class Storage {

    static set(key, value, expired = 0) {
        if (!window.localStorage) {
            return false
        }
        const data = JSON.stringify(value)
        const expireKey = `${key}__expires__`
        const expireTime = Date.now() + 1000 * 60 * expired
        try {
            window.localStorage.setItem(key, data)
            if (expired) {
                window.localStorage.setItem(expireKey, expireTime)
            }
            return true
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                window.localStorage.clear()
                window.localStorage.setItem(key, data)
                return true
            }
            return false
        }
    }

    static get(key) {
        if (!window.localStorage) {
            return false
        }
        const now = Date.now()
        const expired = window.localStorage.getItem(`${key}__expires__`) || Date.now + 1
        if (now >= expired) {
            this.del(key)
            return false
        }
        const value = window.localStorage[key] ? JSON.parse(window.localStorage.getItem(key)) : window.localStorage.getItem(key)
        return value
    }

    static del(key) {
        if (!window.localStorage) {
            return false
        }
        window.localStorage.removeItem(key)
        window.localStorage.removeItem(`${key}__expires__`)
        return true
    }
}