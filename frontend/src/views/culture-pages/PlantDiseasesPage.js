import React, { useRef, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Button, Message, SelectPicker, Uploader } from 'rsuite';
import { Grid } from '@mui/material';
import { CULTURE_NAME, DISEASES_NAME, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';

const PlantDiseasesPage = () => {
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const [culture, setCulture] = useState();
    const [file, setFile] = useState([]);
    const [filePlant, setFilePlant] = useState(null);
    const data = [
        { label: CULTURE_NAME['Corn'], value: 'Corn' },
        { label: CULTURE_NAME['Sunflower'], value: 'Sunflower' },
        { label: CULTURE_NAME['Soy'], value: 'Soy' },
        { label: CULTURE_NAME['Wheat'], value: 'Wheat' }
    ];
    const [state, setState] = useState({ disease: 'healthy', chance: 0 });

    const uploader = useRef();
    var type_message = 'info';
    return (
        <div>
            <MainCard
                title="Болезни растений"
                subheader="На этой странице вы можете загрузить фотографию растения и проверить его на наличие болезней"
            >
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Uploader
                            action={ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.neural_network_url}
                            autoUpload={false}
                            draggable
                            fileList={file}
                            fileListVisible={false}
                            accept="image/*"
                            name="image"
                            data={{ agriculture_name: culture }}
                            headers={{ Authorization: 'Bearer ' + localStorage.getItem('token') }}
                            onChange={(fileList) => {
                                setFile([fileList[fileList.length - 1]]);
                                previewFile(fileList[fileList.length - 1].blobFile, (value) => {
                                    setFilePlant(value);
                                });
                            }}
                            onUpload={(file) => {
                                console.log(file);
                            }}
                            onSuccess={(response) => {
                                let st = { ...state };
                                Object.entries(response).map((entry) => {
                                    console.log(entry[1], st.chance, entry[1] > st.chance);
                                    entry[1] > st.chance
                                        ? (st = {
                                              disease: entry[0],
                                              chance: entry[1]
                                          })
                                        : null;
                                });
                                setState({ ...st });
                            }}
                            ref={uploader}
                        >
                            <div
                                style={{
                                    height: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {!filePlant ? (
                                    <span>Нажмите или перетащите файлы в эту область, чтобы загрузить</span>
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
                            value={culture}
                            onChange={setCulture}
                        />

                        <Button
                            style={{ backgroundColor: 'rgb(109, 72, 184)' }}
                            appearance="primary"
                            onClick={() => {
                                uploader.current.start();
                                setFilePlant(null);
                            }}
                        >
                            Проверить
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Message type={state.disease === 'healthy' ? 'info' : 'error'}>
                            {DISEASES_NAME[state.disease]} с вероятностью {state.chance}
                        </Message>
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default PlantDiseasesPage;
