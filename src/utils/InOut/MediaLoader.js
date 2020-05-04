import SolidAuth from "solid-auth-client";
import auth from "solid-auth-client";
import FC from "solid-file-client";

class MediaLoader {

    saveImage(url, file) {
        SolidAuth.fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });
    }

    saveVideo(url, file) {
        SolidAuth.fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': 'video/mp4'
            }
        });
    }

    loadMedia(url, callback) { // explicacion debajo !!
        const fc = new FC(auth);
        let content = fc.readFile( url );
        content.then(value => callback(value));
    }

    // Callback de la funcion loadMedia, el readFile devuelve un blob y este callback crea una ruta para meter al src de la etiqueta que queramos
    // function callback(file) {
    //     // var blobfile = new File([file], "fil", {type: file.type});
    //     var urlCreator = window.URL || window.webkitURL;
    //     var imageUrl = urlCreator.createObjectURL(file);
    //     const domContainer = document.querySelector('#foto');
    //     ReactDOM.render(<img src={imageUrl} alt={"asdas"}/>, domContainer);
    // }

    //En el html en el que querramos mostrar tenemos que tener este contenedor para que se renderice la imagen
    // <div id={"foto"}></div>

}

export default MediaLoader;