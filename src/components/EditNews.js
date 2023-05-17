import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiManager, getUser } from "../utils";

const apiManager = new ApiManager();

export async function editNewsLoader({ params: { id }}) {
    let user = null;

    const _2 = await getUser().then((u) => {
        user = u;
    })

    let news = null;

    const _1 = await apiManager.getArticle(id, user).then((data) => {
        news = data;
    })


    return { user: user, news: news };
}

export function EditNews() {
    const [isPending, setIsPending] = useState(false);
    const { user, news } = useLoaderData();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        
        const news_form = {
            title: e.target.id_title.value,
            content: e.target.id_content.value,
            is_published: e.target.id_is_published.value === "True" ? true : false
        }

        apiManager.updateNews(news.id, news_form.title, news_form.content, news_form.is_published, user).then((data) => {
            setIsPending(false);
            window.location.href = "/article/" + data.id;
        });
    }

    return (
        <Card style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
            <CardHeader title="Edit News" />

            <Box component="form" onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <TextField
                    required
                    id="id_title"
                    label="Title"
                    defaultValue={news.title}
                />
                <TextField
                    required
                    id="id_content"
                    label="Content"
                    defaultValue={news.content}
                />
                <TextField
                    id="id_is_published"
                    select
                    label="Is published"
                    defaultValue={news.is_published ? "True" : "False"}
                    SelectProps={{
                      native: true,
                    }}
                >
                    {
                        ["True", "False"].map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </TextField>
                { 
                    !isPending ?
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    :
                    <Button disabled type="submit" variant="contained" color="primary">
                        Saving...
                    </Button>
                }
            </Box>
        </Card>
    )
}