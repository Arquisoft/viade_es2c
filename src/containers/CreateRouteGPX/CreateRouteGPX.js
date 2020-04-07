/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./Route.style";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";

type Props = { webId: String };

let markers = [];

let gpx = "";

const CreateRouteGPX = ({webId}: Props) => {
    const {t} = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    let file = React.createRef();
    let img = React.createRef();
    let video = React.createRef();

    function parsergpx(file) {
        var xmlParser = new DOMParser();
        var xmlDoc = xmlParser.parseFromString(file, "text/xml");
        var trkpts = xmlDoc.getElementsByTagName("trkpt")
        for (var i = 0; i < trkpts.length; i++) {
            let lat = parseFloat(trkpts[i].getAttribute('lat'));
            let lng = parseFloat(trkpts[i].getAttribute('lon'));
            markers.push({position: {lat: lat, lng: lng}});
        }
    }

    function handleSave(event) {
        if (title.length === 0) {
            errorToaster(t('notifications.title'), t('notifications.error'));
        } else if (description.length === 0) {
            errorToaster(t('notifications.description'), t('notifications.error'));
        } else {
            if (gpx === "") {
                errorToaster("suba un archivo", t('notifications.error'));
            } else {
                parsergpx(gpx);
                if (markers.length === 0) {
                    errorToaster("error en el parser: es posible que su archivo no sea valido", t('notifications.error'));
                } else {
                    let loader = new MediaLoader();
                    loader.saveImage(photoURL, img);
                    loader.saveVideo(videoURL, video);

                    let route = new Route(title, description, markers, webID, null, photoURL === "" ? null : photoURL, videoURL === "" ? null : videoURL);
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
        gpx = file.target.result.toString();
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
            setPhotoURL(webID + "viade/resources/" + img.current.files[0].name);
        }
    }

    function handleVideoChange(event) {
        event.preventDefault();
        if (video.current.files.length > 0) {
            setVideoURL(webID + "viade/resources/" + video.current.files[0].name);
        }
    }

    return (
        <RouteWrapper data-testid="route-wrapper">
            <Header data-testid="route-header">
                <h1 className={"text--white"}>{t('createRoute.newRoute')}</h1>
                <Label>import {useTranslation} from 'react-i18next';</Label>
                <Input type="text" size="20" placeholder={t('createRoute.newRoute')} onChange={handleTitleChange}
                       data-testid="input-title"/>
                <Label>{t('createRoute.description')}</Label>
                <Input type="text" size="100" placeholder={t('createRoute.description')}
                       onChange={handleDescriptionChange} data-testid="input-description"/>
                <Label>{t('createRoute.uploadGPX')}</Label>
                <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"/>
                <Label>{t('createRoute.media')}</Label>
                <Label>{t('createRoute.addPhoto')}</Label>
                <Input type="file" ref={img} onChange={handlePhotoChange} data-testid="input-img" accept={".png"}/>
                <Label>{t('createRoute.addVideo')}</Label>
                <Input type="file" ref={video} onChange={handleVideoChange} data-testid="input-video" accept={".mp4"}/>
                <br/>
                <Button onClick={handleSave} data-testid="button-save"> {t('createRoute.saveRoute')} </Button>
            </Header>
        </RouteWrapper>
    );

};

export default CreateRouteGPX;