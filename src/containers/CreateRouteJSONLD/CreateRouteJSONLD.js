/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Form, FullGridSize, Header, Input, Label, RouteContainer, RouteWrapper} from "./CreateRouteJSONLD.style";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import JsonldToRouteParser from "../../utils/parser/JsonldToRouteParser";

type Props = { webId: String, test: boolean };

let markers = [];

let geojson = '';


const CreateRouteJSONLD = ({webId, test}: Props) => {
    const {t} = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [photoURLJSON, setPhotoURLJSON] = useState([]);
    const [videoURLJSON, setVideoURLJSON] = useState([]);
    const [commentsJSON, setcommentsJSON] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    let file = React.createRef();
    let img = React.createRef();
    let video = React.createRef();

    function handleSave(event) {
        if (title.length === 0) {
            errorToaster(t('notifications.title'), t('notifications.error'));
        } else if (description.length === 0) {
            errorToaster(t('notifications.description'), t('notifications.error'));
        } else {
            if (!test && geojson === "") {
                errorToaster(t('notifications.uploadfile'), t('notifications.error'));
            } else {
                if (markers === 0) {
                    errorToaster(t('notifications.parsererror'), t('notifications.error'));
                } else {
                    let loader = new MediaLoader();
                    if(imgFile !== null){
                        loader.saveImage(photoURL, imgFile);
                    }
                    if(videoFile !== null){
                        loader.saveVideo(videoURL, videoFile);
                    }
                    let filename = title.trim().replace(/ /g, "") + new Date().getTime();
                    let photos = [];
                    let videos = [];
                    if (photoURL !== "") {
                        photos.push(photoURL);
                    }
                    if (videoURL !== "") {
                        videos.push(videoURL);
                    }
                    if (photoURLJSON.length !== 0) {
                        photoURLJSON.forEach(x => photos.push(x));
                    }
                    if (videoURLJSON.length !== 0) {
                        videoURLJSON.forEach(x => videos.push(x));
                    }
                    let route = new Route(title, description, markers, webID, commentsJSON, photos , videos, filename);
                    let parser = new RouteToRdfParser(route, webID);
                    parser.parse();
                    successToaster(t('notifications.save'), t('notifications.success'));
                    setTimeout(function () {
                        window.location.href = '#/timeline'
                    }, 1000)
                }
            }
        }
        event.preventDefault();
    }

    function handleTitleChange(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        event.preventDefault();
        setDescription(event.target.value);
    }

    function loaded(file) {
        geojson = file.target.result.toString();
        let parser = new JsonldToRouteParser(webID, geojson);
        let route = parser.parse();
        const title = document.getElementById("input-title");
        title.value = route.name;
        setTitle(route.name);
        const description = document.getElementById("input-description");
        description.value = route.description;
        setDescription(route.description);
        markers = route.points;

        if (route.image.length !== 0) {
            setPhotoURLJSON(route.image)
        }
        if (route.video.length !== 0) {
            setVideoURLJSON(route.video);
        }
        if (route.comments.length !== 0) {
            setcommentsJSON(route.comments);
        }
        const domContainer = document.querySelector('#multimediacargada');
        let multimediacargada = '<h5>Archivos multimedia cargados:</h5><ul>';
        for(let i = 0; i<route.image.length; i++){
            multimediacargada += '<li>'+route.image[i]+'</li>';
        }
        for(let i = 0; i<route.video.length; i++){
            multimediacargada += '<li>'+route.video[i]+'</li>';
        }
        multimediacargada += '</ul>';
        domContainer.innerHTML = multimediacargada;
    }

    function handleUpload(event) {
        event.preventDefault();
        if (file.current.files.length > 0) {
            var reader = new FileReader();
            reader.readAsText(file.current.files[0]);
            reader.onload = loaded;
        }
    }

    function handlePhotoChange(event) {
        event.preventDefault();
        if (img.current.files.length > 0) {
            setImgFile(img.current.files[0]);
            setPhotoURL(webID + "viade/resources/" + img.current.files[0].name);
        }
    }

    function handleVideoChange(event) {
        event.preventDefault();
        if (video.current.files.length > 0) {
            setVideoFile(video.current.files[0]);
            setVideoURL(webID + "viade/resources/" + video.current.files[0].name);
        }
    }

    return (
        <RouteWrapper data-testid="route-wrapper">
            <RouteContainer>
                <Header data-testid="route-header">
                    <h1 className={"text--white"}>{t('createRoute.newRoute')}: JSON-LD</h1>
                </Header>
                <Form>
                    <h4>{t('createRoute.data')}</h4>
                    <FullGridSize>
                        <Label>
                            {t('createRoute.title')}
                            <Input type="text" size="20" placeholder={t('createRoute.newRoute')}
                                   onChange={handleTitleChange}
                                   data-testid="input-title" id="input-title"/>
                        </Label>

                        <Label>{t('createRoute.description')}
                            <Input type="text" size="100" placeholder={t('createRoute.description')}
                                   onChange={handleDescriptionChange} data-testid="input-description"
                                   id="input-description"/>
                        </Label>

                        <Label>{t('createRoute.uploadJsonLD')}
                            <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"
                                   accept={".jsonld"}/>
                        </Label>

                    </FullGridSize>
                    <h4>{t('createRoute.media')}</h4>
                    <FullGridSize>
                        <div id={"multimediacargada"} data-testid={"multimediacargada"}></div>
                        <Label>{t('createRoute.addPhoto')}</Label>
                        <Input type="file" ref={img} onChange={handlePhotoChange} data-testid="input-img"
                               accept={"image/*"}/>
                        <Label>{t('createRoute.addVideo')}</Label>
                        <Input type="file" ref={video} onChange={handleVideoChange} data-testid="input-video"
                               accept={".mp4"}/>
                    </FullGridSize>
                    <FullGridSize>
                        <Button
                            variant="success"
                            onClick={handleSave}
                            data-testid="button-save"
                            id="button-save"
                            size="lg" block
                        >
                            {t('createRoute.saveRoute')}
                        </Button>
                    </FullGridSize>
                </Form>

            </RouteContainer>
        </RouteWrapper>
    );

};

export default CreateRouteJSONLD;