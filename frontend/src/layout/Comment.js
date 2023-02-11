import React from 'react';
import { Card, CardContent, CardHeader, Divider, Typography, Avatar } from '@mui/material';

export default function RecipeReviewCard({ data }) {
    return (
        <>
            <Card style={{ padding: 15 }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            {(data.user.first_name ? data.user.first_name[0] : data.user.username[0]) +
                                (data.user.last_name ? data.user.last_name[0] : '')}
                        </Avatar>
                    }
                    style={{ padding: 5 }}
                    title={
                        (data.user.first_name ? data.user.first_name : data.user.username) +
                        (data.user.last_name ? ' ' + data.user.last_name : '')
                    }
                    subheader={new Date(Date.parse(data.created)).toLocaleString()}
                />
                <CardContent style={{ padding: 5 }}>
                    <Typography variant="body2" component="p">
                        {data.message}
                    </Typography>
                </CardContent>
            </Card>
            <Divider variant="middle" />
        </>
    );
}
