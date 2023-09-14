CREATE DATABASE sts;
CREATE USER bubbles WITH PASSWORD 'bubbles';
ALTER DATABASE sts OWNER TO bubbles;
ALTER ROLE bubbles SET client_encoding TO 'utf8';
ALTER ROLE bubbles SET default_transaction_isolation TO 'read committed';
ALTER ROLE bubbles SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON SCHEMA public TO bubbles;
