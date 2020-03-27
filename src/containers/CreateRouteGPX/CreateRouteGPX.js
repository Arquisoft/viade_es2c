/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./Route.style";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";

type Props = {webId: String};

let markers = [];

let gpx = "";

const CreateRouteGPX = ({ webId }: Props) => {
    const { t } = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    let file = React.createRef();

    function parsergpx(file) {
        var xmlParser = new DOMParser();
        var xmlDoc = xmlParser.parseFromString(file, "text/xml");
        var trkpts = xmlDoc.getElementsByTagName("trkpt")
        for (var i = 0; i < trkpts.length ;i++) {
            let lat = parseFloat(trkpts[i].getAttribute('lat'));
            let lng = parseFloat(trkpts[i].getAttribute('lon'));
            markers.push({lat:lat, lng: lng});
        }
    }

    function handleSave(event) {
        if (title.length === 0) {
            errorToaster(t('notifications.title'),t('notifications.error'));
        }else if(description.length === 0){
            errorToaster(t('notifications.description'),t('notifications.error'));
        } else {
            parsergpx(gpx);
            console.log(markers)
            let route = new Route(title, description, markers, webID, null, null, null);
            let parser = new RouteToRdfParser(route, webID);
            parser.parse();
            successToaster(t('notifications.save'),t('notifications.success'));
            window.location.href=`#/timeline`;
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
        var reader = new FileReader();
        reader.readAsText(file.current.files[0]);
        reader.onload = loaded;
    }

    return (
        <RouteWrapper>
            <Header>
                <h1 className={"text--white"}>Nueva Ruta</h1>
                <Label>Titulo</Label>
                <Input type="text" size="20" placeholder="Nueva ruta" onChange={handleTitleChange} />
                <Label>Descripcion</Label>
                <Input type="text" size="100" placeholder="Descripcion" onChange={handleDescriptionChange}/>
                <Label>Sube tu archivo GPX</Label>
                <Input type="file" ref={file} onChange={handleUpload}/>
                <br/>
                <Button onClick={handleSave}> Guardar ruta </Button>
            </Header>
        </RouteWrapper>
    );

};

export default CreateRouteGPX;