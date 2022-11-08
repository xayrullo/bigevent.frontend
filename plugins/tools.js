import Vue from "vue";

const tools = {
    phoneFormatter(phone) {
        phone = phone.includes('+') > 0 ? phone.substring(1) : phone
        let match = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/)
        return `+(${match[1]})${match[2]} ${match[3]}-${match[4]}`
    },
    getImgUrl(path) {
        return require('@/assets/images/' + path)
    },
    getFileUrl(name) {
        if (name) {
            if (name.includes('https://')) {
                return name
            }
            if (name.includes('/uploads')) {
                return `${process.env.VUE_APP_IMG_URL}${name}`
            }
            if (name.includes('/')) {
                return `${process.env.VUE_APP_IMG_URL}/uploads${name}`
            }
            return `${process.env.VUE_APP_IMG_URL}/uploads/${name}`
        }
    },
    getLocalImgUrl(path) {
        return require('@/assets/images/' + path)
    },
    setCurrentLanguage(lang) {
        try {
            localStorage.setItem('currentLanguage', lang)
        } catch (error) {
            console.log(">>>> src/utils/index.js : setCurrentLanguage -> error", error)
        }
    },
    camelize(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");
    },
    getDateTime(stringdate) {
        let date = new Date(stringdate);
        let year = date.getFullYear();
        let month = this.getNol((1 + date.getMonth()).toString());
        let day = this.getNol(date.getDate().toString());
        let hours = this.getNol(date.getHours().toString());
        let minutes = this.getNol(date.getMinutes().toString());
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
    getDate(stringdate) {
        let date = new Date(stringdate);
        let year = date.getFullYear();
        let month = this.getNol((1 + date.getMonth()).toString());
        let day = this.getNol(date.getDate().toString());
        return `${day}.${month}.${year}`;
    },
    getNol(e) {
        return e.length > 1 ? e : "0" + e;
    },
    focusI(a) {
        document.getElementById(a).focus();
    },
    setPageNumber(count, limit) {
        return count % limit > 0 ? Math.trunc(count / limit) + 1 : count / limit;
    },
    currency(n, currency) {
        return new Intl.NumberFormat({
            style: "currency",
            currency: "currency"
        }).format(n);
    },
    checkToNone(data) {
        if (data === "None") {
            return "";
        }
        return data;
    },
    checkToEmpty(data) {
        if (data === "") {
            return "None";
        }
        return data;
    }
};
export default tools;
Vue.prototype.$tools = tools;
