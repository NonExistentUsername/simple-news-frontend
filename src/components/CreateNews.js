import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiManager, getUser } from "../utils";

const apiManager = new ApiManager();

export async function createNewsLoader() {
    let user = null;

    const _ = await getUser().then((u) => {
        user = u;
    })

    return { user };
}

export function CreateNews() {
    const [isPending, setIsPending] = useState(false);
    const { user } = useLoaderData();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        
        const news = {
            title: e.target.id_title.value,
            content: e.target.id_content.value,
            is_published: e.target.id_is_published.value === "True" ? true : false
        }

        apiManager.createNews(news.title, news.content, news.is_published, user).then((data) => {
            setIsPending(false);
            window.location.href = "/article/" + data.id;
        });
    }

    return (
        <Card style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
            <CardHeader title="Add a New News" />

            <Box component="form" onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <TextField
                    required
                    id="id_title"
                    label="Title"
                    defaultValue=""
                />
                <TextField
                    required
                    id="id_content"
                    label="Content"
                    defaultValue=""
                />
                <TextField
                    id="id_is_published"
                    select
                    label="Is published"
                    defaultValue="False"
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
                        Add News
                    </Button>
                    :
                    <Button disabled type="submit" variant="contained" color="primary">
                        Adding News...
                    </Button>
                }
            </Box>
        </Card>

        // <div className="create">
        //     <h2>Add a New News</h2>
        //     <form onSubmit={handleSubmit}>
        //         <label>News title:</label>
        //         <input
        //             type="text"
        //             required
        //             value={title}
        //             onChange={(e) => setTitle(e.target.value)}
        //         />
        //         <label>News content:</label>
        //         <textarea
        //             required
        //             value={content}
        //             onChange={(e) => setContent(e.target.value)}
        //         ></textarea>
        //         <label>News author:</label>
        //         <select
        //             value={author}
        //             onChange={(e) => setAuthor(e.target.value)}
        //         >
        //             <option value="mario">Mario</option>
        //             <option value="yoshi">Yoshi</option>
        //         </select>
        //         {!isPending && <button>Add News</button>}
        //         {isPending && <button disabled>Adding News...</button>}
        //     </form>
        // </div>
    )
}