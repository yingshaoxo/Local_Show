let expected_host = ""
let port = window.location.port
if ((port.length != 4) && (port.slice(0,2) != '50')) {
    expected_host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + '5000': '') + "/"
} else {
    expected_host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/"
}

export const HOST = expected_host
export const API_BASE = HOST + 'api/'
export const API_FUNCTION_GET_INFO = 'info/'
export const API_FUNCTION_GET_FILES = 'files/'
export const API_FUNCTION_UPDATE_FILES = 'update/'
export const MEDIA_BASE = HOST + 'media/'