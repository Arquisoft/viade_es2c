import React, {useEffect, useState} from 'react';
import {TimelineRouteCard, TimelineRouteDetail} from './timelineroute.style';
import Ruta from "../../Ruta"
import auth from "solid-auth-client";
import {AccessControlList, NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {errorToaster, notification, successToaster} from '@utils';
import {useTranslation} from 'react-i18next';
import {Button, InputGroup, FormControl} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeLineRoute = props => {
    let cadena = null;
    const [friendWebID, setFriendWebID] = useState("");
    let route = props.route;
    const title = route.name;
    const description = route.description;
    const {createNotification} = useNotification(cadena);
    const {t} = useTranslation();

    useEffect(() => {
        auth.trackSession(session => {
            if (session) {
                cadena = session.webId;
            }
        });
    });


    function isValidURL(string) {
        // eslint-disable-next-line no-useless-escape
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)()/g);
        return (res !== null)
    };

    function handleShare() {
        if (isValidURL(friendWebID)) {
            try {
                let url = cadena.replace("profile/card#me", "viade/" + route.fileName);
                const permissions = [
                    {
                        agents: [friendWebID],
                        modes: [AccessControlList.MODES.READ]
                    }
                ];
                const ACLFile = new AccessControlList(cadena, url);
                ACLFile.createACL(permissions);
                successToaster(t('notifications.accessGranted'));

                const contentNotif = {
                    title: "Route share",
                    summary: "Ha compartido una ruta contigo",
                    actor: cadena,
                    object: url,
                    target: friendWebID
                };
                publish(sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
            } catch (error) {
                errorToaster(t('notifications.errorGrantingAccess'));
            }
        } else {
            errorToaster("Friend webId is not valid", t("notifications.error"));
        }

    }

    const publish = async (createNotification, content, webId, type) => {
        try {
            type = type || NotificationTypes.ANNOUNCE;

            const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

            const inboxes = await notification.findUserInboxes([
                {path: webId, name: 'Global'}
            ]);
            if (inboxes.length === 0)
                return false;
            const to = notification.getDefaultInbox(inboxes, 'Global');
            if (to) {

                await createNotification({
                    title: content.title,
                    summary: content.summary,
                    actor: content.actor,
                    object: content.object,
                    target: content.target
                }, to.path, type, license);
            }
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };


    async function sendNotification(content, to, type, license) {
        try {
            await createNotification(content, to, type, license);
        } catch (error) {
            console.log(error);
        }
    }

    function handleFriendChange(event) {
        event.preventDefault();
        setFriendWebID(event.target.value);
    }

    return (

        <TimelineRouteCard className="card">
            <TimelineRouteDetail data-testid="welcome-detail">
                <h3>{title} - {route.author}</h3>
                <p>{description}</p>
                <Ruta route={route}/>
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-success" onClick={handleShare}>{t('route.share')}</Button>
                    </InputGroup.Prepend>
                    <FormControl type={"text"} placeholder={"WebID"} onChange={handleFriendChange}/>
                </InputGroup>
            </TimelineRouteDetail>
        </TimelineRouteCard>
    );
};

export default TimeLineRoute;


