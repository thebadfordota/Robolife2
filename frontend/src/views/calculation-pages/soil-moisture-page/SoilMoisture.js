import React from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, Grid, Paper, Typography } from '@mui/material';
import watermarkSensorDavis from 'assets/images/sensors/WaterMarkkSensor_Davis.jpg';

const SoilMoisture = () => {
    return (
        <MainCard title="Продуктивная влага в почве">
            <Box>
                <Typography component="span">
                    <Typography paragraph={true}>
                        Часть почвенной влаги, используемой растением в процессе жизнедеятельности, синтеза органического вещества и
                        формирования урожая, называют <b>продуктивной влагой</b>.
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
                    ρ — объемная масса почвы, г/см3;
                    <br />
                    h — слой почвы, см;
                    <br />W — влажность почвы, % массы абсолютно сухой почвы;
                    <br />К — влажность устойчивого завядания, % массы абсолютно сухой почвы.
                </Typography>

                <Typography paragraph={true}>
                    Входящие в эту формулу величины плотности почвы (ρ) и влажности устойчивого завядания (К) постоянны для конкретной почвы
                    и практически не изменяются при изменении влажности почвы. Исходя их этого, их можно измерить в лаборатории один раз.
                    Или же производить расчеты, например, раз в сезон.
                </Typography>
                <Typography paragraph={true}>
                    Для параметра влажности (W) необходимо использовать показания специального датчика, расположенного на определенной
                    глубине.
                    <br />
                    <br />
                </Typography>
                <Typography paragraph={true} variant="h4">
                    Датчик влажности почвы Watermark
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper>
                            <Typography paragraph={true}>
                                <br />
                                Преимущества:
                            </Typography>
                            <Typography paragraph={true}> — Каждая станция iMETOS оборудована специальным входом для watermark</Typography>
                            <Typography paragraph={true}>
                                — Определение уровня влажности почвы на основании значения «всасывающего давления почвы
                            </Typography>
                            <Typography paragraph={true}>
                                — Стенка цилиндра датчика Watermark (диаметр: 22 мм, длина: 76 мм) является полупроницаемой (пропускает
                                только воду); внутри цилиндра находятся два изолированных электрических контакта и вещество (гипс),
                                всасывающее влагу из почвы; если внутренняя всасывающая сила датчика больше, чем в почве, то он всасывает
                                воду, если всасывающая сила почвы больше, то датчик отдает воду; всасывающая сила (всасывающее давление
                                почвы, водный потенциал) измеряется в сантибарах
                            </Typography>
                            <Typography paragraph={true}>
                                — Датчик не требует обслуживания (просто закопайте его на желательной глубине); идеально подходит для
                                использования в легкой и средне-тяжелой почвах; может безотказно работать на протяжении многих лет
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Paper>
                            <img width="100%" src={watermarkSensorDavis} alt="Датчик влажности почвы Watermark" />

                            {/*<img width="95%" src={watermarkSensorDavis} alt="Датчик влажности почвы Watermark" />*/}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
};

export default SoilMoisture;
