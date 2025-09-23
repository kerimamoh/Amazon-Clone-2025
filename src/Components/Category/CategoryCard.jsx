import React from "react";
import classes from "./catagory.module.css";
import {Link} from "react-router-dom"

const CatagoryCard = ({ data }) => {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
 <img src={data?.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
};

export default CatagoryCard;

// const CatagoryCard = ({ data }) => {
//   if (!data) return null;

//   const { name = "", title = "Category", imgLink = "" } = data;
//   return (
//     <div className={classes.category}>
//       <Link to={`/category/${name}`}>
//         <span>
//           <h2>{title}</h2>
//         </span>
//         <img src={imgLink} alt={`${title} image`} />
//         <p>Shop now</p>
//       </Link>
//     </div>
//   );
// };

