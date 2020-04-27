/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Header, Input, Label, RouteWrapper, Form, FullGridSize, RouteContainer} from "./Route.style";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = { webId: String, test: boolean };

let markers = [];

let gpxTest = "<gpx creator=\"GPS Visualizer https://www.gpsvisualizer.com/\" version=\"1.0\">  <trk>   <name>Barrett Spur 1</name>    <extensions>      <line xmlns=\"http://www.topografix.com/GPX/gpx_style/0/2\">        <color>9900ff</color>      </line>    </extensions>    <trkseg>      <trkpt lat=\"45.4431641\" lon=\"-121.7295456\"></trkpt>      <trkpt lat=\"45.4428615\" lon=\"-121.7290800\"></trkpt>    </trkseg>  </trk></gpx>"
let gpx = "";

const CreateRouteGPX = ({webId, test}: Props) => {
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
            if (!test && gpx === "") {
                errorToaster(t('notifications.uploadfile'), t('notifications.error'));
            } else {
                parsergpx(test ? gpxTest : gpx);
                if (markers.length === 0) {
                    errorToaster(t('notifications.parsererror'), t('notifications.error'));
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
                    <h1 className={"text--white"}>{t('createRoute.newRoute')}: Gpx</h1>
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
                                   onChange={handleDescriptionChange} data-testid="input-description" id="input-description"/>
                        </Label>

                        <Label>{t('createRoute.uploadGPX')}
                            <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file" id="input-file"/>
                        </Label>

                    </FullGridSize>
                    <h4>{t('createRoute.media')}</h4>
                    <FullGridSize>
                        <Label>{t('createRoute.addPhoto')}</Label>
                        <Input type="file" ref={img} onChange={handlePhotoChange} data-testid="input-img" id="input-img"
                               accept={".png"}/>
                        <Label>{t('createRoute.addVideo')}</Label>
                        <Input type="file" ref={video} onChange={handleVideoChange} data-testid="input-video" id="input-video"
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

export default CreateRouteGPX;