import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-6 py-3 rounded-full bg-[#726255] text-[#F4F1E1] font-medium text-lg shadow-lg hover:bg-[#372e29] transition-all">
          From Platform 9¾ to Your Dream Job
        </span>
        <h1 className="text-5xl font-bold">
          Find, Apply & <br /> Secure Your{" "}
          <span className="text-[#372e29]">Magical Career</span>
        </h1>
        <p>Find Your Dream Job in the Wizarding World – Hiring Now</p>
        <div className="flex w-[40%] shadow-lg border-2 border-[#B8976A] bg-[#f5f2ec] pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your magic role"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-transparent placeholder:text-[#726255] text-[#372e29]"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#726255] hover:bg-[#5d4a3d]"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
