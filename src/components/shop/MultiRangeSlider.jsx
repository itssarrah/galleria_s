import React, { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "../../css/MultiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  const updateSlider = () => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }

    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }

    onChange({ min: minVal, max: maxVal });
  };

  return (
    <>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            updateSlider();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
          name="minPrice"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            updateSlider();
          }}
          className="thumb thumb--zindex-4"
          name="maxPrice"
        />
      </div>
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
      <div className=" flex flex-row justify-between w-full">
        <div className="slider__left-value bg-[#FF9494] h-full w-fit  py-1 px-2 rounded-xl font-jost text-sm md:text-base xl:text-lg font-medium">
          {minVal}da
        </div>
        <div className="slider__right-value bg-[#FF9494] h-full w-fit py-1 px-2 rounded-xl font-jost text-sm md:text-base xl:text-lg font-medium">
          {maxVal}da{" "}
        </div>
      </div>
    </>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
