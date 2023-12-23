import React from "react";

function ListNumberDuplicate(props) {
  const { listduplicate } = props;
  return (
    <div className="bg-white max-w-[300px] w-full mt-8 absolute right-12 top-5">
      <ul
        className="flex flex-col scroll-m-0 pb-3  gap-2 pl-3 pt-3"
        style={{ overflowX: "scroll", height: "428px" }}
      >
        {listduplicate.map((item, index) => (
          <li>
            {index + 1}) {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListNumberDuplicate;
