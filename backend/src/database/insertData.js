const db = require('../syncModels');

async function insertData() {
    try {
        await db.Language.bulkCreate([
            { LANGUAGE_ID: 1, LANGUAGE_CODE: 'PT', LANGUAGE_NAME: 'Portuguese' },
            { LANGUAGE_ID: 2, LANGUAGE_CODE: 'ES', LANGUAGE_NAME: 'Spanish' },
            { LANGUAGE_ID: 3, LANGUAGE_CODE: 'FR', LANGUAGE_NAME: 'French' }
        ]);
        await db.Area.bulkCreate([
            { AREA_ID: 100, TITLE: 'Health' },
            { AREA_ID: 200, TITLE: 'Education' },
            { AREA_ID: 300, TITLE: 'Sports' },
            { AREA_ID: 400, TITLE: 'Gastronomy' },
            { AREA_ID: 500, TITLE: 'Housing' },
            { AREA_ID: 600, TITLE: 'Leisure' },
            { AREA_ID: 700, TITLE: 'Transportation' }
        ]);
        await db.SubArea.bulkCreate([
            { SUB_AREA_ID: 1001, AREA_ID: 100, TITLE: 'Hospitals' },
            { SUB_AREA_ID: 1002, AREA_ID: 100, TITLE: 'Clinics' },
            { SUB_AREA_ID: 1003, AREA_ID: 100, TITLE: 'Pharmacies' },
            { SUB_AREA_ID: 2001, AREA_ID: 200, TITLE: 'Schools' },
            { SUB_AREA_ID: 2002, AREA_ID: 200, TITLE: 'Colleges' },
            { SUB_AREA_ID: 2003, AREA_ID: 200, TITLE: 'Libraries' },
            { SUB_AREA_ID: 3001, AREA_ID: 300, TITLE: 'Gyms' },
            { SUB_AREA_ID: 3002, AREA_ID: 300, TITLE: 'Stadiums' },
            { SUB_AREA_ID: 3003, AREA_ID: 300, TITLE: 'Parks' },
            { SUB_AREA_ID: 4001, AREA_ID: 400, TITLE: 'Restaurants' },
            { SUB_AREA_ID: 4002, AREA_ID: 400, TITLE: 'Cafes' },
            { SUB_AREA_ID: 4003, AREA_ID: 400, TITLE: 'Bars' },
            { SUB_AREA_ID: 5001, AREA_ID: 500, TITLE: 'Apartments' },
            { SUB_AREA_ID: 5002, AREA_ID: 500, TITLE: 'Villas' },
            { SUB_AREA_ID: 5003, AREA_ID: 500, TITLE: 'Dormitories' },
            { SUB_AREA_ID: 6001, AREA_ID: 600, TITLE: 'Cinemas' },
            { SUB_AREA_ID: 6002, AREA_ID: 600, TITLE: 'Theaters' },
            { SUB_AREA_ID: 6003, AREA_ID: 600, TITLE: 'Amusement Parks' },
            { SUB_AREA_ID: 7001, AREA_ID: 700, TITLE: 'Buses' },
            { SUB_AREA_ID: 7002, AREA_ID: 700, TITLE: 'Trains' },
            { SUB_AREA_ID: 7003, AREA_ID: 700, TITLE: 'Airports' },
            { SUB_AREA_ID: 7004, AREA_ID: 700, TITLE: 'Hitchride' }
        ]);
        await db.AreaContent.bulkCreate([
            { AREA_ID: 100, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Saúde' },
            { AREA_ID: 100, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Santé' },
            { AREA_ID: 200, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Educação' },
            { AREA_ID: 200, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Éducation' },
            { AREA_ID: 300, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Desportos' },
            { AREA_ID: 300, LANGUAGE_ID: 2, TRANSLATED_TITLE: 'Esportes' },
            { AREA_ID: 400, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Gastronomia' },
            { AREA_ID: 400, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Gastronomie' },
            { AREA_ID: 500, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Habitação' },
            { AREA_ID: 500, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Logement' },
            { AREA_ID: 600, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Lazer' },
            { AREA_ID: 600, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Loisirs' },
            { AREA_ID: 700, LANGUAGE_ID: 2, TRANSLATED_TITLE: 'Transporte' },
            { AREA_ID: 700, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Transport' }
        ]);
        await db.SubAreaContent.bulkCreate([
            { SUB_AREA_ID: 1001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Hospitais' },
            { SUB_AREA_ID: 1001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Hôpitaux' },
            { SUB_AREA_ID: 1002, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Clínicas' },
            { SUB_AREA_ID: 1002, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Cliniques' },
            { SUB_AREA_ID: 1003, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Farmácias' },
            { SUB_AREA_ID: 1003, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Pharmacies' },
            { SUB_AREA_ID: 2001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Escolas' },
            { SUB_AREA_ID: 2001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Écoles' },
            { SUB_AREA_ID: 3001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Ginásios' },
            { SUB_AREA_ID: 3001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Gymnases' },
            { SUB_AREA_ID: 4001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Restaurantes' },
            { SUB_AREA_ID: 4001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Restaurants' },
            { SUB_AREA_ID: 5001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Apartamentos' },
            { SUB_AREA_ID: 5001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Appartements' },
            { SUB_AREA_ID: 6001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Cinemas' },
            { SUB_AREA_ID: 6001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Cinémas' },
            { SUB_AREA_ID: 7001, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Autocarro' },
            { SUB_AREA_ID: 7001, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Bus' },
            { SUB_AREA_ID: 7002, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Comboios' },
            { SUB_AREA_ID: 7002, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Trains' },
            { SUB_AREA_ID: 7003, LANGUAGE_ID: 1, TRANSLATED_TITLE: 'Aeroportos' },
            { SUB_AREA_ID: 7003, LANGUAGE_ID: 3, TRANSLATED_TITLE: 'Aéroports' }
        ]);
        await db.User.bulkCreate([
            { firstName: 'John', lastName: 'Doe', EMAIL: 'john.doe@example.com', JOIN_DATE: '2023-01-15', RoleID: 1 },
            { firstName: 'Jane', lastName: 'Smith', EMAIL: 'jane.smith@example.com', JOIN_DATE: '2023-02-20', RoleID: 2 },
            { firstName: 'Emily', lastName: 'Johnson', EMAIL: 'emily.johnson@example.com', JOIN_DATE: '2023-03-25', RoleID: 2 },
            { firstName: 'Michael', lastName: 'Brown', EMAIL: 'michael.brown@example.com', JOIN_DATE: '2023-04-30', RoleID: 2 },
            { firstName: 'Sarah', lastName: 'Davis', EMAIL: 'sarah.davis@example.com', JOIN_DATE: '2023-05-15', RoleID: 2 },
            { firstName: 'David', lastName: 'Miller', EMAIL: 'david.miller@example.com', JOIN_DATE: '2023-06-10', RoleID: 1 },
            { firstName: 'Linda', lastName: 'Wilson', EMAIL: 'linda.wilson@example.com', JOIN_DATE: '2023-07-05', RoleID: 1 },
            { firstName: 'James', lastName: 'Moore', EMAIL: 'james.moore@example.com', JOIN_DATE: '2023-08-01', RoleID: 2 },
            { firstName: 'Barbara', lastName: 'Taylor', EMAIL: 'barbara.taylor@example.com', JOIN_DATE: '2023-09-10', RoleID: 1 },
            { firstName: 'Richard', lastName: 'Anderson', EMAIL: 'richard.anderson@example.com', JOIN_DATE: '2023-10-20', RoleID: 1 },
            { firstName: 'Guilhermo', lastName: 'Pedrinho', EMAIL: 'pv25215@alunos.estgv.ipv.pt', JOIN_DATE: '2024-06-22', RoleID: 3 },
            { firstName: 'Jose', lastName: 'Machado', EMAIL: 'pv26900@alunos.estgv.ipv.pt', JOIN_DATE: '2024-06-22', RoleID: 3 },
            { firstName: 'Tio', lastName: 'Patinhas', EMAIL: 'tio.patinhas@examples.com', JOIN_DATE: '2024-06-22', RoleID: 3 },
            { firstName: 'CENTRAL', lastName: 'ADMIN', EMAIL: 'god@example.com', JOIN_DATE: '2023-01-15', RoleID: 3 }
        ]);
        await db.UserActionsLog.bulkCreate([
            { USER_ID: 1, ACTION_TYPE: 'Login', ACTION_DESCRIPTION: 'User logged in', ACTION_DATE: '2023-01-15 08:00:00' },
            { USER_ID: 2, ACTION_TYPE: 'View', ACTION_DESCRIPTION: 'User viewed dashboard', ACTION_DATE: '2023-02-20 09:00:00' },
            { USER_ID: 3, ACTION_TYPE: 'Edit', ACTION_DESCRIPTION: 'User edited profile', ACTION_DATE: '2023-03-25 10:00:00' },
            { USER_ID: 4, ACTION_TYPE: 'Logout', ACTION_DESCRIPTION: 'User logged out', ACTION_DATE: '2023-04-30 11:00:00' },
            { USER_ID: 5, ACTION_TYPE: 'Login', ACTION_DESCRIPTION: 'User logged in', ACTION_DATE: '2023-05-15 08:30:00' },
            { USER_ID: 6, ACTION_TYPE: 'View', ACTION_DESCRIPTION: 'User viewed reports', ACTION_DATE: '2023-06-10 09:30:00' },
            { USER_ID: 7, ACTION_TYPE: 'Edit', ACTION_DESCRIPTION: 'User edited settings', ACTION_DATE: '2023-07-05 10:30:00' },
            { USER_ID: 8, ACTION_TYPE: 'Logout', ACTION_DESCRIPTION: 'User logged out', ACTION_DATE: '2023-08-01 11:30:00' },
            { USER_ID: 9, ACTION_TYPE: 'Login', ACTION_DESCRIPTION: 'User logged in', ACTION_DATE: '2023-09-10 08:15:00' },
            { USER_ID: 10, ACTION_TYPE: 'View', ACTION_DESCRIPTION: 'User viewed notifications', ACTION_DATE: '2023-10-20 09:15:00' }
        ]);
        await db.UserAccountDetails.bulkCreate([
            { USER_ID: 1, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 2, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 3, ACCOUNT_STATUS: 0, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 4, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 1 },
            { USER_ID: 5, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 6, ACCOUNT_STATUS: 0, ACCOUNT_RESTRICTION: 1 },
            { USER_ID: 7, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 8, ACCOUNT_STATUS: 0, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 9, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 0 },
            { USER_ID: 10, ACCOUNT_STATUS: 1, ACCOUNT_RESTRICTION: 1 }
        ]);
        await db.UserPasswordsDictionary.bulkCreate([
            { USER_ID: 1, HASHED_PASSWD: 'hashed_password1', SALT: 'salt1' },
            { USER_ID: 2, HASHED_PASSWD: 'hashed_password2', SALT: 'salt2' },
            { USER_ID: 3, HASHED_PASSWD: 'hashed_password3', SALT: 'salt3' },
            { USER_ID: 4, HASHED_PASSWD: 'hashed_password4', SALT: 'salt4' },
            { USER_ID: 5, HASHED_PASSWD: 'hashed_password5', SALT: 'salt5' },
            { USER_ID: 6, HASHED_PASSWD: 'hashed_password6', SALT: 'salt6' },
            { USER_ID: 7, HASHED_PASSWD: 'hashed_password7', SALT: 'salt7' },
            { USER_ID: 8, HASHED_PASSWD: 'hashed_password8', SALT: 'salt8' },
            { USER_ID: 9, HASHED_PASSWD: 'hashed_password9', SALT: 'salt9' },
            { USER_ID: 10, HASHED_PASSWD: 'hashed_password10', SALT: 'salt10' }
        ]);
        await db.OfficeAdmins.bulkCreate([
            { OFFICE_ID: 0, MANAGER_ID: 11 },
            { OFFICE_ID: 0, MANAGER_ID: 12 },
            { OFFICE_ID: 0, MANAGER_ID: 13 },
            { OFFICE_ID: 1, MANAGER_ID: 14 },
            { OFFICE_ID: 2, MANAGER_ID: 14 },
            { OFFICE_ID: 3, MANAGER_ID: 14 },
            { OFFICE_ID: 4, MANAGER_ID: 14 },
            { OFFICE_ID: 5, MANAGER_ID: 14 },
            { OFFICE_ID: 1, MANAGER_ID: 2 },
            { OFFICE_ID: 2, MANAGER_ID: 3 },
            { OFFICE_ID: 3, MANAGER_ID: 4 },
            { OFFICE_ID: 4, MANAGER_ID: 5 },
            { OFFICE_ID: 5, MANAGER_ID: 8 }
        ]);
        await db.OfficeWorkers.bulkCreate([
            { OFFICE_ID: 0, USER_ID: 11 },
            { OFFICE_ID: 0, USER_ID: 12 },
            { OFFICE_ID: 0, USER_ID: 13 },
            { OFFICE_ID: 1, USER_ID: 14 },
            { OFFICE_ID: 2, USER_ID: 14 },
            { OFFICE_ID: 3, USER_ID: 14 },
            { OFFICE_ID: 4, USER_ID: 14 },
            { OFFICE_ID: 5, USER_ID: 14 },
            { OFFICE_ID: 1, USER_ID: 2 },
            { OFFICE_ID: 2, USER_ID: 3 },
            { OFFICE_ID: 3, USER_ID: 4 },
            { OFFICE_ID: 4, USER_ID: 5 },
            { OFFICE_ID: 5, USER_ID: 8 },
            { OFFICE_ID: 1, USER_ID: 1 },
            { OFFICE_ID: 2, USER_ID: 6 },
            { OFFICE_ID: 3, USER_ID: 7 },
            { OFFICE_ID: 4, USER_ID: 9 },
            { OFFICE_ID: 4, USER_ID: 10 }
        ]);
        await db.UserPreferences.bulkCreate([
            { USER_ID: 1, AREAS: '100,200', SUB_AREAS: '1001,2001', ReceiveNotifications: 1, LanguageID: 1 },
            { USER_ID: 2, AREAS: '300,400', SUB_AREAS: '3001,4001', ReceiveNotifications: 1, LanguageID: 2 },
            { USER_ID: 3, AREAS: '500,600', SUB_AREAS: '5001,6001', ReceiveNotifications: 0, LanguageID: 3 },
            { USER_ID: 4, AREAS: '700,400', SUB_AREAS: '7001,2001', ReceiveNotifications: 1, LanguageID: 1 },
            { USER_ID: 5, AREAS: '500,100', SUB_AREAS: '2001,4001', ReceiveNotifications: 0, LanguageID: 1 },
            { USER_ID: 6, AREAS: '100,300', SUB_AREAS: '1001,3001', ReceiveNotifications: 1, LanguageID: 1 },
            { USER_ID: 7, AREAS: '200,400', SUB_AREAS: '2001,4001', ReceiveNotifications: 0, LanguageID: 2 },
            { USER_ID: 8, AREAS: '500,200', SUB_AREAS: '5001,7001', ReceiveNotifications: 1, LanguageID: 2 },
            { USER_ID: 9, AREAS: '600,100', SUB_AREAS: '6001,3001', ReceiveNotifications: 0, LanguageID: 3 },
            { USER_ID: 10, AREAS: '500,100', SUB_AREAS: '2001,1001', ReceiveNotifications: 1, LanguageID: 3 }
        ]);
        await db.Post.bulkCreate([
            { SUB_AREA_ID: 1001, OFFICE_ID: 1, PUBLISHER_ID: 2, TITLE: 'CUF', CONTENT: 'This is a description' },
            { SUB_AREA_ID: 2002, OFFICE_ID: 2, PUBLISHER_ID: 3, TITLE: 'ESTGV', CONTENT: 'I have finally finished my degree!!' },
            { SUB_AREA_ID: 3001, OFFICE_ID: 3, PUBLISHER_ID: 4, TITLE: 'Best Gyms in Fundão', CONTENT: 'Link to article: ' },
            { SUB_AREA_ID: 5001, OFFICE_ID: 4, PUBLISHER_ID: 6, TITLE: 'One Bedroom', CONTENT: 'One bedroom apartment in the center of the city for rent' },
            { SUB_AREA_ID: 6001, OFFICE_ID: 1, PUBLISHER_ID: 7, TITLE: 'Cinemas', CONTENT: 'Forum Viseu is going to display Star Wars the original trilogy' },
            { SUB_AREA_ID: 7001, OFFICE_ID: 2, PUBLISHER_ID: 8, TITLE: 'Flixbus Strike', CONTENT: 'On the 9th of August, flixbus will be on strike' },
            { SUB_AREA_ID: 6003, OFFICE_ID: 3, PUBLISHER_ID: 9, TITLE: 'Ottieland', CONTENT: 'Ottieland returns for one more year' },
            { SUB_AREA_ID: 4003, OFFICE_ID: 4, PUBLISHER_ID: 10, TITLE: 'Capuchinho', CONTENT: 'Capuchinho bakery turns 75 years old' },
            { SUB_AREA_ID: 3002, OFFICE_ID: 2, PUBLISHER_ID: 1, TITLE: 'Stadium 1º de Maio', CONTENT: 'The 1º de Maio stadium hosts the final of the junior league' },
            { SUB_AREA_ID: 4002, OFFICE_ID: 4, PUBLISHER_ID: 5, TITLE: 'Neon Byte Bistro', CONTENT: 'Restaurant with a cyberpunk theme', TYPE: 'P' }
        ]);
        await db.Event.bulkCreate([
            { PUBLISHER_ID: 1, OFFICE_ID: 1, SUBAREA_ID: 1001, NAME: 'Volunteering', DESCRIPTION: 'Viseu`s hospital will be hosting an auction to gain funding for children in need', EVENT_DATE: '2023-11-15', RECURRING: 0 },
            { PUBLISHER_ID: 2, OFFICE_ID: 2, SUBAREA_ID: 2001, NAME: 'Marathon', DESCRIPTION: 'Next Friday Alves Martins school will host a marathon in support of cancer', EVENT_DATE: '2023-12-01', RECURRING: 0 },
            { PUBLISHER_ID: 3, OFFICE_ID: 3, SUBAREA_ID: 3002, NAME: 'Football tournament', DESCRIPTION: 'Every Sunday we will be playing football until the end of the tournament', EVENT_DATE: '2023-12-10', RECURRING: 0 },
            { PUBLISHER_ID: 4, OFFICE_ID: 2, SUBAREA_ID: 4003, NAME: 'Rafael Mariano Live', DESCRIPTION: 'Rafael Mariano will be hosting a live show in Old School Bar', EVENT_DATE: '2023-12-31', RECURRING: 1 },
            { PUBLISHER_ID: 5, OFFICE_ID: 5, SUBAREA_ID: 6002, NAME: 'The Lord Of the Rings live', DESCRIPTION: 'Altice Arena will be playing the OST of The Lord of the Rings with the movie', EVENT_DATE: '2024-01-05', RECURRING: 0 },
            { PUBLISHER_ID: 6, OFFICE_ID: 1, SUBAREA_ID: 4001, NAME: 'Company dinner', DESCRIPTION: 'We are celebrating a closed deal and will be having dinner at Arouquesa', EVENT_DATE: '2024-01-15', RECURRING: 1 },
            { PUBLISHER_ID: 7, OFFICE_ID: 2, SUBAREA_ID: 2003, NAME: 'Live Reading', DESCRIPTION: 'The library will be having a live reading directed to children', EVENT_DATE: '2024-01-25', RECURRING: 0 },
            { PUBLISHER_ID: 8, OFFICE_ID: 3, SUBAREA_ID: 1002, NAME: 'Donate Blood', DESCRIPTION: 'Local pharmacy will be collecting blood for charity purposes', EVENT_DATE: '2024-02-05', RECURRING: 1 },
            { PUBLISHER_ID: 9, OFFICE_ID: 4, SUBAREA_ID: 2002, NAME: 'Tecnico Open Day', DESCRIPTION: 'Técnico will open its doors for everyone', EVENT_DATE: '2024-02-15', RECURRING: 0 },
            { PUBLISHER_ID: 10, OFFICE_ID: 5, SUBAREA_ID: 3001, NAME: 'Workout competition', DESCRIPTION: 'Fitness hut is opening a tournament and the prize is a free membership for a year', EVENT_DATE: '2024-03-01', RECURRING: 1 }
        ]);
        await db.Forum.bulkCreate([
            { PUBLISHER_ID: 1, OFFICE_ID: 1, SUB_AREA_ID: 4002, TITLE: 'Coffee Shops', CONTENT: 'Can someone recommend coffee shops with a "hippie" vibe?' },
            { PUBLISHER_ID: 2, OFFICE_ID: 2, SUB_AREA_ID: 2002, TITLE: 'Best colleges in the country?', CONTENT: 'Trying to get a new degree in a new school, what are the best options' },
            { PUBLISHER_ID: 3, OFFICE_ID: 3, SUB_AREA_ID: 4001, TITLE: 'Anniversary Dinner', CONTENT: 'Want to take my SO somewhere nice, what do you guys recommend?' },
            { PUBLISHER_ID: 4, OFFICE_ID: 4, SUB_AREA_ID: 6001, TITLE: 'Top 3 movies', CONTENT: 'Tell me your top 3 movies of all time. Mine are 1.Return of the king 2.Blade Runner 1982 3. Hacksaw Ridge' },
            { PUBLISHER_ID: 5, OFFICE_ID: 5, SUB_AREA_ID: 3003, TITLE: 'Parks to walk the dog?', CONTENT: 'Need a good park to walk my dog. Any recommendations' },
            { PUBLISHER_ID: 6, OFFICE_ID: 1, SUB_AREA_ID: 7004, TITLE: 'Need a lift', CONTENT: 'Need a lift to my house in UnicornLand, can someone give me a lift?' },
            { PUBLISHER_ID: 7, OFFICE_ID: 2, SUB_AREA_ID: 7003, TITLE: 'Airplane ticket', CONTENT: 'I bought these airplane tickets, does anyone want them?' },
            { PUBLISHER_ID: 8, OFFICE_ID: 3, SUB_AREA_ID: 4002, TITLE: 'Baking a red velvet', CONTENT: 'I am having a hard time in the 3rd step of the mixture of the ingredients, can someone help me?' },
            { PUBLISHER_ID: 9, OFFICE_ID: 4, SUB_AREA_ID: 5001, TITLE: 'Looking for a studio', CONTENT: 'Does anyone know a good landlord who rents studios at an affordable price and good conditions?' },
            { PUBLISHER_ID: 10, OFFICE_ID: 5, SUB_AREA_ID: 1002, TITLE: 'Need counseling', CONTENT: 'I am looking for a good psychologist for my oldest son, does anyone have a recommendation? Thank you all!' }
        ]);
        await db.Notification.bulkCreate([
            { USER_ID: 1, EVENT_ID: 1, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Volunteering.' },
            { USER_ID: 2, EVENT_ID: 2, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Marathon.' },
            { USER_ID: 3, EVENT_ID: 3, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Football tournament.' },
            { USER_ID: 4, EVENT_ID: 4, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Rafael Mariano Live.' },
            { USER_ID: 5, EVENT_ID: 5, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: The Lord Of the Rings live.' },
            { USER_ID: 6, EVENT_ID: 6, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Company dinner.' },
            { USER_ID: 7, EVENT_ID: 7, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Live Reading.' },
            { USER_ID: 8, EVENT_ID: 8, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Donate Blood.' },
            { USER_ID: 9, EVENT_ID: 9, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Tecnico Open Day.' },
            { USER_ID: 10, EVENT_ID: 10, POST_ID: null, NOTIFICATION_TEXT: 'You have a new event: Workout competition.' }
        ]);
        await db.DefaultField.bulkCreate([
            { FIELD_NAME: 'First Name', FIELD_TYPE: 'Text', FIELD_VALUE: '' },
            { FIELD_NAME: 'Last Name', FIELD_TYPE: 'Text', FIELD_VALUE: '' },
            { FIELD_NAME: 'Age', FIELD_TYPE: 'Int', FIELD_VALUE: '0' },
            { FIELD_NAME: 'Date of Birth', FIELD_TYPE: 'Date', FIELD_VALUE: '1970-01-01' },
            { FIELD_NAME: 'Gender', FIELD_TYPE: 'Check Box', FIELD_VALUE: 'M;F;O' },
            { FIELD_NAME: 'Agree to Terms', FIELD_TYPE: 'Checkbox', FIELD_VALUE: 'Y;N' }
        ]);

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

// Call the insertData function
insertData();

