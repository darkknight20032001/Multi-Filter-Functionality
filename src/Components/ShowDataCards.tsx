import React, { useEffect, useState } from "react";
import { apiData } from "../ApiData";
import "./ShowDataCards.css";

const ShowDataCards: React.FC<{
  itemCat: string;
  publicData: apiData[];
  setFilteredData: (data: apiData[]) => void;
  selectCategory: string[];
  setSelectCategory: (category: string[]) => void;
}> = ({ itemCat, setSelectCategory, selectCategory }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    function addCat() {
      // const arrCategory: string[] = [...selectCategory];
      if (clicked) {
        // const arr: Set<string> = new Set([...arrCategory, itemCat]);
        setSelectCategory([...selectCategory, itemCat]);
      } else {
        const removeCat: string[] = selectCategory.filter((catItem: string) => {
          return catItem !== itemCat;
        });
        setSelectCategory(removeCat);
        console.log(removeCat);
      }
    }
    addCat();
  }, [clicked]);

  return (
    <div
      className={clicked ? "clickCards" : "Cards"}
      key={itemCat}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      {itemCat}
    </div>
  );
};

export default ShowDataCards;
