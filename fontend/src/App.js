import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Userprofile from './userprofile/userprofile';
import UserprofileFavourite from './userprofile/favourite';
import UserprofileComparisons from './userprofile/comparisons';
import UserprofileContributions from './userprofile/contributions';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/userprofile/userprofile" element={<Userprofile />} />
                <Route path="/userprofile/favourite" element={<UserprofileFavourite />} />
                <Route path="/userprofile/comparisons" element={<UserprofileComparisons />} />
                <Route path="/userprofile/contributions" element={<UserprofileContributions />} />
            </Routes>
        </Router>
    );
}

export default App;

