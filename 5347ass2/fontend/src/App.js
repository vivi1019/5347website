import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Userprofile from './userprofile/userprofile';
import UserprofileFavourite from './userprofile/favourite';
import UserprofileComparisons from './userprofile/comparisons';
import UserprofileContributions from './userprofile/contributions';
import Admin from './admin-frontend/admin/App';
import HomePage from './character/index';
import EditCharacter from './character/editCharacter';
import AddCharacter from './character/addCharacter';
import Characterdetail from './characterdetail/characterdetail';
import ViewCharacterdetail from './characterdetail/viewdetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/userprofile/userprofile" element={<Userprofile />} />
                <Route path="/userprofile/favourite" element={<UserprofileFavourite />} />
                <Route path="/userprofile/comparisons" element={<UserprofileComparisons />} />
                <Route path="/userprofile/contributions" element={<UserprofileContributions />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/character" element={<HomePage />} />
                <Route path="/addCharacter" element={<AddCharacter />} />
                <Route path="/editCharacter" element={<EditCharacter />} />
                <Route path="/characterdetail/characterdetail" element={<Characterdetail />} />
                <Route path="/characterdetail/viewdetail" element={<ViewCharacterdetail />} />
            </Routes>
        </Router>
    );
}

export default App;

