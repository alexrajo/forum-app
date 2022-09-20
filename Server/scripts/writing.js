const onPostSubmitted = (data) => {
    fetch(new Request("/api/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        body: JSON.stringify(data),
    })).then((response) => response.text()).then((postId) => {
        window.location.assign(`/reading/${postId}`);
    }).catch(console.error);
}

window.onload = () => {
    const form = document.getElementById("post-form");
    const titleInput = document.getElementById("title-input");
    const contentInput = document.getElementById("content-input");
    const authorNameInput = document.getElementById("author-name-input");
    
    if (form && titleInput && contentInput && authorNameInput) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            onPostSubmitted({title: titleInput.value, content: contentInput.value, authorname: authorNameInput.value})
        });
    }
}

