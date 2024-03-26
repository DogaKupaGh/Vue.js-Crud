import { createWebHistory,createRouter } from "vue-router";
const routes = [
    {
      path : "/",
      alias: "/tutorials",
      name: "tutorials",
      component : ()=> import("./components/TutorialsList")
    },
    {
        path : "/ekle",
        name : "ekle",
        component : ()=> import("./components/AddTutorial")
    },
    {
        path : "/tutorials/:id",
        name : "tutorial-details",
        component : ()=> import("./components/TutorialDetail")
    },
    {
        path: "/login",
        name : "login-validation",
        component : ()=> import("./components/LoginValidation")
    }
];
const router = createRouter({
    history : createWebHistory(),
    routes
});
export default router;