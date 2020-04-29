import React, {Component} from "react";
import Modal from 'react-awesome-modal'
import {Form, FullGridSize, RouteContainer} from "./Share.style";
import Route from "../../utils/route/Route";
import {withTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FriendsList from "../FriendsList";

type Props = {
    route: Route,
    t: Function,
    test: boolean
};

let ruta = null;



class Ruta extends Component {

    constructor({route, test}: Props) {
        super();

        this.route = route;
        ruta = route;

        this.state = {
            visible: false,
            comment: ""
        };
        this.test = test;
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    cargarAmigos(){
        return FriendsList();
    }

    render() {
        const {t} = this.props;
        ruta = this.route;
        return (
            <section>
                <button data-testid="button-open" id={"button-open-" + this.route.name}
                        onClick={() => this.openModal()}> {t('route.share')}</button>
                <Modal visible={this.state.visible} width="75%" effect="fadeInDown"
                       onClickAway={() => this.closeModal()}>
                    <RouteContainer>
                        <Form>
                            <FullGridSize>
                                {}
                            </FullGridSize>
                            <FullGridSize>
                                <Button
                                    variant="success"
                                    data-testid="button-close"
                                    id="button-close"
                                    size="lg" block
                                    onClick={() => this.closeModal()}
                                >
                                    {t('route.close')}
                                </Button>
                            </FullGridSize>
                            <br/>
                        </Form>
                    </RouteContainer>
                </Modal>
            </section>
        );
    }
}

export {Ruta};
export default withTranslation()(Ruta);