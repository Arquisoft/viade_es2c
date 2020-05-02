import React from 'react';
import {Uploader} from '@inrupt/solid-react-components';
import {useTranslation} from 'react-i18next';
import {ImageWrapper, WelcomeCard, WelcomeLogo, WelcomeName, WelcomeProfile, WelcomeWrapper} from './welcome.style';
import {ImageProfile} from '@components';
import {errorToaster} from '@utils';
import {Carousel, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './carousel-css.css'


/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
    const {webId, image, updatePhoto, name} = props;
    const {t} = useTranslation();
    const limit = 2100000;
    return (
        <WelcomeWrapper data-testid="welcome-wrapper">
            <WelcomeCard className="card mx-2 my-auto">
                <Carousel className={"h-100 w-100 mh-80 d-inline-block"} wrap={true}
                          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon"/>}
                          prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon"/>}
                >
                    <Carousel.Item>
                        <Container fluid={"sm"}>
                            <Row>
                                <WelcomeLogo data-testid="welcome-logo">
                                    <img src="img/logo.svg" alt="Viade" height="50%"/>
                                </WelcomeLogo>
                                <WelcomeProfile data-testid="welcome-profile">
                                    <h3>
                                        {t('welcome.welcome')}, <WelcomeName>{name}</WelcomeName>
                                    </h3>
                                    <ImageWrapper>
                                        <Uploader
                                            {...{
                                                fileBase: webId && webId.split('/card')[0],
                                                limitFiles: 1,
                                                limitSize: limit,
                                                accept: 'jpg,jpeg,png',
                                                errorsText: {
                                                    sizeLimit: t('welcome.errors.sizeLimit', {
                                                        limit: `${limit / 1000000}Mbs`
                                                    }),
                                                    unsupported: t('welcome.errors.unsupported'),
                                                    maximumFiles: t('welcome.errors.maximumFiles')
                                                },
                                                onError: error => {
                                                    if (error && error.statusText) {
                                                        errorToaster(error.statusText, t('welcome.errorTitle'));
                                                    }
                                                },
                                                onComplete: uploadedFiles => {
                                                    updatePhoto(
                                                        uploadedFiles[uploadedFiles.length - 1].uri,
                                                        t('welcome.uploadSuccess'),
                                                        t('welcome.successTitle')
                                                    );
                                                },
                                                render: props => (
                                                    <ImageProfile
                                                        {...{
                                                            ...props,
                                                            webId,
                                                            photo: image,
                                                            text: t('welcome.upload'),
                                                            uploadingText: t('welcome.uploadingText')
                                                        }}
                                                    />
                                                )
                                            }}
                                        />
                                    </ImageWrapper>
                                </WelcomeProfile>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container className={"mh-80 mx-auto"}>
                            <Row>
                                <h1 className={"mx-auto text-success"}>COVID-19</h1>
                            </Row>
                            <Row className={"mb-3 mx-auto"}>
                                <h2 className={"mx-auto"}>{t('covid.carefull')}</h2>
                            </Row>
                            <Row className={"mh-80 mx-auto"}>
                                <p className={"mx-auto"}> {t('covid.tip')}</p>
                            </Row>
                            <Row className={"mh-80 mx-auto"}>
                                <p className={"mx-auto"}> {t('covid.tip1')}</p>
                            </Row>
                            <Row className={"mh-80 mx-auto"}>
                                <p className={"mx-auto"}> {t('covid.tip2')}</p>
                            </Row>
                            <Row className={"mh-80 mx-auto"}>
                                <p className={"mx-auto"}> {t('covid.tip3')}</p>
                            </Row>

                        </Container>
                    </Carousel.Item>
                </Carousel>
            </WelcomeCard>
        </WelcomeWrapper>
    );
};
