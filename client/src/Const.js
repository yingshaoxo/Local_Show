var expected_host = ""
if (window.location.port != '5000') {
    expected_host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + '5000': '') + "/"
} else {
    expected_host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/"
}

export const HOST = expected_host
