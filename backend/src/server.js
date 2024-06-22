const express = require('express');
const cors = require('cors');
const app = express();



//const PermissionRoutes = require('./routes/PermissionsRoutes');
//const UserRoutes = require('./routes/UserRoutes');
//const RegionalOfficeRoutes = require('./routes/RegionalOfficeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dynamic_contentRoutes = require('./routes/dynamic_contentRoutes');


const port = process.env.PORT || 8000;
app.set('port', port);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


//API
app.use('/api/categories', categoryRoutes);
app.use('/api/dynamic_content', dynamic_contentRoutes);


//app.use('/permission', PermissionRoutes);
//app.use('/user', UserRoutes);
//app.use('/regional_office', RegionalOfficeRoutes);



app.listen(app.get('port'), () => {
    console.log("server running on port " + app.get('port'));
});

