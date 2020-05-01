let friendsUrls = [];

function agregarAmigos(list) {
    if(list === undefined || list === null){
        return friendsUrls;
    } else {
        friendsUrls = [];
        for (let i = 0; i < list.length; i++) {
            friendsUrls.push(list[i]);
        }
        return friendsUrls;
    }
}

export default agregarAmigos;