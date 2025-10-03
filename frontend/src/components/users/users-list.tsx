"use client";

import React from "react";
import { useUsersService } from "../../../hooks/useUsers";
import { IUser } from "../../../lib/types/user";

export default function UsersList() {
  const { data, isLoading, error } = useUsersService();
  const placeholderImage =
    "data:image/jpeg;base64,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";

  console.log(data);

  return (
    <div>
      {data?.paginatedData?.data &&
        data.paginatedData.data.map((user: IUser) => (
          <div key={user.id}>
            <p>{user.firstName ? user.firstName : ""}</p>
            <p>{user.lastName ? user.lastName : null}</p>
            <img
              className="w-60 h-60 rounded-full"
              src={
                user?.profilePicture?.secure_url
                  ? user.profilePicture.secure_url
                  : placeholderImage
              }
              alt=""
            />
          </div>
        ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
