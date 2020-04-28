import React from 'react';
import { Header,Form,GroupContainer,GroupWrapper,FullGridSize,Label, Input,Button } from './CreateGroup.style';

function handleCreate(){
    console.log('Grupo creado')
}
/**
 * Component for groups creation
 */
function CreateGroup(){
    return(
        <GroupWrapper>
            <GroupContainer>
                <Header> <h1>Nuevo grupo</h1> </Header>
                <Form>
                    <FullGridSize>
                        <Label>
                            Nombre
                            <Input type="text" size="100" placeholder="Nombre del grupo"/>
                        </Label>
                        <Label>
                            Descripción
                            <Input type="text" size="100" placeholder="Descripción del grupo"/>
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

export default CreateGroup;