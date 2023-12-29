import React, { useEffect, useState } from "react";
import { apiData } from "../ApiData";
import "./ShowDataCards.css";

const ShowDataCards: React.FC<{
  itemCat: string;
  publicData: apiData[];
  setFilteredData: (data: apiData[]) => void;
  selectCategory: string[];
  setSelectCategory: (category: string[]) => void;
}> = ({
  itemCat,
  publicData,
  setFilteredData,
  setSelectCategory,
  selectCategory,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    function addCat() {
      const arrCategory: string[] = [...selectCategory]; 
      if (clicked) {
        const arr: Set<string> = new Set([...arrCategory, itemCat]);
        setSelectCategory(Array.from(arr));
      } else {
        const arr: Set<string> = new Set([...selectCategory]);
        const deletedArr: string[] = Array.from(arr);
        const removeCat: string[] = deletedArr.filter((catItem: string) => {
          return catItem !== itemCat;
        });
        setSelectCategory(removeCat);
      }
    }
    addCat();
  }, [clicked]);

  return (
    <div
      className={clicked ? "clickCards" : "Cards"}
      key={itemCat}
      onClick={(e) => {
        e.preventDefault();
        setClicked(!clicked);
      }}
    >
      {itemCat}
    </div>
  );
};

export default ShowDataCards;
