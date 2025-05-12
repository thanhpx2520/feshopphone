import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getMenu } from "../../../services/Api";

function Menu() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenu()
      .then(({ data }) => setMenus(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Menu */}
      <nav>
        <div id="menu" className="collapse navbar-collapse">
          <ul>
            {menus.map((menu) => (
              <li key={menu._id} className="menu-item">
                <Link to={`/category-${menu._id}`}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* End Menu */}
    </>
  );
}

export default Menu;
