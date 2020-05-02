import React from 'react';
import { Header,Form,GroupContainer,GroupWrapper,FullGridSize,Label, Input,Button } from './CreateGroup.style';
import {errorToaster, successToaster} from '@utils';
import GroupToRdfParser from '../../utils/parser/GroupToRdfParser'
import auth from "solid-auth-client";
import {useTranslation} from 'react-i18next';
import FriendSelector from './children/FriendSelector';

let name = '';
let description = '';
let friendsSelected = [];
let author = "";
/**
 * Component for groups creation
 */
function CreateGroup(){
    trackSession(function(userUrl){
        author = userUrl;
    })

    return renderCreateGroup();
}

//TODO: seleccionar amigos para añadir
function renderCreateGroup(){
    return(
        <GroupWrapper>
            <GroupContainer>
                <Header> <h1>Nuevo grupo</h1> </Header>
                <Form>
                    <FullGridSize>
                        <Label>
                            Nombre
                            <Input data-testid={"input-nombre"} type="text" size="100" placeholder="Nombre del grupo" onChange={handleNameChange}/>
                        </Label>
                        <Label>
                            Descripción
                            <Input data-testid={"input-descripcion"} type="text" size="100" placeholder="Descripción del grupo" onChange={handleDescriptionChange}/>
                        </Label>
                        <FriendSelector parentCallback = {handleFriendSelected}/>
                    </FullGridSize>
                    <FullGridSize>
                        <Button variant="success" onClick={handleCreate} data-testid={"buttonsubmit"}>
                            Crear Grupo
                        </Button>
                    </FullGridSize>
                </Form>
            </GroupContainer>
        </GroupWrapper>
       
    )
}

function handleFriendSelected(event){
    if(event.target.checked){
        friendsSelected.push(event.target.name)//añadimos url al array
    }else{
        // si deseleccionamos lo eliminamos del array
        friendsSelected = friendsSelected.filter(friend => friend !== event.target.name);
    }
}

/**
 * function for Creating the group into the POD
 */
function handleCreate(){
    if(name.trim().length === 0){
        errorToaster('El grupo debe tener un nombre','Error');
    }
    else if(friendsSelected.length === 0){
        errorToaster('Debes añadir al menos un amigo','Error');
    }
    else if(name.trim().length > 0 && friendsSelected.length > 0){
            let filename = name.trim().replace(/ /g, "") + new Date().getTime();
            let parser = new GroupToRdfParser(friendsSelected,name,description,filename,author);
            parser.parse();
            cleanInputs();
            successToaster('Creando grupo', 'Éxito');
            setTimeout(function () {
            window.location.href = '#/friendsGroups'
            }, 3000);
        
    }
}

function handleNameChange(event) {
    event.preventDefault();
    name = event.target.value;
}

function handleDescriptionChange(event) {
    event.preventDefault();
    description = event.target.value;
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
/**
 * Function for clean up all the inputs
 */
function cleanInputs(){
    name = '';
    description = '';
    friendsSelected = [];
}

export default CreateGroup;