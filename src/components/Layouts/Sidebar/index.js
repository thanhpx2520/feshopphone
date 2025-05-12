import { useState, useEffect } from "react";
import { getBanner } from "../../../services/Api";

import { getImageBanner } from "../../../utils/index";

function Sidebar() {
  const [banners, getBanners] = useState([]);

  useEffect(() => {
    getBanner({
      params: {
        sort: 1,
        public: true,
      },
    })
      .then(({ data }) => getBanners(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banners.map((banner) => (
            <div key={banner._id} className="banner-item">
              <a href={banner.url}>
                <img className="img-fluid" src={getImageBanner(banner.image)} alt="banner" />
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* End Sidebar */}
    </>
  );
}

export default Sidebar;
