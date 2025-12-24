CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  


INSERT INTO users (name, email, password) VALUES 
    ('John Doe', 'john@gmail.com', 'pass123'), 
    ('Jane', 'jane@gmail.com', 'pass1234');