/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./Route.style";
import {CreateMap} from "../../components";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";

type Props = {
    webId: String,
    t: Function
};

const CreateRoute = ({webId}: Props) => {
    const {t} = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [markers, setMarkers] = useState({});
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    let img = React.createRef();
    let video = React.createRef();


    function callbackFunction(childData) {
        setMarkers(childData);
    }

    function handleSave(event) {
        if (title.length === 0) {
            errorToaster(t('notifications.title'), t('notifications.error'));
        } else if (description.length === 0) {
            errorToaster(t('notifications.description'), t('notifications.error'));
        } else if (markers.length === undefined) {
            errorToaster("Añada marcadores al mapa para crear la ruta", t('notifications.error'));
        } else {
            let loader = new MediaLoader();
            loader.saveImage(photoURL, img);
            loader.saveVideo(videoURL, video);
            let filename = title.trim().replace(/ /g, "") + new Date().getTime();
            let route = new Route(title, description, markers, webID, null, photoURL === "" ? null : photoURL, videoURL === "" ? null : videoURL,filename);
            let parser = new RouteToRdfParser(route, webID);
            parser.parse();
            successToaster(t('notifications.save'), t('notifications.success'));
            setTimeout(function () {
                window.location.href = '#/timeline'
            }, 1000)
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
                <Label>{t('createRoute.title')}</Label>
                <Input type="text" size="20" placeholder={t('createRoute.newRoute')} onChange={handleTitleChange}
                       data-testid="input-title" id={"input-title"}/>
                <Label>{t('createRoute.description')}</Label>
                <Input type="text" size="100" placeholder={t('createRoute.description')}
                       onChange={handleDescriptionChange} data-testid="input-description" id={"input-description"}/>
                <Label>{t('createRoute.media')}</Label>
                <Label>{t('createRoute.addPhoto')}</Label>
                <Input type="file" ref={img} onChange={handlePhotoChange} data-testid="input-img" id={"input-img"}
                       accept={".png"}/>
                <Label>{t('createRoute.addVideo')}</Label>
                <Input type="file" ref={video} onChange={handleVideoChange} data-testid="input-video" id={"input-video"}
                       accept={".mp4"}/>
                <br/>
                <Button onClick={handleSave} data-testid="button-save"
                        id={"button-save"}> {t('createRoute.saveRoute')} </Button>
            </Header>

            <CreateMap parentCallback={callbackFunction}/>

        </RouteWrapper>
    );

};

export default CreateRoute;