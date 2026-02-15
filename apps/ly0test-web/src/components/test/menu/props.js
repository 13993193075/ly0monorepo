export default {
    mode: 'horizontal',
    defaultActive: "2-2-2", // 默认打开的菜单索引
    menu: [
        {
            title: "菜单-1",
            menu: [
                {
                    title: "菜单-1-1",
                    menu: [
                        {
                            title: "菜单-1-1-1"
                        },
                        {
                            title: "菜单-1-1-2"
                        },
                        {
                            title: "菜单-1-1-3"
                        }
                    ]
                },
                {
                    title: "菜单-1-2",
                    menu: [
                        {
                            title: "菜单-1-2-1"
                        },
                        {
                            title: "菜单-1-2-2"
                        },
                        {
                            title: "菜单-1-2-3"
                        }
                    ]
                },
                {
                    title: "菜单-1-3",
                    menu: [
                        {
                            title: "菜单-1-3-1"
                        },
                        {
                            title: "菜单-1-3-2"
                        },
                        {
                            title: "菜单-1-3-3"
                        }
                    ]
                }
            ]
        },
        {
            title: "菜单-2",
            menu: [
                {
                    title: "菜单-2-1",
                    menu: [
                        {
                            title: "菜单-2-1-1"
                        },
                        {
                            title: "菜单-2-1-2"
                        },
                        {
                            title: "菜单-2-1-3"
                        }
                    ]
                },
                {
                    title: "菜单-2-2",
                    menu: [
                        {
                            title: "菜单-2-2-1"
                        },
                        {
                            title: "菜单-2-2-2"
                        },
                        {
                            title: "菜单-2-2-3"
                        }
                    ]
                },
                {
                    title: "菜单-2-3",
                    menu: [
                        {
                            title: "菜单-2-3-1"
                        },
                        {
                            title: "菜单-2-3-2"
                        },
                        {
                            title: "菜单-2-3-3"
                        }
                    ]
                }
            ]
        },
        {
            title: "菜单-3",
            menu: [
                {
                    title: "菜单-3-1",
                    menu: [
                        {
                            title: "菜单-3-1-1"
                        },
                        {
                            title: "菜单-3-1-2"
                        },
                        {
                            title: "菜单-3-1-3"
                        }
                    ]
                },
                {
                    title: "菜单-3-2",
                    menu: [
                        {
                            title: "菜单-3-2-1"
                        },
                        {
                            title: "菜单-3-2-2"
                        },
                        {
                            title: "菜单-3-2-3"
                        }
                    ]
                },
                {
                    title: "菜单-3-3",
                    menu: [
                        {
                            title: "菜单-3-3-1"
                        },
                        {
                            title: "菜单-3-3-2"
                        },
                        {
                            title: "菜单-3-3-3",
                            index: "菜单-3-3-3",
                            handle(scopeThis, index){
                                scopeThis.$message("Hello World!")
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "菜单-4"
        },
        {
            title: "菜单-5"
        }
    ]
}
