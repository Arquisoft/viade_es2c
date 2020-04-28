import React from 'react';
import { Header,Form,GroupContainer,GroupWrapper,FullGridSize,Label, Input,Button } from './CreateGroup.style';
import {errorToaster, successToaster} from '@utils';

let name = '';
let description = '';

/**
 * Component for groups creation
 */
function CreateGroup(){

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
                            <Input type="text" size="100" placeholder="Nombre del grupo" onChange={handleNameChange}/>
                        </Label>
                        <Label>
                            Descripción
                            <Input type="text" size="100" placeholder="Descripción del grupo" onChange={handleDescriptionChange}/>
                        </Label>
                    </FullGridSize>
                    <FullGridSize>
                        <Button variant="success" onClick={handleCreate}>
                            Crear Grupo
                        </Button>
                    </FullGridSize>
                </Form>
            </GroupContainer>
        </GroupWrapper>
       
    )
}

/**
 * function for Creating the group 
 */
function handleCreate(){
    if(name.length === 0){
        errorToaster('El grupo debe tener un nombre','Error');
    }else{
        console.log('Nombre de el grupo: ' + name);
        console.log('Descripcion de el grupo: ' + description);
        cleanInputs();
        successToaster('Creando grupo', 'Éxito');
        setTimeout(function () {
            window.location.href = '#/friendsGroups'
        }, 3000)
    }
}
/**
 * Function for clean up all the inputs
 */
function cleanInputs(){
    name = '';
    description = '';
}

function handleNameChange(event) {
    event.preventDefault();
    name = event.target.value;
}

function handleDescriptionChange(event) {
    event.preventDefault();
    description = event.target.value;
}

export default CreateGroup;