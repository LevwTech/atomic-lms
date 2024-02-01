import { Link } from "react-router-dom";
function Sidebar({ logo, isSidebarOpen, toggleSidebar }: any) {
        return (
             <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
                 <img src={logo} alt="University Logo" />
                 <ul>
                     <li><Link to="/schedule">Schedule</Link></li>
                     <li><Link to="/exams">Exams Time Table</Link></li>
                     <li><Link to="/courses">Courses</Link></li>
                 </ul>
                 <button onClick={toggleSidebar}>
                     {isSidebarOpen ? 'Collapse' : 'Extend'}
                 </button>
             </div>
        );
     }
     

export default Sidebar
