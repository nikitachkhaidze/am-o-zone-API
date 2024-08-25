CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    img_url TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL CHECK (price > 0),
    quantity_in_stock INT DEFAULT 0
    size VARCHAR(50),
    color VARCHAR(50),
);

CREATE TABLE order (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    price NUMERIC(15, 2) NOT NULL CHECK (price > 0),
    address VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE SET NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE cart_product (
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    price NUMERIC(15, 2) NOT NULL CHECK (price > 0),
    PRIMARY KEY (cart_id, product_id),
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES cart (id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL
);

CREATE TABLE order_product (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    price NUMERIC(15, 2) NOT NULL CHECK (price > 0),
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES order (id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL
);

CREATE TABLE tag_product (
    tag_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (tag_id, product_id),
    CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL
);


