async function loginMenu({scopeThis, state, label}){
    switch (label) {
        case 'login-info':
            state.loginInfo.popup.visible = true
            break
        case 'login':
            state.login.popup.visible = true
            break
        case 'logout':
            await logout({scopeThis})
            break
    }
}

async function logout({scopeThis}){
    await scopeThis.ly0request.ly0.storpro({
        noSession: true,
        storproName: 'ly0d0login.session.logout',
        data: { ly0session: this.ly0session },
    })
    scopeThis.ly0request.ly0.ly0sessionClear()
    scopeThis.ly0session = {
        session: {
            usertbl: 'ly0d7guest',
        },
        mall: scopeThis.ly0session.mall || null,
    }
    scopeThis.ly0request.ly0.ly0sessionSave(scopeThis.ly0session)
    location.reload()
}

function myInfo({scopeThis, state}) {
    state.myInfo = {
        info: '匿名/未登录',
        none: false,
    }
    if (
        !scopeThis.ly0session ||
        !scopeThis.ly0session.session ||
        !scopeThis.ly0session.session.usertbl ||
        scopeThis.ly0session.session.usertbl !== 'ly0d7guest' ||
        !scopeThis.ly0session.session.type ||
        !scopeThis.ly0session.session[scopeThis.ly0session.session.type]
    ) {
        state.myInfo.none = true
    } else {
        state.myInfo.info = scopeThis.ly0session.session[scopeThis.ly0session.session.type]
    }
}
export default {
    loginMenu,
    logout,
    myInfo
}