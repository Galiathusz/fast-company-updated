import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";

let User = ({ _id, name, profession, qualities, completedMeetings, rate, bookmark, onToggleBookMark, onDelete}) => {

    return (
        <tr key = {_id}>
            <td>
                {name}
            </td>
            <td>
                {qualities.map(quality => (
                    <Quality
                        key = {quality._id}
                        {...quality}
                    />
                ))}
            </td>
            <td>
                {profession.name}
            </td>
            <td>
                {completedMeetings}
            </td>
            <td>
                {rate} /5
            </td>
            <td>
                <button
                    onClick = {() => onToggleBookMark(_id)}
                >
                   {<BookMark
                        status = {bookmark}
                   />}
                </button>
            </td>
            <td>
                <button
                    className = "btn bg-danger text-light"

                    onClick = {() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
};

export default User;