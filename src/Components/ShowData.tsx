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
      if (publicData.length > 0) {
        let arrCategory: string[] = [];
        publicData.map((item: apiData) => {
          arrCategory.push(item.Category);
        });
        const category: Set<string> = new Set(arrCategory);
        setMyCategory(Array.from(category));
      }
    }
    getCategory();
  }, [publicData]);

  useEffect(() => {
    function filterMyData() {
      if (selectCategory.length > 0) {
        let arrProduct: apiData[] = [];
        selectCategory.map((dataCat) => {
          const dataToFilter: apiData[] = publicData.filter((itemData) => {
            return dataCat === itemData.Category;
          });
          arrProduct.push(...dataToFilter);
        });
        const arrUnq: Set<apiData> = new Set(arrProduct);
        setFilteredData(Array.from(arrUnq));
      } else {
        console.log("hello");
        setFilteredData([]);
      }
    }
    filterMyData();
  }, [selectCategory]);

  return (
    <div>
      {myCategory.length > 0 &&
        myCategory.map((itemCat: string) => {
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
      {publicData.length > 0 &&
        filteredData.length === 0 &&
        publicData.map((itemData: apiData) => {
          return (
            <li key={itemData.API}>
              <div>{itemData.API}</div>
              <div>{itemData.Description}</div>
              <div>{itemData.Category}</div>
            </li>
          );
        })}
      {publicData.length > 0 &&
        filteredData.map((itemData: apiData) => {
          return (
            <li key={itemData.API}>
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
