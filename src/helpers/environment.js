let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000/'
        break
    case 'jg-yum.herokuapp.com':
        APIURL = 'https://ak-yum.herokuapp.com/'
}

export default APIURL;