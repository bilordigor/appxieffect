import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class KnowledgeStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }


    //PageList

    @observable pageList = {
        pages: [],
        counter: 0,
        search: "",
        loadingInd: true,
        loadingNothing: false,
    }

    @action setPageListData = (name, value) => {
        this.pageList[name] = value
    }

    @action prevPage = () => {
        this.setPageListData("counter", this.pageList.counter - 1)
        this.loadPageList()
    }

    @action nextPage = () => {
        this.setPageListData("counter", this.pageList.counter + 1)
        this.loadPageList()
    }

    @action goSearch = () => {
        this.setPageListData("loadingNothing", false)
        this.setPageListData("counter", 0)
        this.loadPageList(true)
        console.log("pageList", this.pageList)
    }

    @action clearSearch = () => {
        this.setPageListData("loadingNothing", false)
        this.setPageListData("search", "")
        this.setPageListData("counter", 0)
        this.loadPageList()
    }

    @action loadPageList = (isSearch = false) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/pages/`, "POST", { "counter": this.pageList.counter, "search": this.pageList.search }).then(
            (data) => {
                //console.log(data)
                this.setPageListData("pages", data)
                this.setPageListData("loadingInd", false)
                if (isSearch && data.length === 0) this.setPageListData("loadingNothing", true)
            })
    }


    //Page

    @observable page = {
        loading: true,
        id: null,
        name: "",
        description: "",
        theme: "",
        kind: "",
        components: [],
        blueprint: null,
        reusable: null,
        public: null,
        "author_id": null,
        "author_name": null,
        views: null,
        updated: null,
    }

    @action setPage = (value) => {
        this.page = value
    }

    @action setPageData = (name, value) => {
        this.page[name] = value
    }

    @action loadPage = () => {
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        this.rootStore.fetchDataScr(`${this.rootStore.url}/pages/${id}/`, "GET").then(
            (data) => {
                //console.log("meta", data)
                this.setPage(data)
                this.setPageData("loading", false)
            })
    }
}

export default KnowledgeStore;