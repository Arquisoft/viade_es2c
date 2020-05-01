/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from 'react';
import {withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SelectorCard, SelectorOption, SelectorWrapper} from "./RouteSelector.style";
import {Button} from "react-bootstrap";


type Props = {webId: String};

function goTo(path) {
    window.location.href=path;
}

const CreateRouteSelector = ({ webId }: Props) => {
    const { t } = useTranslation();

    return (
        <SelectorWrapper data-testid="selector-wrapper">
            <SelectorCard className="card">
                <SelectorOption data-testid="selector-option-parsers">
                    <h3>{t('createRoute.archive')}</h3>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroutefile')}
                        data-testid="goTo-file"
                    >
                        {t('createRoute.here')}
                    </Button>
                </SelectorOption>
                <SelectorOption data-testid="selector-option-map">
                    <h3>{t('createRoute.map')}</h3>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroute')}
                        data-testid="goTo-map"
                    >
                        {t('createRoute.here')}
                    </Button>
                </SelectorOption>
            </SelectorCard>
        </SelectorWrapper>
    );

};

export default withRouter (CreateRouteSelector);