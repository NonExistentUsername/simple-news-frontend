import { Typography } from '@material-ui/core';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiManager } from "../utils";

const apiManager = new ApiManager();

export async function articleLoader ({ params}) {
    const article = await apiManager.getArticle(params.id).then((data) => {
        return { data };
    });
    return { article };
}

export function Article () {
    let { article }  = useLoaderData();
    article = article.data;

    const title = article.title;
    const content = article.content;
    const created_by = article.created_by;
    const created_at = article.created_at;
    

    return (
        <div>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2">{content}</Typography>
            <Typography variant="body2">{created_by}</Typography>
            <Typography variant="body2">{created_at}</Typography>
        </div>
    );
}
