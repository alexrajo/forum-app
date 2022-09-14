BEGIN;

SET client_encoding = "LATIN1";

CREATE TABLE posts (
    post_id INTEGER GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(20),
    content VARCHAR(300),
    authorname VARCHAR(20),
    PRIMARY KEY(post_id)
);

INSERT INTO posts (title, content, authorname) VALUES ("Test1", "This post is a test post!", "TestUsername1");
INSERT INTO posts (title, content, authorname) VALUES ("Test2", "This post is a test post!", "TestUsername2");
INSERT INTO posts (title, content, authorname) VALUES ("Test3", "This post is a test post!", "TestUsername3");

COMMIT;