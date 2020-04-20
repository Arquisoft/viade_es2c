/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Header, Input, Label, RouteWrapper, RouteContainer, Form, FullGridSize} from "./CreateRouteJSONLD.style";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = { webId: String, test: boolean };

let markers = [];

let geojsontest = '{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": {"type": "LineString", "coordinates": [[28.67431640625, 51.74743863117572], [28.037109375, 50.33844888725473], [30.684814453125004, 50.00067775723633], [30.223388671874996, 51.303145259199056], [29.68505859375, 49.1888842152458], [26.400146484375, 51.31688050404585]]}}]}'
let geojson = '';


const CreateRouteJSONLD = ({webId, test}: Props) => {
    const {t} = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    let file = React.createRef();
    let img = React.createRef();
    let video = React.createRef();

    function parsergeojson(file) {
        // var json = JSON.parse( $('script[type="application/ld+json"]').text() );
        var jsonld = JSON.parse(file);
        let name = jsonld.name;
        let description = jsonld.description;
        let points = [];
        let author = webID;
        let commentsAux = jsonld.comments;
        let media = jsonld.media;
        let filename = name.trim().replace(/ /g, "") + new Date().getTime();
        let images = [];
        let videos = [];
        let comments = [];
        try {
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
            jsonld.points.map(function (point) {
                points.push({position: {lat: point.latitude, lng: point.longitude}});
            });
        } catch (e) {}

        let route = new Route(name, description, points, author, comments, images, videos, filename);
        console.log(route)
    }

    function handleSave(event) {
        parsergeojson(test ? geojsontest : geojson);
        if (title.length === 0) {
            errorToaster(t('notifications.title'), t('notifications.error'));
        } else if (description.length === 0) {
            errorToaster(t('notifications.description'), t('notifications.error'));
        } else {
            if (!test && geojson === "") {
                errorToaster("suba un archivo", t('notifications.error'));
            } else {
                parsergeojson(test ? geojsontest : geojson);
                if (markers.length === 0) {
                    errorToaster("error en el parser: es posible que su archivo no sea valido", t('notifications.error'));
                } else {
                    let loader = new MediaLoader();
                    loader.saveImage(photoURL, imgFile);
                    loader.saveVideo(videoURL, videoFile);
                    let filename = title.trim().replace(/ /g, "") + new Date().getTime();
                    let route = new Route(title, description, markers, webID, null, photoURL === "" ? null : photoURL, videoURL === "" ? null : videoURL, filename);
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
                                   data-testid="input-title"/>
                        </Label>

                        <Label>{t('createRoute.description')}
                            <Input type="text" size="100" placeholder={t('createRoute.description')}
                                   onChange={handleDescriptionChange} data-testid="input-description"/>
                        </Label>

                        <Label>{t('createRoute.uploadJsonLD')}
                            <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"
                                   accept={".jsonld"}/>
                        </Label>

                    </FullGridSize>
                    <h4>{t('createRoute.media')}</h4>
                    <FullGridSize>
                        <Label>{t('createRoute.addPhoto')}</Label>
                        <Input type="file" ref={img} onChange={handlePhotoChange} data-testid="input-img"
                               accept={".png"}/>
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