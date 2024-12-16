import Cookies from "js-cookie";


export function setSessionCookie(guid) {
    let cookie = getSessionCookie();
    if (cookie != null) {
        Cookies.remove("session_id");
    }
    Cookies.set("session_id", guid, { expires: 1 });
}   

export function getSessionCookie() {
    let sessionCookie = Cookies.get("session_id");
    
    if (sessionCookie == null) {
        return null;
    }
    else {
        return JSON.parse(sessionCookie);
    }
}