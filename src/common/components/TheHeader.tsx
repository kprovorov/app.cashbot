import React, { PropsWithChildren } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CreateTransferButton from "../../transfers/components/CreateTransferButton";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import { Button } from "react-bootstrap";

export default function TheHeader({
  onCreated,
}: PropsWithChildren<{ onCreated: () => void }>) {
  return (
    <>
      <Navbar bg="dark" expand={true} fixed="top" variant="dark">
        <Container fluid className="d-flex align-items-center">
          <div>
            <Navbar.Brand href="/">
              <img height="20" src="logo.svg" alt="cashbot" />
            </Navbar.Brand>
            <CreateTransferButton onCreated={onCreated} />
            <CreatePaymentButton onCreated={onCreated} />
          </div>
          <Button
            size="sm"
            as="a"
            href={`${process.env.REACT_APP_ID_URL}/login`}
            variant="dark"
          >
            Login
          </Button>
        </Container>
      </Navbar>
    </>
  );
}
