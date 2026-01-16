import { useState } from "react";

function AddMoviePage() {
    const [title, setTitle] = useState<string>('');
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !thumbnail || !video) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("thumbnail", thumbnail);
        formData.append("video", video);

        const res = await fetch("/api/movies/add", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Movie added!");
            setTitle("");
            setThumbnail(null);
            setVideo(null);
        } else {
            alert("Failed to add movie");
        }
    };

    return (
        <div className="container">
            <h1 className="mb-5">Neuen Film hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="fs-4">Titel des Films</label>
                    <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-5">
                    <label className="fs-4">Thumbnail</label>
                    <input type="file" className="form-control" onChange={e => setThumbnail(e.target.files?.[0] ?? null)} required />
                </div>
                <div className="mb-5">
                    <label className="fs-4">Video</label>
                    <input type="file" className="form-control" onChange={e => setVideo(e.target.files?.[0] ?? null)} required />
                </div>
                <button className="btn btn-primary" type="submit">Film hinzufügen</button>
            </form>
        </div>
    );
}

export default AddMoviePage;
