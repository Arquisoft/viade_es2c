import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-awesome-modal'
import {Form, FullGridSize, Header, RouteContainer} from "./Ruta.style";
import Map from "../../components/Map";
import Route from "../../utils/route/Route";
import {withTranslation} from 'react-i18next';
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import MediaLoader from "../../utils/InOut/MediaLoader";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    route: Route,
    t: Function
};

let ruta = null; // <------------------------------------------------ AQUI !!!!! este objeto contiene lo mismo que la ruta que se saca del pod pero con los comentarios que se han añadido nuevos
// ----------- la ruta deberia guardarse en el pod en la funcion addComment()
let comentario = "";

class Ruta extends Component {

    constructor({route}: Props) {
        super();

        this.route = route;
        ruta = route;
        this.state = {
            visible: false,
            comment: ""
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

    addComment() {
        let date = new Date();
        ruta.comments.push({
            comment: {
                text: comentario,
                createdAt: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
            }
        });
        comentario = "";
        this.comments();
        const domContainer = document.querySelector('#input-comentario' + ruta.fileName);
        domContainer.value = "";
    }

    handleCommentChange(event) {
        event.preventDefault();
        comentario = event.target.value;
    }


    comments() {
        try {
            let commentarios = [];
            for (let i = 0; i < ruta.comments.length; i++) {
                commentarios.push(<Card><Card.Body> <Card.Title>{ruta.comments[i].comment.text}</Card.Title>
                    <footer className="blockquote-footer"> Publicado
                        el: {ruta.comments[i].comment.createdAt}</footer>
                </Card.Body> </Card>)
            }
            const domContainer = document.querySelector('#comentarios' + ruta.fileName);
            ReactDOM.render(commentarios, domContainer);
        }
        catch (e) {
            const domContainer = document.querySelector('#comentarios' + ruta.fileName);
            ReactDOM.render(<Card><Card.Body><Card.Title>No hay comentarios en esta
                ruta</Card.Title></Card.Body></Card>, domContainer);
        }
    }

    render() {
        const {t} = this.props;
        ruta = this.route;
        ruta.comments = [{comment: {text: "hola", createdAt: "2020-04-15"}}, {
            comment: {
                text: "hola2",
                createdAt: "2020-04-15"
            }
        }, {comment: {text: "hola3", createdAt: "2020-04-15"}}];
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
                                <Button
                                    variant="success"
                                    data-testid="button-multimedia"
                                    size="sm"
                                    onClick={() => this.verMultimedia()}
                                >
                                    {t('route.media')}
                                </Button>
                                <div id={"foto" + this.route.fileName}></div>
                                <div id={"video" + this.route.fileName}></div>
                            </FullGridSize>
                            <h4>{t('route.comments')}</h4>
                            <FullGridSize>
                                <Button
                                    variant="success"
                                    data-testid="button-show-comment"
                                    id="button-show-comment"
                                    size="sm"
                                    onClick={() => this.comments()}
                                >
                                    {t('comment.show')}
                                </Button>
                            </FullGridSize>
                            <FullGridSize>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <Button
                                            variant="success"
                                            data-testid="button-add-comment"
                                            id="button-add-comment"
                                            size="sm"
                                            onClick={() => this.addComment()}
                                        >
                                            {t('comment.add')}
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl aria-describedby="basic-addon1" onChange={this.handleCommentChange} id={"input-comentario"+ this.route.fileName}/>
                                </InputGroup>
                            </FullGridSize>
                            <FullGridSize>
                                <div id={"comentarios" + this.route.fileName}></div>
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