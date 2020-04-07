//import React, {Component} from 'react';
import {NotificationTypes, useNotification, useWebId} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";

class SendNotification {

    constructor(webID) {
        this.webID = webID;
    }

    async sendNotification(content, to, type, license, web) {
        try {
            console.log("antes")
            await this.createNotification(content, to, type, license);
            console.log("despues")
        } catch (error) {
            console.log(error);
        }
    }

    createNotification = () => useNotification(this.webID);

    notification(title, content, webId,friendWebID,url){
        try {
            const contentNotif = {
                title: title,
                summary: content,
                actor: webId,
                object: url,
                target: friendWebID
            };
            this.publish(this.sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
        } catch (error) {
            console.log(error);
        }
    }

    publish = async (createNotification, content, webId, type) => {
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
                }, to.path, type, license,content.actor);
            }
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

}


export default SendNotification;

// //import React, {Component} from 'react';
// import React, {useEffect} from 'react';
// import {Header, Input, RouteContainer, RouteWrapper} from "./Ruta.style";
// import Map from "../../components/Map";
// import routes from "../../constants/globals";
// import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
// import {notification} from '@utils';
// import auth from "solid-auth-client";
// import {useTranslation} from 'react-i18next';
//
//
// const Ruta = ({match,ruta}) => {
//         let cadena = null;
//         let friendWebID = null;
//         const {createNotification} = useNotification(cadena);
//         const route = ruta == null? routes[match.params.id] : ruta;
//         const { t } = useTranslation();
//
//         useEffect(() => {
//             auth.trackSession(session => {
//                 if (session) {
//                     cadena = session.webId;
//                     console.log(cadena)
//                 }
//             });
//         });
//
//         async function sendNotification(content, to, type, license) {
//             try {
//                 await createNotification(content, to, type, license);
//             } catch (error) {
//                 console.log(error);
//                 alert(t('notifications.sendNotification'));
//             }
//         }
//
//         function handleSave() {
//             try {
//                 const contentNotif = {
//                     title: "Route share",
//                     summary: "hola guapa",
//                     actor: cadena,
//                     object: cadena + "viade/" + route.name,
//                     target: friendWebID
//                 };
//                 publish(sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
//             } catch (error) {
//                 console.log(error);
//                 alert(t('notifications.notShareRoute'));
//             }
//         }
//
//         const publish = async (createNotification, content, webId, type) => {
//             try {
//                 type = type || NotificationTypes.ANNOUNCE;
//
//                 const license = 'https://creativecommons.org/licenses/by-sa/4.0/';
//
//                 const inboxes = await notification.findUserInboxes([
//                     {path: webId, name: 'Global'}
//                 ]);
//                 if (inboxes.length === 0)
//                     return false;
//                 const to = notification.getDefaultInbox(inboxes, 'Global');
//                 if (to) {
//
//                     await createNotification({
//                         title: content.title,
//                         summary: content.summary,
//                         actor: content.actor,
//                         object: content.object,
//                         target: content.target
//                     }, to.path, type, license);
//                 }
//                 return true;
//             } catch (e) {
//                 console.error(e);
//                 return false;
//             }
//         };
//
//         function handleFriendChange(event) {
//             event.preventDefault();
//             friendWebID = event.target.value;
//         }
//
//         return (
//             <RouteWrapper>
//                 <RouteContainer>
//                     <Header>
//                         <h1 className="text--white">{route.name}: </h1>
//                         <h2 className="text--white">{route.description}</h2>
//                         <br/>
//                         <Input type={"text"} placeholder={"WebID"} onChange={handleFriendChange}/>
//                         <button onClick={handleSave}>{t('route.share')}</button>
//                     </Header>
//                     <Map zoom={15} markers={route.points}/>
//                 </RouteContainer>
//             </RouteWrapper>
//         )
//
//     }
//
// ;
//
// export default Ruta;