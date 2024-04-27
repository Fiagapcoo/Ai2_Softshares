const express = require('express');
const cors = require('cors');
const app = express();

const UserRoutes = require('./routes/UserRoutes');
const PermissionRoutes = require('./routes/PermissionsRoutes');


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

app.use('/user', UserRoutes);
app.use('/permission', PermissionRoutes);


app.listen(app.get('port'), () => {
    console.log("server running on port " + app.get('port'));
});
