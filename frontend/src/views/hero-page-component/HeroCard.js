import React from 'react';
import '../../../src/assets/scss/hero-page.scss';
import hero from 'assets/images/hero-card/hero-page_fullhero.png';
import { Button } from 'rsuite';
import GithubIcon from '@rsuite/icons/legacy/Github';

const HeroCard = () => {
    return (
        <div className="title-block">
            <div className="title-block__wrapper">
                <div className="title-block__info">
                    <div className="title-block__title">Robolife2 for AgroI.Meteo</div>
                    <div className="title-block__text text">
                        Проект команды Robolife2 в рамках конкурса «Создание интеллектуальной системы помощи агроному» -
                        «AgroIntelligence.Meteo»
                    </div>
                    <div className="title-block__button-wrapper">
                        <Button onClick={() => window.open('https://github.com/thebadfordota/Robolife2')} color="blue" appearance="primary">
                            <GithubIcon /> GitHub
                        </Button>
                    </div>
                </div>
                <img src={hero} alt="" className="title-block__img" />
            </div>
        </div>
    );
};

export default HeroCard;
