import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-awesome-modal'
import {Form, FullGridSize, RouteContainer} from "./Ruta.style";
import Map from "../../components/Map";
import Route from "../../utils/route/Route";
import {withTranslation} from 'react-i18next';
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import MediaLoader from "../../utils/InOut/MediaLoader";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    route: Route,
    t: Function,
    test: boolean
};

let comentario = "";

class Ruta extends Component {

    constructor({route, test}: Props) {
        super();

        this.route = route;
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

    verMultimedia(rutaAux) {
        const loader = new MediaLoader();
        if (rutaAux.image != null) {
            if(rutaAux.image.length > 0){
                const domContainer = document.querySelector('#foto' + rutaAux.fileName);
                let html = '<ul>';
                for(let i = 0; i<rutaAux.image.length; i++){
                    html += '<li><img src="" alt="foto'+ rutaAux.fileName+i+'" id="foto'+rutaAux.fileName+i+'" style="max-width:100%;max-height:100%;"/></li>';
                }
                html += '</ul>';
                domContainer.innerHTML = html;
            }
            for(let i = 0; i<rutaAux.image.length; i++){
                // eslint-disable-next-line no-loop-func
                loader.loadMedia(rutaAux.image, function (file) {
                    let urlCreator = window.URL || window.webkitURL;
                    let imageUrl = urlCreator.createObjectURL(file);
                    const domContainer = document.querySelector('#foto' + rutaAux.fileName+i);
                    domContainer.src = imageUrl;
                });
            }
        }
        if (rutaAux.video != null) {
            if(rutaAux.video.length > 0){
                const domContainer = document.querySelector('#video' + rutaAux.fileName);
                let html = '<ul>';
                for(let i = 0; i<rutaAux.video.length; i++){
                    html += '<li><div id="video'+rutaAux.fileName+i+'"></div></li>';
                }
                html += '</ul>';
                domContainer.innerHTML = html;
            }

            for(let i = 0; i<rutaAux.video.length; i++){
                // eslint-disable-next-line no-loop-func
                loader.loadMedia(rutaAux.video, function (file) {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(file);
                    const domContainer = document.querySelector('#video' + rutaAux.fileName+i);
                    ReactDOM.render(<video width="320" height="240" controls> <source src={imageUrl} type="video/mp4"/> </video>, domContainer);
                });
            }
        }
    }

    addComment(rutaAux) {
        if (comentario.trim().length !== 0 && comentario !== "" && comentario !== null) {
            let date = new Date();
            rutaAux.comments.push({
                comment: {
                    text: comentario,
                    createdAt: date.toLocaleDateString()
                }
            });
            if (!this.test) {
                let parser = new RouteToRdfParser(rutaAux);
                parser.ovewrite();
            }
            comentario = "";
            this.comments(rutaAux);
            const domContainer = document.querySelector('#input-comentario' + rutaAux.fileName);
            domContainer.value = "";
        }
    }

    handleCommentChange(event) {
        event.preventDefault();
        comentario = event.target.value;
    }

    comments(rutaAux) {
        const {t} = this.props;
        let commentarios = [];
        for (let i = 0; i < rutaAux.comments.length; i++) {
            commentarios.push(<Card><Card.Body> <Card.Title>{rutaAux.comments[i].comment.text}</Card.Title>
                <footer className="blockquote-footer"> {t('comment.createdAt')} {rutaAux.comments[i].comment.createdAt}</footer>
            </Card.Body> </Card>)
        }
        const domContainer = document.querySelector('#comentarios' + rutaAux.fileName);
        if (commentarios.length === 0) {
            ReactDOM.render(<Card><Card.Body><Card.Title>{t('comment.noComments')}</Card.Title></Card.Body></Card>, domContainer);
        } else {
            console.log(commentarios)
            ReactDOM.render(commentarios, domContainer);

        }
    }

    render() {
        const {t} = this.props;
        return (
            <section>
                <Button variant="outline-success" onClick={() => this.openModal()} data-testid="button-open"
                        id={"button-open-" + this.route.name} block="lg" className={"mb-2"}>
                    {t('route.open')}
                </Button>
                <Modal visible={this.state.visible} width="75%" effect="fadeInDown"
                       onClickAway={() => this.closeModal()}>
                    <RouteContainer>
                        <Form>
                            <FullGridSize>
                                <h1 id={"route-title-" + this.route.name} className="text--white">{this.route.name}</h1>
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
                                    onClick={() => this.verMultimedia(this.route)}
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
                                    onClick={() => this.comments(this.route)}
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
                                            onClick={() => this.addComment(this.route)}
                                        >
                                            {t('comment.add')}
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl aria-describedby="basic-addon1" onChange={this.handleCommentChange}
                                                 data-testid="input-add-comment"
                                                 id={"input-comentario" + this.route.fileName}/>
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