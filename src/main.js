import {createApp} from 'vue'
import App from './App.vue'
import * as Keycloak from 'keycloak-js'

let initOptions = {
    url: 'http://localhost:8180/auth',
    realm: 'AuthSrvTest',
    clientId: 'vueclient1',
    onLoad: 'login-required',
    'ssl-required': 'none',
    'enable-cors': 'true'
}

let keycloak = Keycloak(initOptions);
let myData = {};

keycloak.init({onLoad: initOptions.onLoad}).success((auth) => {

    if (!auth) {
        console.log('reload');
        window.location.reload();
    } else {
        console.log('Authenticated');
        myData.token = keycloak.token;
    }


    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    const app = createApp(App,
        {
            kc: keycloak
        })

    app.mount('#app');

    setInterval(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.log('Refreshed');
            } else {
                console.log('no refreshed');
            }
        }).error(() => {
            console.log('Failed to refresh');
        });
    }, 10000)

}).error(() => {
    console.log('Auth failed');
});
