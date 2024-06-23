const { Sequilize } = require('sequelize');
const db = require('../../models'); 


async function bulkInsert() {

    await db.sequelize.query(`
        INSERT INTO "static_content"."language" ("language_id", "language_code", "language_name")
        VALUES
        (1, 'PT', 'Portuguese'),
        (2, 'ES', 'Spanish'),
        (3, 'FR', 'French')
        ON CONFLICT (language_id) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."area" ("area_id", "title") 
        VALUES
        (100, 'Health'),
        (200, 'Education'),
        (300, 'Sports'),
        (400, 'Gastronomy'),
        (500, 'Housing'),
        (600, 'Leisure'),
        (700, 'Transportation')
        ON CONFLICT (area_id) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (1001, 100, 'Hospitals'),
        (1002, 100, 'Clinics'),
        (1003, 100, 'Pharmacies')
        ON CONFLICT (sub_area_id) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (2001, 200, 'Schools'),
        (2002, 200, 'Colleges'),
        (2003, 200, 'Libraries')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (3001, 300, 'Gyms'),
        (3002, 300, 'Stadiums'),
        (3003, 300, 'Parks')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (4001, 400, 'Restaurants'),
        (4002, 400, 'Cafes'),
        (4003, 400, 'Bars')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (5001, 500, 'Apartments'),
        (5002, 500, 'Villas'),
        (5003, 500, 'Dormitories')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (6001, 600, 'Cinemas'),
        (6002, 600, 'Theaters'),
        (6003, 600, 'Amusement Parks')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area" ("sub_area_id", "area_id", "title") 
        VALUES
        (7001, 700, 'Buses'),
        (7002, 700, 'Trains'),
        (7003, 700, 'Airports'),
        (7004, 700, 'Hitchride')
        ON CONFLICT (sub_area_id) DO NOTHING;;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."area_content" ("area_id", "language_id", "translated_title")
        VALUES
        (100, 1, 'Saúde'),
        (100, 3, 'Santé'),
        (200, 1, 'Educação'),
        (200, 3, 'Éducation'),
        (300, 1, 'Desportos'),
        (300, 2, 'Esportes'),
        (400, 1, 'Gastronomia'),
        (400, 3, 'Gastronomie'),
        (500, 1, 'Habitação'),
        (500, 3, 'Logement'),
        (600, 1, 'Lazer'),
        (600, 3, 'Loisirs'),
        (700, 2, 'Transporte'),
        (700, 3, 'Transport')
        ON CONFLICT (translated_title) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "static_content"."sub_area_content" ("sub_area_id", "language_id", "translated_title")
        VALUES
        (1001, 1, 'Hospitais'),
        (1001, 3, 'Hôpitaux'),
        (1002, 1, 'Clínicas'),
        (1002, 3, 'Cliniques'),
        (1003, 1, 'Farmácias'),
        (1003, 3, 'Pharmacies'),
        (2001, 1, 'Escolas'),
        (2001, 3, 'Écoles'),
        (3001, 1, 'Ginásios'),
        (3001, 3, 'Gymnases'),
        (4001, 1, 'Restaurantes'),
        (4001, 3, 'Restaurants'),
        (5001, 1, 'Apartamentos'),
        (5001, 3, 'Appartements'),
        (6001, 1, 'Cinemas'),
        (6001, 3, 'Cinémas'),
        (7001, 1, 'Autocarro'),
        (7001, 3, 'Bus'),
        (7002, 1, 'Comboios'),
        (7002, 3, 'Trains'),
        (7003, 1, 'Aeroportos'),
        (7003, 3, 'Aéroports')
        ON CONFLICT (translated_title) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "hr"."users" ("first_name", "last_name", "email", "join_date", "role_id")
        VALUES 
        ('John', 'Doe', 'john.doe@example.com', '2023-01-15', 1),
        ('Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', 2),
        ('Emily', 'Johnson', 'emily.johnson@example.com', '2023-03-25', 2),
        ('Michael', 'Brown', 'michael.brown@example.com', '2023-04-30', 2),
        ('Sarah', 'Davis', 'sarah.davis@example.com', '2023-05-15', 2),
        ('David', 'Miller', 'david.miller@example.com', '2023-06-10', 1),
        ('Linda', 'Wilson', 'linda.wilson@example.com', '2023-07-05', 1),
        ('James', 'Moore', 'james.moore@example.com', '2023-08-01', 2),
        ('Barbara', 'Taylor', 'barbara.taylor@example.com', '2023-09-10', 1),
        ('Richard', 'Anderson', 'richard.anderson@example.com', '2023-10-20', 1),
        ('Guilhermo', 'Pedrinho', 'pv25215@alunos.estgv.ipv.pt', '2024-06-22', 3),
        ('Jose', 'Machado', 'pv26900@alunos.estgv.ipv.pt', '2024-06-22', 3),
        ('Tio', 'Patinhas', 'tio.patinhas@examples.com', '2024-06-22', 3),
        ('CENTRAL', 'ADMIN', 'god@example.com', '2023-01-15', 3)
        ON CONFLICT (email) DO NOTHING;
    `);
    await db.sequelize.query(`
        INSERT INTO "user_interactions"."user_actions_log" ("user_id", "action_type", "action_description", "action_date")
        VALUES
        (1, 'Login', 'User logged in', '2023-01-15 08:00:00'),
        (2, 'View', 'User viewed dashboard', '2023-02-20 09:00:00'),
        (3, 'Edit', 'User edited profile', '2023-03-25 10:00:00'),
        (4, 'Logout', 'User logged out', '2023-04-30 11:00:00'),
        (5, 'Login', 'User logged in', '2023-05-15 08:30:00'),
        (6, 'View', 'User viewed reports', '2023-06-10 09:30:00'),
        (7, 'Edit', 'User edited settings', '2023-07-05 10:30:00'),
        (8, 'Logout', 'User logged out', '2023-08-01 11:30:00'),
        (9, 'Login', 'User logged in', '2023-09-10 08:15:00'),
        (10, 'View', 'User viewed notifications', '2023-10-20 09:15:00');
    `);
    await db.sequelize.query(`
        INSERT INTO "security"."user_account_details" ("user_id", "account_status", "account_restriction")
        VALUES
        (1, true, false),
        (2, true, false),
        (3, false, false),
        (4, true, true),
        (5, true, false),
        (6, false, true),
        (7, true, false),
        (8, false, false),
        (9, true, false),
        (10, true, true)
        ON CONFLICT (user_id) DO NOTHING;
    `);
    
    await db.sequelize.query(`
        INSERT INTO "centers"."office_admins" ("office_id", "manager_id")
        VALUES
        (0, 11),
        (0, 12),
        (0, 13),
        (1, 14),
        (2, 14),
        (3, 14),
        (4, 14),
        (5, 14),
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 5),
        (5, 8)
        ON CONFLICT ("office_id", "manager_id") DO NOTHING;    
    `);
    await db.sequelize.query(`
        INSERT INTO "centers"."office_workers" ("office_id", "user_id")
        VALUES
        (0, 11),
        (0, 12),
        (0, 13),
        (1, 14),
        (2, 14),
        (3, 14),
        (4, 14),
        (5, 14),
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 5),
        (5, 8),
        (1, 1),
        (2, 6),
        (3, 7),
        (4, 9),
        (4, 10)
        ON CONFLICT ("office_id", "user_id") DO NOTHING;  
    `);
    await db.sequelize.query(`
        INSERT INTO "user_interactions"."user_pref" ("user_id", "areas", "sub_areas", "receive_notifications", "language_id")
        VALUES
        (1, '[100,200]', '[1001,2001]', true, 1),
        (2, '[300,400]', '[3001,4001]', true, 2),
        (3, '[500,600]', '[5001,6001]', false, 3),
        (4, '[700,400]', '[7001,2001]', true, 1),
        (5, '[500,100]', '[2001,4001]', false, 1),
        (6, '[100,300]', '[1001,3001]', true, 1),
        (7, '[200,400]', '[2001,4001]', false, 2),
        (8, '[500,200]', '[5001,7001]', true, 2),
        (9, '[600,100]', '[6001,3001]', false, 3),
        (10, '[500,100]', '[2001,1001]', true, 3)
        ON CONFLICT ("user_id") DO NOTHING; 
    `);
    await db.sequelize.query(`
        INSERT INTO "dynamic_content"."posts" ("sub_area_id", "office_id", "publisher_id", "title", "content", "creation_date")
        VALUES
        (1001, 1, 2, 'CUF', 'This is a description',CURRENT_TIMESTAMP),
        (2002, 2, 3, 'ESTGV', 'I have finally finished my degree!!',CURRENT_TIMESTAMP),
        (3001, 3, 4, 'Best Gyms in Fundão', 'Link to article: ',CURRENT_TIMESTAMP),
        (5001, 4, 6, 'One Bedroom', 'One bedroom apartment in the center of the city for rent',CURRENT_TIMESTAMP),
        (6001, 1, 7, 'Cinemas', 'Forum Viseu is going to display Star Wars the original trilogy',CURRENT_TIMESTAMP),
        (7001, 2, 8, 'Flixbus Strike', 'On the 9th of August, flixbus will be on strike',CURRENT_TIMESTAMP),
        (6003, 3, 9, 'Ottieland', 'Ottieland returns for one more year',CURRENT_TIMESTAMP),
        (4003, 4, 10, 'Capuchinho', 'Capuchinho bakery turns 75 years old',CURRENT_TIMESTAMP),
        (3002, 2, 1, 'Stadium 1º de Maio', 'The 1º de Maio stadium hosts the final of the junior league',CURRENT_TIMESTAMP);
    `);
    await db.sequelize.query(`
        INSERT INTO "dynamic_content"."posts" ("sub_area_id", "office_id", "publisher_id", "title", "content", "type", "creation_date")
        VALUES
        (4002, 4, 5, 'Neon Byte Bistro', 'Restaurant with a cyberpunk theme', 'P',CURRENT_TIMESTAMP);
    `);
    await db.sequelize.query(`
        INSERT INTO "dynamic_content"."events" ("publisher_id", "office_id", "subarea_id", "name", "description", "event_date", "recurring","creation_date")
        VALUES
        (1, 1, 1001, 'Volunteering', 'Viseu hospital will be hosting an auction to gain funding for children in need', '2023-11-15', false,CURRENT_TIMESTAMP),
        (2, 2, 2001, 'Marathon', 'Next Friday Alves Martins school will host a marathon in support of cancer', '2023-12-01', false,CURRENT_TIMESTAMP),
        (3, 3, 3002, 'Football tournament', 'Every Sunday we will be playing football until the end of the tournament', '2023-12-10', false,CURRENT_TIMESTAMP),
        (4, 2, 4003, 'Rafael Mariano Live', 'Rafael Mariano will be hosting a live show in Old School Bar','2023-12-31', false,CURRENT_TIMESTAMP),
        (5, 5, 6002, 'The Lord Of the Rings live', 'Altice Arena will be playing the OST of The Lord of the Rings with the movie', '2024-01-05', false,CURRENT_TIMESTAMP),
        (6, 1, 4001, 'Company dinner', 'We are celebrating a closed deal and will be having dinner at Arouquesa', '2024-01-15', false,CURRENT_TIMESTAMP),
        (7, 2, 2003, 'Live Reading', 'The library will be having a live reading directed to children', '2024-01-25', false,CURRENT_TIMESTAMP),
        (8, 3, 1002, 'Donate Blood', 'Local pharmacy will be collecting blood for charity purposes', '2024-02-05', false,CURRENT_TIMESTAMP),
        (9, 4, 2002, 'Tecnico Open Day', 'Técnico will open its doors for everyone', '2024-02-15', false,CURRENT_TIMESTAMP),
        (10, 5, 3001, 'Workout competition', 'Fitness hut is opening a tournament and the prize is a free membership for a year', '2024-03-01', false,CURRENT_TIMESTAMP);
    `);
    await db.sequelize.query(`
        INSERT INTO "dynamic_content"."forums" ("publisher_id", "office_id", "sub_area_id", "title", "content","creation_date")
        VALUES
        (1, 1, 4002, 'Coffee Shops', 'Can someone recommend coffee shops with a "hippie" vibe?',CURRENT_TIMESTAMP),
        (2, 2, 2002, 'Best colleges in the country?', 'Trying to get a new degree in a new school, what are the best options',CURRENT_TIMESTAMP),
        (3, 3, 4001, 'Anniversary Dinner', 'Want to take my SO somewhere nice, what do you guys recommend?',CURRENT_TIMESTAMP),
        (4, 4, 6001, 'Top 3 movies', 'Tell me your top 3 movies of all time. Mine are 1.Return of the king 2.Blade Runner 1982 3. Hacksaw Ridge',CURRENT_TIMESTAMP),
        (5, 5, 3003, 'Parks to walk the dog?', 'Need a good park to walk my dog. Any recommendations',CURRENT_TIMESTAMP),
        (6, 1, 7004, 'Need a lift', 'Need a lift to my house in UnicornLand, can someone give me a lift?',CURRENT_TIMESTAMP),
        (7, 2, 7003, 'Airplane ticket', 'I bought these airplane tickets, does anyone want them?',CURRENT_TIMESTAMP),
        (8, 3, 4002, 'Baking a red velvet', 'I am having a hard time in the 3rd step of the mixture of the ingredients, can someone help me?',CURRENT_TIMESTAMP),
        (9, 4, 5001, 'Looking for a studio', 'Does anyone know a good landlord who rents studios at an affordable price and good conditions?',CURRENT_TIMESTAMP),
        (10, 5, 1002, 'Need counseling', 'I am looking for a good psychologist for my oldest son, does anyone have a recommendation? Thank you all!',CURRENT_TIMESTAMP);
    `);
    await db.sequelize.query(`
        INSERT INTO "user_interactions"."notifications" ("user_id", "event_id", "post_id", "notification_text","create_date")
        VALUES
        (1, 1, NULL, 'You have a new event: Volunteering.',CURRENT_TIMESTAMP),
        (2, 2, NULL, 'You have a new event: Marathon.',CURRENT_TIMESTAMP),
        (3, 3, NULL, 'You have a new event: Football tournament.',CURRENT_TIMESTAMP),
        (4, 4, NULL, 'You have a new event: Rafael Mariano Live.',CURRENT_TIMESTAMP),
        (5, 5, NULL, 'You have a new event: The Lord Of the Rings live.',CURRENT_TIMESTAMP),
        (6, 6, NULL, 'You have a new event: Company dinner.',CURRENT_TIMESTAMP),
        (7, 7, NULL, 'You have a new event: Live Reading.',CURRENT_TIMESTAMP),
        (8, 8, NULL, 'You have a new event: Donate Blood.',CURRENT_TIMESTAMP),
        (9, 9, NULL, 'You have a new event: Tecnico Open Day.',CURRENT_TIMESTAMP),
        (10, 10, NULL, 'You have a new event: Workout competition.',CURRENT_TIMESTAMP);
    `);
    await db.sequelize.query(`
        INSERT INTO "forms"."default_fields" ("field_id","field_name", "field_type", "field_value")
        VALUES
        (1,'First Name', 'Text', ''),
        (2,'Last Name', 'Text', ''),
        (3,'Age', 'Int', '0'),
        (4,'Date of Birth', 'Date', '1970-01-01'),
        (5,'Gender', 'Check Box', 'M;F;O'),
        (6,'Agree to Terms', 'Checkbox', 'Y;N')
        ON CONFLICT ("field_id") DO NOTHING; 
    `);


}

bulkInsert();