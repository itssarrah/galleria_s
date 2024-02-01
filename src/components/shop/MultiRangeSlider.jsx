import React, { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "../../css/MultiRangeSlider.css";
import "../../css/Filtre.css";

<<<<<<< HEAD
const MultiRangeSlider = ({ min, max, onChange }) => {
=======
const MultiRangeSlider = ({
  min,
  max,
  onChange,
  register,
  // handleSubmit,
  // onSubmit,
}) => {
  // Creating the state variables
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

<<<<<<< HEAD
=======
  const { ref: minRefCallback, ...minRest } = register("min");
  const { ref: maxRefCallback, ...maxRest } = register("max");

  // Convert to percentage
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
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
          {...minRest}
          ref={(e) => {
            minRefCallback(e);
            minValRef.current = e;
          }}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
<<<<<<< HEAD
            updateSlider();
=======
            event.target.value = value.toString();
            // handleSubmit(onSubmit)();
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
          }}
          className={classnames(" min thumb thumb--zindex-3", {
            " thumb--zindex-5": minVal > max - 100,
          })}
          name="minPrice"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          {...maxRest}
          ref={(e) => {
            maxRefCallback(e);
            maxValRef.current = e;
          }}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
<<<<<<< HEAD
            updateSlider();
          }}
          className="thumb thumb--zindex-4"
          name="maxPrice"
=======
            event.target.value = value.toString();
            // handleSubmit(onSubmit)();
          }}
          className="max thumb thumb--zindex-4"
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
        />
      </div>
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
<<<<<<< HEAD
      <div className=" flex flex-row justify-between w-full">
        <div className="slider__left-value bg-[#FF9494] h-full w-fit  py-1 px-2 rounded-xl font-jost text-sm md:text-base xl:text-lg font-medium">
=======
      <div className=" price-values flex flex-row justify-between w-full">
        <div className="slider__left-value bg-[#FF9494] h-full w-fit  py-1 px-2 rounded-xl font-sofia text-sm md:text-base xl:text-lg font-medium">
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
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
