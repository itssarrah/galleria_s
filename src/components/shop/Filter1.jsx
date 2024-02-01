import { useEffect, useRef, useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import { useFieldArray, useForm } from "react-hook-form";
import CategoryList from "./CategoryList";
import "../../css/Filtre.css";

const wilayasList = [
  { name: "Adrar" },
  { name: "Chlef" },
  { name: "Laghouat" },
];
const initialCategories = [
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
  {
    name: "Layer Cakes",
    num_search: "2567",
  },
];
function Filter1() {
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      items: [],
    },
  });
  const searchInputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState(initialCategories);

  const handleSearch = () => {
    const searchTerm = searchInputRef.current.value.toLowerCase();
    // Filter wilayas based on the search term
    const filteredWilayas = wilayasList.filter((wilaya) =>
      wilaya.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredWilayas);
  };

  const toggleSearchInputFocus = () => {
    searchInputRef.current.focus();
  };

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const toggleItem = (i, category) => {
    const updatedCategories = [...categories];
    updatedCategories[i].clicked = !updatedCategories[i].clicked;
    setCategories(updatedCategories);

    const index = fields.findIndex((_, index) => index === i);
    if (index === -1) {
      append({ item: category, id: i });
    } else {
      remove(index);
    }
  };

  function onSubmit(data) {
    console.log("shiiiiit");
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="filtre">
      <p className="text-center text-[30px] font-sunflower text-[rgb(255,148,148)] font-bold mt-12">
        FILTER
      </p>
      <div className={` format flex-col gap-3`}>
        <p className="text-black font-sofia text-[22px] text-left">Format :</p>
        <div className="flex flex-row gap-[8px]">
          <input
            className="relative float-left ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgb(255,148,148)] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-[#FF9494] dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary  dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#FF9494]"
            type="radio"
            id="small business"
            name="format"
            value="Small business"
            {...register("sm-buisness")}
          />
          <label>
            <span className="text-black text-opacity-[70%] font-sunflower text-[18px] text-left">
              Small business
            </span>
          </label>
        </div>
        <div className="flex flex-row gap-[8px] mt-2">
          <input
            className="relative float-left ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgb(255,148,148)] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-[#FF9494] dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary  dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#FF9494]"
            type="radio"
            id="items"
            name="format"
            value="items/products"
            {...register("items")}
          />
          <label>
            <span className="text-black text-opacity-[70%] font-sunflower text-[18px] text-left">
              Items / Products
            </span>
          </label>
        </div>
      </div>

      <CategoryList categories={categories} toggleItem={toggleItem} />

      <div className="price">
        <p className="text-black font-sofia text-[22px] text-left mt-2">
          Price Ranges :
        </p>
        <MultiRangeSlider
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          min={0}
          max={1000}
          onChange={handleSubmit(onSubmit)}
        />
      </div>

      <div className="wilayas">
        <p className="text-black font-sofia text-[22px] text-left">Wilaya :</p>

        <div className="flex flex-col pb-[10rem]">
          <div className="search-input-container">
            <div className="relative flex flex-row items-start justify-center ">
              <input
                type="search"
                list="wilayas"
                placeholder="type..."
                className="
                        w-52 h-9 rounded-lg border border-[#FF9494] bg-[#F5EBE0] focus:outline-none px-3 py-2 mb-5 ml-1"
                ref={searchInputRef}
                onChange={handleSearch}
              />
              <button
                className=" search-button bg-[#FF9494] rounded-full px-1.5 py-0 mt-1.5 ml-1"
                onClick={toggleSearchInputFocus}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Filter1;
