import React from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, Grid, Typography } from '@mui/material';

const SoilMoisture = () => {
    return (
        <MainCard title="Доступная влага в почве">
            <Box>
                <Typography component="span">
                    <Typography paragraph={true}>
                        Часть почвенной влаги, используемой растением в процессе жизнедеятельности, синтеза органического вещества и
                        формирования урожая, называют продуктивной влагой.
                    </Typography>
                    <Typography paragraph={true}>
                        Влагу выражают высотой слоя воды в миллиметрах, что позволяет сопоставлять ее запасы с расходом воды (испарением) и
                        ее приходом (осадками), которые также измеряют в миллиметрах.
                    </Typography>
                </Typography>

                <Typography paragraph={true} align="center" component="h2" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Wпр = 0.1ρh(W-K)
                </Typography>
                <Typography paragraph={true}>
                    где 0,1 — коэффициент для перевода запасов влаги в миллиметры;
                    <br />
                    р — объемная масса почвы, г/см3;
                    <br />
                    h — слой почвы, см;
                    <br />W — влажность почвы, % массы абсолютно сухой почвы;
                    <br />К — влажность устойчивого завядания, % массы абсолютно сухой почвы.
                </Typography>

                <Typography paragraph={true}>
                    Входящие в эту формулу величины плотности почвы и влажности устойчивого завядания постоянны для данной конкретной почвы
                    и практически не изменяются при изменении влажности почвы.
                </Typography>
                <Typography paragraph={true}>
                    Для остальных параметров мы можем использовать показания датчиков на метеостанциях.{' '}
                    <b>Какие же датчики понадобятся? </b>
                </Typography>
            </Box>
        </MainCard>
    );
};

export default SoilMoisture;
