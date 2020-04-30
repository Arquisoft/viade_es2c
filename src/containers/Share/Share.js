import React, {Component} from "react";
import Modal from 'react-awesome-modal'
import {Form, FullGridSize, RouteContainer} from "./Share.style";
import Route from "../../utils/route/Route";
import {withTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import data from "@solid/query-ldflex";
import {useLDflexList} from "@solid/react";

type Props = {
    route: Route,
    t: Function,
    test: boolean
};

let friendsList = null;

class Share extends Component {

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

    async cargarAmigos(amigos) {
        const {t} = this.props;
        friendsList = [];
        for (let i = 0; i < amigos.length; i++) {
            let friend = amigos[i];

            const user = await data[friend];
            const nameLd = await user.vcard_fn;

            const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friend.toString();

            const imageLd = await user.vcard_hasPhoto;

            let image;
            if (imageLd && imageLd.value) {
                image = imageLd.value;
            } else {
                image = 'img/icon/empty-profile.svg';
            }

            friendsList.push(
                <li key={friend.toString()}>
                    <section>
                        <img alt={""} src={image}/>
                        <p>{name}</p>
                    </section>
                    <a href={friend}>{t("friends.profile")}</a>
                </li>
            );
        }
        return friendsList;
    }

    Elmer() {
        const {t} = this.props;
        const friends = useLDflexList('user.friends');
        let a = [];
        for (let i = 0; i < friends.length; i++) {
            //a.push(friends[i].value);
            a.push(
                //<Name src={"[" + friends[i].value + "]"}/>
                //friends[i].value
                <Button variant="outline-success" onClick={this.hola()}>{t('route.share')}</Button>
            )
        }
        return a;

    }

    hola(){

    }

    render() {
        const {t} = this.props;

        return (
            <section>
                <button data-testid="button-open" id={"button-open-" + this.route.name}
                        onClick={() => this.openModal()}> {t('route.share')}</button>
                <Modal visible={this.state.visible} width="75%" effect="fadeInDown"
                       onClickAway={() => this.closeModal()}>
                    <RouteContainer>
                        <Form>
                            <FullGridSize>
                                <this.Elmer />
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

export {Share};
export default withTranslation()(Share);