/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Header, Input, Label, RouteWrapper, RouteContainer, Form, FullGridSize} from "./RouteGeoJSON.style";
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


const CreateRouteGeoJSON = ({webId, test}: Props) => {
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
        var geoObject = JSON.parse(file);
        var features = [];
        features = geoObject.features;
        if (features.length === 1) {
            if (features[0].geometry.type === "LineString") {
                var coordinates = features[0].geometry.coordinates;
                for (var i = 0; i < coordinates.length; i++) {
                    markers.push({position: {lat: coordinates[i][0], lng: coordinates[i][1]}});
                }
            }
        }
    }

    function handleSave(event) {
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
                    let arrayphoto = [];
                    if(photoURL !== ""){
                        arrayphoto.push(photoURL);
                    }
                    let arrayvideo = [];
                    if(videoURL !== ""){
                        arrayvideo.push(videoURL);
                    }
                    let route = new Route(title, description, markers, webID, [], arrayphoto, arrayvideo, filename);
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
                    <h1 className={"text--white"}>{t('createRoute.newRoute')}: GeoJSON</h1>
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

                        <Label>{t('createRoute.uploadGeoJson')}
                            <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"/>
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

export default CreateRouteGeoJSON;