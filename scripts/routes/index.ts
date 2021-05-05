import buildExtender from "sf-extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import "sf-extension-utils/lib/router/goBack"; // Implements onBackButtonPressed

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/pgNavigator",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgNavigator").default,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pgStandardList",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgStandardList").default,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pgZebraList",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgZebraList").default,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pgSearchView",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgSearchView").default,
                        headerBarStyle: { visible: true }
                    })
                })
            ]
        })
    ]
});

export default router;
