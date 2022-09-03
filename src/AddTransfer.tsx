import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Account from "./interfaces/Account";
import CreateTransferData from "./interfaces/CreateTransferData";
import { createTransfer, getRate } from "./api/accounts";

export default function AddTransfer({
  accounts,
  onCreated,
}: PropsWithChildren<{ accounts: Account[]; onCreated: () => void }>) {
  const [show, setShow] = useState(false);
  const [transferData, setTransferData] = useState<CreateTransferData>({
    date: "",
    amount: 0,
    rate: 0,
    account_from_id: 0,
    account_to_id: 0,
  });

  const loadRate = async () => {
    const accountFrom = accounts.find(
      (account) => account.id === transferData.account_from_id
    );
    const accountTo = accounts.find(
      (account) => account.id === transferData.account_to_id
    );

    if (accountFrom && accountTo) {
      const res = await getRate(accountFrom.currency, accountTo.currency);

      setTransferData({
        ...transferData,
        rate: res.buy,
      });
    }
  };

  useEffect(() => {
    (async () => await loadRate())();
  }, [transferData.account_from_id, transferData.account_to_id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTransfer({
      ...transferData,
      amount: transferData.amount * 100,
      rate: transferData.rate * 100,
    });

    setTransferData({
      date: "",
      amount: 0,
      rate: 0,
      account_from_id: 0,
      account_to_id: 0,
    });

    onCreated();

    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Add Transfer</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-transfer-form" onSubmit={submit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    value={transferData.date}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ): void => {
                      setTransferData({
                        ...transferData,
                        date: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    value={transferData.amount}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ): void => {
                      setTransferData({
                        ...transferData,
                        amount: Number(e.target.value),
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Rate"
                    value={transferData.rate}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ): void => {
                      setTransferData({
                        ...transferData,
                        rate: Number(e.target.value),
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Account from</Form.Label>
                  <Form.Select
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setTransferData({
                        ...transferData,
                        account_from_id: Number(e.target.value),
                      });
                    }}
                  >
                    <option>Please select...</option>
                    {accounts.map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.name} — {account.currency}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Account to</Form.Label>
                  <Form.Select
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setTransferData({
                        ...transferData,
                        account_to_id: Number(e.target.value),
                      });
                    }}
                  >
                    <option>Please select...</option>
                    {accounts.map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.name} — {account.currency}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" form="add-transfer-form" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
