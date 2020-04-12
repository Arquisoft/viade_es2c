import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-awesome-modal'
import {Form, FullGridSize, Header, RouteContainer} from "./Ruta.style";
import Map from "../../components/Map";
import Route from "../../utils/route/Route";
import {withTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import MediaLoader from "../../utils/InOut/MediaLoader";

type Props = {
    route: Route,
    t: Function
};

let ruta = null;

class Ruta extends Component {

    constructor({route}: Props) {
        super();

        this.route = route;
        ruta = route;
        this.state = {
            visible: false
        }
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

    verMultimedia() {
        const loader = new MediaLoader();
        if (ruta.image != null) {
            loader.loadMedia(ruta.image, function (file) {
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(file);
                const domContainer = document.querySelector('#foto' + ruta.fileName);
                ReactDOM.render(<img src={imageUrl} alt={"foto" + ruta.fileName}/>, domContainer);
            });
        }
        if (ruta.video != null) {
            loader.loadMedia(ruta.video, function (file) {
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(file);
                const domContainer = document.querySelector('#video' + ruta.fileName);
                ReactDOM.render(<video width="320" height="240" controls>
                    <source src={imageUrl} type="video/mp4"/>
                </video>, domContainer);
            });
        }
    }

    render() {
        const {t} = this.props;
        ruta = this.route;
        return (
            <section>
                <button data-testid="button-open" id={"button-open-" + this.route.name}
                        onClick={() => this.openModal()}> {t('route.open')}</button>
                <Modal visible={this.state.visible} width="70%" effect="fadeInDown"
                       onClickAway={() => this.closeModal()}>
                    <RouteContainer>
                        <Header data-testid="route-header">
                            <h1 id={"route-title-" + this.route.name} className="text--white">{this.route.name}</h1>
                        </Header>
                        <Form>
                            <FullGridSize>
                                <h4>{t('createRoute.description')}</h4>
                                <p>{this.route.description}</p>
                            </FullGridSize>
                            <h4>{"Mapa"}</h4>
                            <FullGridSize>
                                <Map zoom={15} markers={this.route.points}/>
                            </FullGridSize>
                            <h4>{t('createRoute.media')}</h4>
                            <FullGridSize>
                                <button data-testid="button-multimedia" onClick={this.verMultimedia}>{t('route.media')}
                                </button>
                                <div id={"foto" + this.route.fileName}></div>
                                <div id={"video" + this.route.fileName}></div>
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


                    {/*<input type="button" data-testid="button-close" value={t('route.close')} onClick={() => this.closeModal()}/>*/}
                </Modal>
            </section>
        );
    }
}

export {Ruta};
export default withTranslation()(Ruta);