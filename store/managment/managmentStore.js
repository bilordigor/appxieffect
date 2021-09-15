import { action, observable, computed, runInAction, makeObservable, makeAutoObservable } from 'mobx'


class ManagmentStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable pageCreation = {
        id: null,
        name: '',
        description: '',
        theme: '',
        kind: '',
        components: [],
        blueprint: false,
        reusable: false,
        public: false,
    }

    @action setPagecreationDefault = () => {
        this.pageCreation = {
            id: null,
            name: '',
            description: '',
            theme: '',
            kind: '',
            components: [],
            blueprint: false,
            reusable: false,
            public: false,
        }
    }

    @action setPageCreationAll = (value) => {
        this.pageCreation = value
    }

    @action setPageCreation = (name, value) => {
        this.pageCreation[name] = value
    }

    @action setPageCreationComponents = (index, name, value) => {
        this.pageCreation.components[index][name] = value
    }

    @action pushNewComponent = (type) => {
        if (type === "h") {
            this.pageCreation.components.push({ type: "h", fontSize: 36, textAlign: "center", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "заголовок" })
        }
        if (type === "text") {
            this.pageCreation.components.push({ type: "text", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст" })
        }
        if (type === "alert") {
            this.pageCreation.components.push({ type: "alert", alertType: "success", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст уведомления" })
        }
        if (type === "divider") {
            this.pageCreation.components.push({ type: "divider", })
        }
        if (type === "img") {
            this.pageCreation.components.push({ type: "img", aid: null, iid: null, })
        }
        //this.idComponents()
        console.log("compot", this.pageCreation.components)
    }

    @action deleteComponent = (index) => {
        this.pageCreation.components = this.pageCreation.components.filter((n, id) => {
            if (id == index) return false
            return true
        })
        //this.idComponents()
    }

    @action idComponents = () => {
        for (let i = 0; i < this.pageCreation.components.length; i += 1) {
            this.pageCreation.components[i]["id"] = i
        }
    }

    @action savePage = (close = false) => {
        // Сохранить изменения в странице
        if (this.pageCreation.id) {
            //console.log("updatePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${this.pageCreation.id}/`, "PUT", this.pageCreation).then(
                (data) => {
                    if (data) {
                        console.log("done", data)

                    } else {
                        console.log("fail", data)
                    }

                })
        }
        // Создать новую страницу 
        if (!this.pageCreation.id) {
            //console.log("savePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/`, "POST", this.pageCreation).then(
                (data) => {
                    if (data.id) {
                        console.log("done")
                        console.log("id", data.id)
                        this.setPageCreation("id", data.id)
                    } else {
                        console.log("fail")
                    }

                })
        }
        // ОСТАНОВИЛСЯ ЗДЕСЬ
        if (close) {
            this.setPageCreationList("dialogOpen", false)
            this.setPagecreationDefault()
            this.setPageCreationList("counter", 0)
            this.LoadPageList()
        }
    }

    @observable pageCreationList = {
        pages: [],
        counter: 0,
        selectId: null,
        dialogOpen: false,
    }

    @action setPageCreationList = (name, value) => {
        this.pageCreationList[name] = value
        if (name === `selectId`) console.log("selectId", this.pageCreationList.selectId)
    }

    @action LoadPageList = () => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/pages/owned/`, "POST", { "counter": this.pageCreationList.counter }).then(
            (data) => {
                console.log("log", data)
                this.setPageCreationList("pages", data)
            })
    }

    @action prevPageList = () => {
        this.setPageCreationList("counter", this.pageCreationList.counter - 1)
        this.LoadPageList()
    }

    @action nextPageList = () => {
        this.setPageCreationList("counter", this.pageCreationList.counter + 1)
        this.LoadPageList()
    }

    @action deletePageInList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "DELETE").then(
            (data) => {
                if (data.a) {
                    console.log("done", data)
                    this.setPageCreationList("counter", 0)
                    this.LoadPageList()

                } else {
                    console.log("fail", data)
                }

            })

    }

    @action changeOldPageList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "GET").then(
            (data) => {
                if (data) {
                    console.log("done")
                    console.log("data", data)
                    this.setPageCreationAll(data)
                    this.setPageCreationList("dialogOpen", false)
                } else {
                    console.log("fail")
                }

            })
    }

}

export default ManagmentStore;