BEGIN;


CREATE TABLE IF NOT EXISTS public.complaint_feedback
(
    types character varying(30) COLLATE pg_catalog."default" NOT NULL,
    category character varying(30) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id serial NOT NULL,
    CONSTRAINT complaint_feedback_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.customers
(
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    floor integer NOT NULL,
    rented_area double precision NOT NULL,
    contract_expired_time date,
    contact_person character varying(40) COLLATE pg_catalog."default",
    contact_number character varying(20) COLLATE pg_catalog."default",
    director_name character varying(40) COLLATE pg_catalog."default",
    director_phone_number character varying(20) COLLATE pg_catalog."default",
    id serial NOT NULL,
    CONSTRAINT customers_pkey PRIMARY KEY (id),
    CONSTRAINT customers_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.orders
(
    order_date date NOT NULL,
    category character varying(30) COLLATE pg_catalog."default" NOT NULL,
    observator character varying(40) COLLATE pg_catalog."default",
    observator_phone_number character varying(20) COLLATE pg_catalog."default",
    floor integer NOT NULL,
    lift_required character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    id serial NOT NULL,
    customer_id integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default",
    "time" character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.properties
(
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    category character varying(30) COLLATE pg_catalog."default" NOT NULL,
    numbers integer NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    id serial NOT NULL,
    CONSTRAINT properties_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.technical_issues
(
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    category character varying(30) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    id serial NOT NULL,
    customer_id integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT technical_issues_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(300) COLLATE pg_catalog."default" NOT NULL,
    authentication character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(40) COLLATE pg_catalog."default",
    phone_number character varying(20) COLLATE pg_catalog."default",
    identification character varying(20) COLLATE pg_catalog."default",
    customer_id integer,
    CONSTRAINT users_pkey PRIMARY KEY (email)
);

ALTER TABLE IF EXISTS public.complaint_feedback
    ADD CONSTRAINT complaint_feedback_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT customer_id FOREIGN KEY (customer_id)
    REFERENCES public.customers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.technical_issues
    ADD CONSTRAINT technical_issues_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES public.customers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT users_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES public.customers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;