import React from 'react';
import { Header,GroupContainer,GroupWrapper } from './Group.style';

let friendsLi = null//amigos del grupo
let image = null;
const defaultProfilePhoto = 'img/icon/empty-profile.svg';

/**
 * Component for the view of each group
 */
function Group(){
    friendsLi = [];
    if(image == null){
        image = defaultProfilePhoto;
    }

    return renderGroup();
}
//TODO: cambiar li de ejemplo por friendsLi
/**
 * h1 is the name of the group
 */
function renderGroup(){
    return (
        <GroupContainer>
            <GroupWrapper>
                <div>
                    <Header>
                        <h1>Grupo 1</h1>
                    </Header>
                    <ul>
                        <li key='ejemplo1'>
                            <section>
                            <img alt={""} src={image} />
                                <p>Amigo1</p>
                            </section>                                
                            <a href='#'>Ver perfil</a>
                        </li>
                        <li key='ejemplo2'>
                                <section>
                                    <img alt={""} src={image} />
                                    <p>Amigo2</p>
                                </section>                                
                            <a href='#'>Ver perfil</a>
                        </li>
                    </ul>
                </div>
            </GroupWrapper>
        </GroupContainer>

    )
}

export default Group;