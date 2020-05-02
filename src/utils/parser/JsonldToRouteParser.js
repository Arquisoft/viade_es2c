import Route from "../route/Route";

class JsonldToRouteParser{
    constructor(webID, file) {
        this.webID = webID;
        this.file = file;
    }

    parse(){
        var jsonld = JSON.parse(this.file);
        let name = jsonld.name;
        let description = jsonld.description;
        let points = [];
        let author = this.webID;
        let commentsAux = jsonld.comments;
        let media = jsonld.media;
        let filename = name.trim().replace(/ /g, "") + new Date().getTime();
        let images = [];
        let videos = [];
        let comments = [];
        try {
            // eslint-disable-next-line array-callback-return
            media.map(function (media) {
                if (media["@id"].toString().includes(".mp4")) {
                    videos.push(media["@id"]);
                }
                if (media["@id"].toString().includes(".jpg")) {
                    images.push(media["@id"]);
                }
                if (media["@id"].toString().includes(".png")) {
                    images.push(media["@id"]);
                }

            });
        } catch (e) {}

        try {
            // eslint-disable-next-line array-callback-return
            commentsAux.map(function (comment) {
                if (comment.text != null && comment.createdAt != null) {
                    let text = comment.text;
                    let createdAt = comment.createdAt;
                    let comentario = {comment: {text: text, createdAt: createdAt}};
                    comments.push(comentario)
                }
            });
        } catch (e) {}

        try {
            // eslint-disable-next-line array-callback-return
            jsonld.points.map(function (point) {
                points.push({position: {lat: point.latitude, lng: point.longitude}});
            });
        } catch (e) {}

        return new Route(name, description, points, author, comments, images, videos, filename);
    }

}

export default JsonldToRouteParser;