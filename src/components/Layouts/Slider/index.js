import { useState, useEffect } from "react";
import { getSlider } from "../../../services/Api";

import { getImageSlider } from "../../../utils/index";

function Slider() {
  const [sliders, getSliders] = useState([]);

  useEffect(() => {
    getSlider({
      params: {
        sort: 1,
        public: true,
      },
    })
      .then(({ data }) => getSliders(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/*	Slider	*/}
      <div id="slide" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {sliders?.map((slider) => (
            <li
              key={slider._id}
              data-target="#slide"
              data-slide-to={slider.position - 1}
              className={slider.position === 1 ? "active" : ""}
            />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner">
          {sliders.map((slider) => (
            <div key={slider._id} className={slider.position === 1 ? "carousel-item active" : "carousel-item"}>
              <img src={getImageSlider(slider.image)} alt="Vietpro Academy" />
            </div>
          ))}
        </div>
        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
      {/*	End Slider	*/}
    </>
  );
}

export default Slider;
