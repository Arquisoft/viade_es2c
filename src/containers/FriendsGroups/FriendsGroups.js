import React, {useState} from 'react';
import {Loader} from '@util-components'
import {FriendsGroupsWrapper,FriendsGroupsContainer,Header} from './FriendsGroups.style';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import auth from "solid-auth-client";
import {useTranslation} from 'react-i18next';
import {errorToaster} from '@utils';
import RdfToGroupParse from '../../utils/parser/RdfToGroupParser';


let groupsLi = null;
/**
 * Container for group of friends
 */
function FriendsGroups(){
    trackSession(function(webId){
        let url = webId.replace("profile/card#me", "viade/groups/");
        loadGroups(url,webId,async function(groups){
            groupsLi = [];
            console.log(groups);
            for(let i = 0; i < groups.length;i++){
                let group = groups[i];

                let name = await group.name;
                let description = await group.description;
                let participants = await group.participants;
                if(participants.length===0){
                    participants = "Aun no hay participantes";
                }
                if(description.length === 0){
                    description = "Este grupo no tiene descripción";
                }
                groupsLi.push(
                    <li key={name.toString()}>
                        <section>
                            <h1>{name.toString()}</h1>
                        </section>
                        <section>
                            <h2>Descripción:</h2>
                            <p>{description.toString()}</p>
                        </section>
                        <ul>
                            <h2>Participantes:</h2>
                            <li>{participants}</li>
                        </ul>
                    </li>
                );
            }
            /*if(groupsLi.length === 0){
                groupsLi.push(
                    <li key = 'noGroups'>
                        <section>
                            <p>Aun no tienes ningun grupo :'(</p>
                        </section>
                    </li>
                );
            }
            */
        });
       
    });
    
    
    /*groupsLi.push(
        <li key = 'ejemplo'>
                <section>
                    <p>Nombre del grupo ejemplo 1</p>
                </section>
                <Button variant="success" 
                        onClick={() => goTo('#/Group')}>
                    Entrar al grupo
                </Button>
            </li>
    );

    groupsLi.push(
        <li key = 'ejemplo'>
                <section>
                    <p>Nombre del grupo ejemplo 2</p>
                </section>
                <Button variant="success" 
                        onClick={() => goTo('#/Group')}>
                    Entrar al grupo
                </Button>
            </li>
    )
    */
    return renderFriendsGroups();
}

function renderFriendsGroups(){
    const [isLoading, setIsLoading] = useState(true);
    let loaded = () => setIsLoading(false);
    setTimeout(loaded,3000);
    return (
        <FriendsGroupsWrapper>
            <FriendsGroupsContainer>
                <div>
                    <Header>
                    <h1>Grupos de Amigos</h1>
                    </Header>
                    <Button 
                        variant="outline-success" 
                        onClick={() => goTo('#/createGroup')}
                    >
                        Crear nuevo grupo
                    </Button>
                    <ul>
                        {groupsLi}
                    </ul>
                </div>
            </FriendsGroupsContainer>
            {isLoading && <Loader absolute/>}
        </FriendsGroupsWrapper>
    );
}

async function loadGroups(url,webId,callback){
    let parser = new RdfToGroupParse();
    parser.addGroups(url,webId,async function(groupsParsed){
        return callback(groupsParsed);
    });

}

function goTo(path) {
    window.location.href=path;
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

export default withRouter(FriendsGroups) ;