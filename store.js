import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import React from 'react'

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store

class Store {
  constructor() {
    makeObservable(this)
  }
  @observable url = 'https://xieffect.pythonanywhere.com'

  //@observable url = 'https://qwert45hi.pythonanywhere.com'
  //xieffect.pythonanywhere.com

  //Loading Screen

  @observable loading = {
    "/login": true,
    "/": true,
    "/registration": true,
    "/resetpassword/email": true,
  }

  @action setLoading = (page) => {
    this.loading[page] = false
  }

  // Settings

  @observable settings = {
    avatar: undefined,
    username: '',
    darkTheme: true,
    emailAfter: '',
    emailBefore: '',
    emailConfirmed: null,
  }

  @action setSettings = (item, value) => {
    this.settings[item] = value
  }

  // Course List

  @observable counterCourses = 0

  @action counterZero = () => {
    this.counterCourses = 0
  }

  @observable openDialogCourseList = false

  @action setDialogCourseList = (value) => {
    this.openDialogCourseList = value
  }

  @observable openDialogCourseCreation = false

  @action setOpenDialogCourseCreation = (value) => {
    this.openDialogCourseCreation = value
  }

  @observable openDialogAboutCourses = false

  @action setOpenDialogAboutCourses = (value) => {
    this.openDialogAboutCourses = value
  }

  @observable noEarlierLoad = true

  @action setNoEarlierLoad = (value) => {
    this.noEarlierLoad = value
  }

  @observable ownCoursesList = [

  ]

  @action loadingMoreOwnCourses = () => {
    //console.log("loading new ownCourses")
    // this.setIsLoading(true)
    // this.collectFilters()
    let filters = {
      "filters": {
        "global": ["owned"],
        "difficulty": [],
        "category": [],
        "theme": [],
      },
      "sort": "popularity",
      "search": "",
      "counter": 0,
    }
    let lnght = 0
    do {
      this.fetchDataScr(`${this.url}/modules/`, "POST", filters)
        .then((data) => {
          //console.log("courses:", data)
          if (data != undefined) {
            lnght = data.length
            if (lnght == 12) {
              filters.counter = filters.counter + 1
            } else {
              filters.counter = 0
            }
            this.addItemsOwnCoursesList(data)
          } else {
            lnght = 0
          }
        });
    } while (lnght == 12)
    //console.log(this.ownCoursesList)
  }

  @action addItemsOwnCoursesList = (data) => {
    this.ownCoursesList.push(...data)
    //console.log("ownCoursesList", this.ownCoursesList)

  }


  @observable coursesList = [

  ]

  @action clearCoursesList = () => {
    this.coursesList = []
  }

  @action isNullCourses = () => {
    //console.log(this.coursesList.length)
    if (this.coursesList.length == 0) return true
    return false
  }

  @observable filters = {
    "filters": {
      // "global": "2",
      // "difficulty": "1",
      // "category": "1",
      // "theme": "math",
    },
    "sort": "popularity",
    "counter": 0
  }

  @action counterUp = () => {
    this.filters.counter = this.filters.counter + 1
    //console.log("counter", this.counterCourses)
  }

  @action setFilters = (newFilters) => {
    this.filters = newFilters
  }

  @action loadingMoreCourses = () => {
    //console.log("loading new courses")
    this.setIsLoading(true)
    //this.collectFilters()

    this.fetchDataScr(`${this.url}/modules/`, "POST", this.filters)
      .then((data) => {
        console.log("courses:", data)
        if (data != undefined) {
          if (data.length < 12) {
            this.setAllLoading(true)
          }
          //console.log(data.length)
          this.setIsLoading(false)
          this.addItemsCoursesList(data)
        }
      });
  }

  @observable allLoading = false

  @action setAllLoading = (value) => {
    this.allLoading = value
  }

  @observable isLoadingNewCourses = false

  @action setIsLoading = (value) => {
    this.isLoadingNewCourses = value
  }

