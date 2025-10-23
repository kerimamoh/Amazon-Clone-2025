import React from "react";
import { catagoryImage } from "./catagoryFullinfos";

import CatagoryCard from "./CategoryCard";
import classes from "./catagory.module.css";
const Catagory = () => {
   return (
     
     <section className={classes.catagory_container}>
       {catagoryImage.map((infos) => {
         return <CatagoryCard data={infos} key={infos.id} />;
       })}
     </section>
   );
};

export default Catagory;
