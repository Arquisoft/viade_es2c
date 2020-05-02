import React, {useState} from 'react';
import {Loader} from '@util-components'
import auth from "solid-auth-client";
import data from "@solid/query-ldflex";
import {errorToaster} from '@utils';
import {useTranslation} from 'react-i18next';
import {FriendSelectorContainer, FriendSelectorWrapper, Header} from './FriendSelector.style';


//authentication
//rdf 
const $rdf = require('rdflib');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const store = $rdf.graph();

let friendsLi = null;

const defaultProfilePhoto = 'img/icon/empty-profile.svg';

const FriendSelector = ({parentCallback}) => {
    const {t} = useTranslation();
    trackSession(function(person){
        loadFriends(person, async function(friendsUrls){
            if (friendsUrls == null || friendsUrls === undefined) {
                errorToaster(t('friends.errorObtaining'), "Error");
            } else {
                friendsLi = [];
                for(let i=0; i<friendsUrls.length; i++){
                    let friend = friendsUrls[i];

                    const user = await data[friend];
                    const nameLd = await user.vcard_fn;

                    const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friend.toString();

                    const imageLd = await user.vcard_hasPhoto;

                    let image;
                    if (imageLd && imageLd.value) {
                        image = imageLd.value;
                    } else {
                        image = defaultProfilePhoto;
                    }
                    friendsLi.push(
                        <li key={friend.toString()}>
                            <section>
                                <input type="checkbox" id={friend.toString()} name={friend.toString()} onChange={parentCallback}/>
                                <img alt={""} src={image} />
                                <p>{name}</p>
                            </section>
                        </li>
                    );
                }

                if(friendsLi.length === 0){
                    friendsLi.push(
                        <li key="noFriends">
                            <section>
                                <p>{t("friends.noFriends")}</p>
                            </section>
                        </li>
                    );
                }

            }
        });
    });


    return renderFriendSelector(friendsLi);
}

function renderFriendSelector(){
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    let loaded = () => setIsLoading(false);
    setTimeout(loaded, 3000);

    return (
        <FriendSelectorWrapper>
            <FriendSelectorContainer>
                <div>
                    <Header>
                        <h1>{t('friendsGroups.select')}</h1>
                    </Header>
                    <ul>
                        {friendsLi}
                    </ul>
                </div>
            </FriendSelectorContainer>
            {isLoading && <Loader absolute/>}
        </FriendSelectorWrapper>
        
    )
}

/**
 * TODO: modificar para devolver nombre y url
 * @param p user in session
 * @param callback function executed when the friends list is loaded, with urls and names
 */
async function loadFriends(p, callback) {
    const fetcher = new $rdf.Fetcher(store);
    if (p == null) {
        return callback(null);
    } else {
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
        } else {
            errorToaster(t('friends.userlogged'), "Error");
            return callback(null);
        }
    });
}

export default FriendSelector;