  @action storeClickedMoreVertIcon = (id, value, event) => {
    this.coursesList.find(course => course["id"] === id)["openMenu"] = value
    this.coursesList.find(course => course["id"] === id)["openMenuTarget"] = event
  }

  @action setOneCourseHidden = (id) => {
    //console.log("idF", id)
    const index = this.coursesList.findIndex(course => course["id"] === id);
    //console.log("index", index)
    if (index !== -1) {
      this.coursesList.splice(index, 1);
    }
    //console.log("n1", this.coursesList)
  }

  @action setDataCoursesList = (id, name, value) => {
    this.coursesList.find(course => course["id"] === id)[name] = value
  }

  @action addItemsCoursesList = (data) => {
    this.coursesList.push(...data)
    //console.log("coursesList", this.coursesList)
  }




  // Hidden Courses

  @observable allHiddenCoursesLoad = false

  @action setAllHiddenCoursesLoad = (value) => {
    this.allHiddenCoursesLoad = value
  }

  @observable hiddenCoursesCounter = 0

  @action setHiddenCoursesCounter = (value) => {
    this.hiddenCoursesCounter = value
  }

  @observable hiddenCourses = []

  @action clearHiddenCourses = () => {
    this.hiddenCourses = []
  }

  @action pushHiddenCourses = (newItems) => {
    this.hiddenCourses.push(...newItems)
  }

  @action loadingMoreHiddenCourses = () => {
    //console.log("loading new courses")
    this.fetchDataScr(`${this.url}/modules/hidden/`, "POST", { "counter": this.hiddenCoursesCounter },)
      .then((data) => {
        //console.log("courses:", data)
        if (data != undefined) {
          if (data.length < 30) {
            this.setAllHiddenCoursesLoad(true)
          }
          //console.log(data.length)
          this.pushHiddenCourses(data)
        }
      });
  }

  @action hiddenCoursesFilter = (itemId) => {
    this.hiddenCourses = this.hiddenCourses.filter(n => {
      if (n.id == itemId) return false
      return true
    });
  }



  @action getNewCourses = () => {
    // this.getDataScr(`${this.url}/modules/`)
    //   .then((data) => {
    //     //console.log("courses:", data)
    //     if (data != undefined) {
    //       this.newCoursesList.push(...data.elements)
    //     }
    //   });
    const courses = [
      { name: 'Математика' },
      { name: 'Физика' },
      { name: 'История' },

    ]
    this.newCoursesList.push(...courses)
  }

  @action deleteCourse = (name) => {
    // this.getDataScr(`${this.url}/modules/`)
    //   .then((data) => {
    //     //console.log("courses:", data)
    //     if (data != undefined) {
    //       this.newCoursesList.push(...data.elements)
    //     }
    //   });
    const names = this.newCoursesList.map(el => el.name);
    this.newCoursesList.splice(names.indexOf(name), 1)
    //console.log("newCoursesList", this.newCoursesList)
  }

  @observable newCoursesList = []



  // Course Creation

  @observable nowEditModuleMeta = {
    img: null
  }

  @action setNowEditModuleMeta = (title, value) => {
    this.nowEditModuleMeta[title] = value
  }


  @observable nowEditModule = {
    id: null,
    name: '',
    title: '',
    difficulty: '',
    category: '',
    theme: '',
    type: '',
    imgId: null,
    points: [

    ],
  }

  @action setNowEditModule = (title, value) => {
    this.nowEditModule[title] = value
  }

  @action clearnowEditModule = () => {
    this.nowEditModule = {
      name: '',
      description: '',
      difficulty: '',
      category: '',
      theme: '',
      type: '',
      imgId: null,
      points: [

      ],
    }
  }

  // Работа с деревом 

  @action setOpenPages = (point) => {
    this.nowEditModule.points[point].openPages = !this.nowEditModule.points[point].openPages
  }

