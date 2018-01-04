let getIp = req =>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip.substring(ip.lastIndexOf(':'));
}

let getLanguage = req => {
    return req.headers["accept-language"].split(';')[0];
}

let getSoftware = req => {
    let ua = req.headers['user-agent']; 
    return ua.substring(ua.indexOf('(') + 1,ua.indexOf(')'));
}

module.exports ={
    getIp: getIp,
    getLanguage: getLanguage,
    getSoftware: getSoftware
}


