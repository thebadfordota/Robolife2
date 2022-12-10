import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import styles from './Profile.module.scss';
import Avatar from '../../ui-component/extended/Avatar';
import { Grid, TextField } from '@mui/material';

const Profile = () => {
    return (
        <div>
            <MainCard title="Профиль" className={styles.profileCard}>
                <Grid container>
                    <Grid item>
                        <Avatar className={styles.avatar}>ИИ</Avatar>
                    </Grid>
                    <Grid item>
                        <h5>Личные данные</h5>
                        <TextField
                            style={{ cursor: 'pointer' }}
                            className={styles.textField}
                            required
                            id="last-name"
                            label="Фамилия"
                            value={'Иванов'}
                            disabled
                        />
                        <TextField disabled className={styles.textField} required id="first-name" label="Имя" value={'Иван'} />
                        <TextField disabled className={styles.textField} required id="patronymic" label="Отчество" value={'Иванович'} />

                        <h5 className={styles.h5}>Данные авторизации</h5>
                        <TextField disabled className={styles.textField} required id="login" label="Логин" value={'ivanov'} />
                        <TextField disabled className={styles.textField} id="email" label="Email" value={'ivan_ivanov@mock.data.ru'} />
                        <TextField disabled className={styles.textField} id="phone" label="Номер телефона" value={'+79000000000'} />
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default Profile;
