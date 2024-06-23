const express = require('express');
const cors = require('cors');
const app = express();
const insertData = require('./database/logic_objects/insertData');

/*
const { 
        syncDatabase,
        readModels,
        associateModels} = require('./models/index'); 
const db = require('./models'); 
const syncModels = require('./syncModels');
*/



//const PermissionRoutes = require('./routes/PermissionsRoutes');
//const UserRoutes = require('./routes/UserRoutes');
//const RegionalOfficeRoutes = require('./routes/RegionalOfficeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const forumRoutes = require('./routes/forumRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const formsRoutes = require('./routes/formsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const userRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 8000;
app.set('port', port);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


//API
app.use('/api/categories', categoryRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/post', postRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/administration', adminRoutes);
app.use('/api/form', formsRoutes);
app.use('/api/comment', commentsRoutes);
app.use('/api/user', userRoutes);

//app.use('/permission', PermissionRoutes);
//app.use('/user', UserRoutes);
//app.use('/regional_office', RegionalOfficeRoutes);

app.listen(app.get('port'), () => {
            console.log("server running on port " + app.get('port'));
        });

/*
const startServer = async () => {
    try {
        // Load and synchronize models
        await syncModels();
        readModels('./src/models');
        associateModels();
        await syncDatabase();
        
        console.log('Database synchronized successfully.');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};
*/


//startServer();

