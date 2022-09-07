import React, { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { deleteGroup } from "../../api/accounts";

export default function DeleteGroupButton({
  groupId,
  onDeleted,
}: PropsWithChildren<{ groupId: number; onDeleted: () => void }>) {
  const submit = async () => {
    await deleteGroup(groupId);

    onDeleted();
  };

  return (
    <Button
      onClick={submit}
      className="ms-2"
      variant="outline-danger"
      size="sm"
    >
      Delete Group
    </Button>
  );
}
