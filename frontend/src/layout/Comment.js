import React from 'react';
import { Card, CardContent, CardHeader, Divider, Typography, Avatar, IconButton } from '@mui/material';
export default function RecipeReviewCard() {
    return (
        <>
            <Card style={{ padding: 15 }}>
                <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    style={{ padding: 5 }}
                    title="Имя пользователя"
                    subheader="Дата публикации комментария"
                />
                <CardContent style={{ padding: 5 }}>
                    <Typography variant="body2" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
                        peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
            </Card>
            <Divider variant="middle" />
        </>
    );
}
