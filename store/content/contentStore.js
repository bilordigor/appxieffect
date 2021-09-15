import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class ContentStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    //Loading Screen
    @observable images = {
        
    }

    @action setImage = (aid, iid, value) => {
        this.images[`${aid}-${iid}`] = value
    }

    @action loadImgFromServer = (aid, iid) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/images/${aid}-${iid}/`, "GET").then(
            (data) => {
                if (data) {
                    this.setImage(aid, iid, data)
                } else {
                    console.log("fail", data)
                }

            })
    }
    



}

export default ContentStore;