import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Characterdetail from './characterdetail/characterdetail';
import ViewCharacterdetail from './characterdetail/viewdetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/characterdetail/characterdetail" element={<Characterdetail />} />
                <Route path="/characterdetail/viewdetail" element={<ViewCharacterdetail />} />
            </Routes>
        </Router>
    );
}

export default App;

