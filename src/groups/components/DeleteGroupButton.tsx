import React, { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { deleteGroup } from "../../api/accounts";

export default function DeleteGroupButton({
  groupId,
  onDeleted,
  size,
}: PropsWithChildren<{
  groupId: number;
  onDeleted: () => void;
  size?: "sm" | "lg";
}>) {
  const submit = async () => {
    await deleteGroup(groupId);

    onDeleted();
  };

  return (
    <Button
      onClick={submit}
      className="text-danger"
      variant="light"
      size={size}
    >
      Delete Group
    </Button>
  );
}