  @action setReadOnlyPoint = (point, value) => {
    this.nowEditModule.points[point].readOnly = value
  }

  @action setLabelPoint = (point, value) => {
    this.nowEditModule.points[point].label = value
  }

  @action setReadOnlyPage = (point, page, value) => {
    this.nowEditModule.points[point].pages[page].readOnly = value
  }

  @action setLabelPage = (point, page, value) => {
    this.nowEditModule.points[point].pages[page].label = value
  }

  @action pushNewPoint = () => {
    const newPoint = {
      label: "Новая точка",
      type: "not selected",
      openPages: true,
      readOnly: true,
      pages: []
    }
    this.nowEditModule.points.push(newPoint)
  }

  @action setPointType = (pnt, value) => {
    this.nowEditModule.points[pnt].type = value
  }

  @action pushNewPage = (point) => {
    const newPageModuls = {
      label: "Новая страница",
      readOnly: true,
      id: "-" + Object.keys(this.newPages).length,
    }
    this.nowEditModule.points[point].pages.push(newPageModuls)
    const newPageList = {
      label: "Новая страница",
      type: "page",
      components: [],
    }
    this.newPages["-" + Object.keys(this.newPages).length] = newPageList
  }

  @action deletePoint = (itemId) => {
    this.nowEditModule.points = this.nowEditModule.points.filter((n, id) => {
      if (id == itemId) return false
      return true
    });
  }

  @action deletePage = (point, itemId) => {
    this.nowEditModule.points[point].pages = this.nowEditModule.points[point].pages.filter((n, id) => {
      if (id == itemId) return false
      return true
    });
  }

  // LoadedPages

  @observable loadedPages = {

  }

  @action downloadLoadedPages = (id) => {
    this.fetchDataScr(`${this.url}/wip/pages/${id}`, "GET").then(
      (data) => {
        this.loadedPages[id] = data
      }
    )
  }

  @observable nowEditPageMeta = {
    id: "",
    type: "",
  }

  @action clearNowEditPageMeta = () => {
    this.nowEditPageMeta = {
      id: "",
      type: "",
    }
  }

  @action setNowEditPageMeta = (type, value) => {
    this.nowEditPageMeta[type] = value
  }

  // NewPages 

  @observable newPages = {

  }

  @action deleteComponent = (index) => {
    this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components = this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components.filter((n, id) => {
      if (id == index) return false
      return true
    });
  }

  @action setComponentsValues = (index, type, value) => {
    this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components[index][type] = value
  }

  @action clearNewPages = () => {
    this.newPages = {}
  }

