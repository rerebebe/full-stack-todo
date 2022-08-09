import Item from "./Item.js";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext.js";

const List = ({
  add,
  listData,
  deleteData,
  submittingstatus,
  finishedTask,
  // setFinish,
}) => {
  const { sameDate } = useContext(LoginContext);
  return (
    <div>
      <div>
        {/* {JSON.stringify(listData)} */}
        {listData
          .slice(0)
          .reverse()
          .map((item) => {
            const { id, note, date, time } = item;

            return (
              <Item
                key={id}
                id={id}
                note={note}
                date={date}
                time={time}
                deleteData={deleteData}
                submittingstatus={submittingstatus}
                add={add}
                listData={listData}
                item={item}
                finish={finishedTask}
                // setFinish={setFinish}
              />
            );
          })}
      </div>
      {/* <div>
        <p>Finished Tasks :</p>
        {JSON.stringify(finishedTask)}
        {finishedTask.map((item) => {
          const { id, note, date, time } = item;
          return (
            <Item2
              key={id}
              id={id}
              note={note}
              date={date}
              time={time}
              deleteData={deleteData}
              submittingstatus={submittingstatus}
              add={add}
              listData={listData}
              item={item}
              finish={finishedTask}
              setFinish={setFinish}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default List;
