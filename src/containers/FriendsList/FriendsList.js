import React, {useState} from 'react';
import {Loader} from '@util-components'
import {FriendListContainer, FriendListWrapper, Header} from './FriendList.style';
import {useTranslation} from 'react-i18next';
import {errorToaster} from '@utils';
/*import { render } from 'react-testing-library';*/
import auth from "solid-auth-client";

//authentication
//rdf 
const $rdf = require('rdflib');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const store = $rdf.graph();
//const fetcher = new $rdf.Fetcher(store);

//var person = null;
// var person = 'https://ruben.verborgh.org/profile/#me';//example person with friends

var friendsLi = null;

/**
 * Container component to show the user´s friends
 * TODO: retornar ademas de la url el nombrey pasarselo al callback,
 * funcionamiento cuando usuario no tenga amigos, arreglar que se carguen datos antes de vista
 */
function FriendsList() {
    const {t} = useTranslation();
    //obtaining webId of the user in session
    trackSession(function(persona){
        loadFriends(persona,function(friendsUrls){
            if(friendsUrls == null || friendsUrls === undefined){
                errorToaster(t('friends.errorObtaining'), "Error");
            }
            else{
                    friendsLi = friendsUrls.map(friend =>
                        <li key={friend.toString()}>
                        <h2>{friend}</h2>
                        <a href={friend}>{t("friends.profile")}</a>
                    </li>
                    );   
            }
        });
    });
    
    return renderFriendsList();
}
/**
 * this function returns the view, must be called after
 * obtaining the friendsList
 */
function renderFriendsList(){
    const {t} = useTranslation();
    const [isLoading,setIsLoading] = useState(true);
    var loaded = () => setIsLoading(false);
    return( 
    <FriendListWrapper>
        {setTimeout(loaded,3000)}
        <FriendListContainer>
        <div>
            <Header>
                <h1>{t("friends.list")}</h1>
            </Header>
                <ul>
                    {friendsLi}
                </ul>     
        </div>
        </FriendListContainer>
        {isLoading && <Loader absolute/>}
    </FriendListWrapper>)
}

/**
 * this function obtains the name of a person url
 * @param personUrl 
 * @param callback function executed when friend is loaded
 */
// async function obtainFullName(personUrl,callback){
//     await fetcher.load(personUrl);
//     const fullName = store.any(personUrl,FOAF('name'));
//     if(fullName === undefined || fullName === null){
//         console.log('Error obtaining the name of '+personUrl);
//     }else{
//         callback(fullName);
//     }
// }

/**
 * TODO: modificar para devolver nombre y url
 * @param p user in session
 * @param callback function executed when the friends list is loaded, with urls and names
 */
async function loadFriends(p,callback) {
    const fetcher = new $rdf.Fetcher(store);
    if(p == null){
        return callback(null);
    }else{
        await fetcher.load(p);
        const friends = store.each($rdf.sym(p), FOAF('knows'));

        var friendsUrls = friends.map(friend =>
             friend.value        
        );
    }   
    return callback(friendsUrls);
}

/**
 * This function is used for tracking the user session
 */
function trackSession(callback) {
    const {t} = useTranslation();
    auth.trackSession(session => {
        if (session) {
            return callback(session.webId);
        }
        else {
            errorToaster(t('friends.userlogged'), "Error");
            return callback(null);
        }
    });
}

export default FriendsList;