  @action pushNewItemToPages = (type) => {
    if (type === "h") this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components.push({ type: "h", fontSize: 30, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "заголовок" })
    if (type === "text") this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components.push({ type: "text", fontSize: 30, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст" })
    console.log("components", this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components)
  }

  @action setComponentsPages = (value) => {
    this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components = value
  }

  @action setComponentsPagesValues = (type, index, value) => {
    this[store.nowEditPageMeta.type][store.nowEditPageMeta.id].components[index][type] = value
  }

  //Page

  @action saveChangeInModuleEditor = () => {
    // for (const [key, value] of Object.entries(this.newPages)) {
    // console.log(key, value)

    // }
    for (const [key, value] of Object.entries(this.loadedPages)) {
      //console.log(key, value)
      this.fetchDataScr(`${this.url}/wip/pages/${key}`, "PUT", value).then(
        (data) => {
          //console.log("data", data)
        }
      )
    }
    for (let i = 0; i < this.nowEditModule.points.length; i++) {
      for (let j = 0; j < this.nowEditModule.points[i].pages.length; j++) {
        if (this.nowEditModule.points[i].pages[j].id <= 0) {
          this.fetchDataScr(`${this.url}/wip/pages/`, "POST", this.newPages[this.nowEditModule.points[i].pages[j].id]).then(
            (data) => {
              //console.log("data", data)
              this.nowEditModule.points[i].pages[j].id = data.id
              this.loadedPages[data.id] = this.newPages[this.nowEditModule.points[i].pages[j].id]
            }
          )
        }
      }
    }
    this.clearNewPages()
    if (this.nowEditModule.imgId === null) {
      this.fetchDataScr(`${this.url}/wip/images/`, "POST", this.nowEditModule.img).then(
        (data) => {
          this.nowEditModule.imgId = data.id
          //console.log("data", data)
        }
      )
    } else {
      this.fetchDataScr(`${this.url}/wip/images/${this.nowEditModule.imgId}`, "PUT", this.nowEditModuleMeta.img).then(
        (data) => {
          this.nowEditModule.imgId = data.id
          //console.log("data", data)
        }
      )
    }
    if (this.nowEditModule.id === null) {
      this.fetchDataScr(`${this.url}/wip/modules/`, "POST", this.nowEditModule).then(
        (data) => {
          this.nowEditModule.id = data.id
          //console.log("data", data)
        }
      )
    } else {
      this.fetchDataScr(`${this.url}/wip/modules/${this.nowEditModule.id}`, "PUT", this.nowEditModule).then(
        (data) => {
          this.nowEditModule.id = data.id
          //console.log("data", data)
        }
      )
    }
  }








  @computed async getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  @action async fetchData(url, method, data) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      //console.log(response.headers)
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);
      return json; // parses JSON response into native JavaScript objects
    } catch (error) {
      //console.log(error)
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  }

  @action async fetchDataScr(url, method, data = null) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      //console.log("Печенье:", this.getCookie('csrf_access_token'))
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      //console.log(response.headers)
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);
      return json; // parses JSON response into native JavaScript objects
    } catch (error) {
      //console.log(error)
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  }


}

function initializeStore(initialData = null) {
  const _store = store ?? new Store()

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}















  // @observable dialogsList = [
  //   { key: '1', id: '1', userName: 'Стивен Хокинг', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636659031375892/bigben1.jpg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '2', id: '2', userName: 'Томас Эдисон', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636671639978044/historyEGE.jpeg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '3', id: '3', userName: 'Мария Кюри', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636702974836746/internetculture.jpg?width=1079&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '4', id: '4', userName: 'Луи Пастер', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', createrName: 'Ξ Effect', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636691793215528/historyjpg.jpg?width=1208&height=755", createrAvatar: 'Ξ' },
  //   { key: '5', id: '5', userName: 'Исаак Ньютон', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636716514836500/literature.jpg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '6', id: '6', userName: 'Альберт Эйнштейн', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636732419112970/math.jpg?width=1342&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '7', id: '7', userName: 'Никола Тесла', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636659031375892/bigben1.jpg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '8', id: '8', userName: 'Эдвин Хаббл', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636671639978044/historyEGE.jpeg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '9', id: '9', userName: 'Игорь Букшев', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636702974836746/internetculture.jpg?width=1079&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '10', id: '10', userName: 'Майкл Фарадей', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', createrName: 'Ξ Effect', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636691793215528/historyjpg.jpg?width=1208&height=755", createrAvatar: 'Ξ' },
  //   { key: '11', id: '11', userName: 'Чарльз Дарвин', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636716514836500/literature.jpg?width=1208&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  //   { key: '12', id: '12', userName: 'Галилео Галилей', lastMessage: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', courseAvatar: "https://media.discordapp.net/attachments/616924730875707393/783636732419112970/math.jpg?width=1342&height=755", createrName: 'Ξ Effect', createrAvatar: 'Ξ' },
  // ]

  // @observable userGroups = [
  //   { label: '11А' },
  //   { label: 'Университет ИТМО' },
  // ]



  // @action hydrate = (data) => {
  //   if (!data) return

  //   this.courseList = data.courseList
  //   console.log(this.courseList)
  // }