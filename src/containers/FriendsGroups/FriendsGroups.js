import React, {useState} from 'react';
import {Loader} from '@util-components'
import {FriendsGroupsWrapper,FriendsGroupsContainer,Header} from './FriendsGroups.style';
import { Button } from 'react-bootstrap';

let groupsLi = null;
/**
 * Container for group of friends
 */
function FriendsGroups(){
    groupsLi = [];
    
    if(groupsLi.length === 0){
        groupsLi.push(
            <li key = 'noGroups'>
                <section>
                    <p>Aun no tienes ningun grupo :'(</p>
                </section>
            </li>
        )
    }
    
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
                    <h1 className={"text--white"}>Grupos de Amigos</h1>
                    </Header>
                    <Button variant="outline-success">
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

export default FriendsGroups;