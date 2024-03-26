import Item from "./Item.js";
// import { useContext, useEffect } from "react";
// import { LoginContext } from "../Context/LoginContext.js";

const List = ({
  add,
  listData,
  deleteData,
  submittingstatus,
  finishedTask,
}) => {
  // const { sameDate } = useContext(LoginContext);
  return (
    <div>
      <div>
        {listData
          .slice(0)
          .reverse()
          .map((item) => {
            const { id, note, date, time } = item;
            const datePart = date.split("T")[0];
            return (
              <Item
                key={id}
                id={id}
                note={note}
                date={datePart}
                time={time}
                deleteData={deleteData}
                submittingstatus={submittingstatus}
                add={add}
                listData={listData}
                item={item}
                finish={finishedTask}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
