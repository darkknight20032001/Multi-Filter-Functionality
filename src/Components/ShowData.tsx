import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowDataCards from "./ShowDataCards";
import { apiData } from "../ApiData";

const ShowData: React.FC = () => {
  const [publicData, setPublicData] = useState<apiData[]>([]);
  const [myCategory, setMyCategory] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<apiData[]>([]);
  const [selectCategory, setSelectCategory] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await axios.get("https://api.publicapis.org/entries");
      setPublicData(data?.data?.entries);
    }
    getData();
  }, []);

  useEffect(() => {
    function getCategory() {
      let arrCategory: string[] = [];
      publicData.forEach((item: apiData) => {
        
        arrCategory.push(item.Category);
      });
      const category: Set<string> = new Set(arrCategory);
      setMyCategory(Array.from(category));
    }
    getCategory();
  }, [publicData]);

  useEffect(() => {
    function filterMyData() {
      if (selectCategory.length > 0) {
        const dataToFilter: apiData[] = publicData.filter((itemData) => {
          return selectCategory.includes(itemData.Category);
        });
        setFilteredData(dataToFilter);
      } else {
        setFilteredData(publicData);
      }
    }
    filterMyData();
    console.log("Filtered Data ", filteredData);
  }, [selectCategory]);
  console.log("selectCategory ", selectCategory);
  console.log("filteredData: ", filteredData);
  return (
    <div>
      {myCategory.map((itemCat: string) => {
        return (
          <ShowDataCards
            itemCat={itemCat}
            publicData={publicData}
            setFilteredData={setFilteredData}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        );
      })}

      {filteredData.map((itemData: apiData) => {
        return (
          <li key={itemData.API+Math.random().toString()}>
            <div>{itemData.API}</div>
              <div>{itemData.Description}</div>
            <div>{itemData.Category}</div>
          </li>
        );
      })}
    </div>
  );
};

export default ShowData;
