import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Button, SelectPicker, Uploader } from 'rsuite';
import { Grid } from '@mui/material';

const PlantDiseasesPage = () => {
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const [fileName, setFileName] = useState('Выберите файл');
    const [filePlant, setFilePlant] = useState(null);
    const data = ['Кукуруза', 'Подсолнечник', 'Соя'].map((item) => ({ label: item, value: item }));

    return (
        <div>
            <MainCard
                title="Болезни растений"
                subheader="На этой странице вы можете загрузить фотографию растения и проверить его на наличие болезней"
            >
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Uploader
                            action={''}
                            fileListVisible={false}
                            accept="image/*"
                            listType="picture-text"
                            onUpload={(file) => {
                                previewFile(file.blobFile, (value) => {
                                    setFilePlant(value);
                                });
                            }}
                            draggable
                        >
                            <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {!filePlant ? (
                                    <span>Click or Drag files to this area to upload</span>
                                ) : (
                                    <img style={{ maxWidth: '300px', maxHeight: '400px' }} src={filePlant} alt="" />
                                )}
                            </div>
                        </Uploader>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectPicker
                            locale={{ searchPlaceholder: 'Поиск', placeholder: 'Выберите культуру' }}
                            data={data}
                            style={{ width: 224 }}
                        />

                        <Button style={{ backgroundColor: 'rgb(109, 72, 184)' }} appearance="primary">
                            Проверить
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default PlantDiseasesPage;
