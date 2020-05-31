export default class Likes {
    constructor() {
        this.likes = [];
    }

    // Add Like to state
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();
        return like;
    }

    // Delete Like from state
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in localStorage
        this.persistData();

    }

    // Check if this recipe is liked or not
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Get number of likes
    getNumLikes() {
        return this.likes.length;
    }

    // Save likes state to localStorage
    persistData() {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }

    // Read like from localStorage to use in UI
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("likes"));

        // Restore likes from the localStorage
        if (storage) this.likes = storage;
    }
}