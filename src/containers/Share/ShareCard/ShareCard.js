import React from 'react';
import {AccessControlList, NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {errorToaster, notification, successToaster} from '@utils';
import {useTranslation} from 'react-i18next';
import {Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Name from "@solid/react/lib/components/Name";

const TimeLineRoute = props => {
    const {t} = useTranslation();
    let friendWebID = props.friendWebID;
    let WebID = props.WebID;
    let url = props.url;
    const {createNotification} = useNotification(WebID);

    function handleShare() {
        try {
            const permissions = [
                {
                    agents: [friendWebID],
                    modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
                }
            ];
            const ACLFile = new AccessControlList(WebID, url);
            ACLFile.createACL(permissions);
            successToaster(t('notifications.accessGranted'));

            const contentNotif = {
                title: "Route share",
                summary: "Ha compartido una ruta contigo",
                actor: WebID,
                object: url,
                target: friendWebID
            };
            publish(sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
        } catch (error) {
            errorToaster(t('notifications.errorGrantingAccess'));
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

    return (
        <Card className="text-left my-2" data-testid="share-card">
            <Card.Body>
                <Card.Title  data-testid="share-card-title"><Name src={"[" + friendWebID + "]"}/></Card.Title>
                <Button  data-testid="share-card-share" variant="outline-success" onClick={handleShare}>{t('route.share')}</Button>
            </Card.Body>
        </Card>
    );
};

export default TimeLineRoute;