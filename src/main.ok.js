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

    console.log('id token\n' + keycloak.idToken);
    console.log('token\n' + keycloak.token);
    console.log('refresh token\n' + keycloak.refreshToken);
    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    createApp(App).mount('#app');

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
    }, 60000)

}).error(() => {
    console.log('Auth failed');
});
