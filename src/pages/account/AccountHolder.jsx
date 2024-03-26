import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAccountHolder } from "../../services/account/AccountService";
import { toast } from "react-toastify";
import Base from "../../components/Base";

const AccountHolder = () => {
  const [accountHolderContent, setAccountHolderContent] = useState(null);

  useEffect(() => {
    getAccountHolder()
      .then((data) => {
        setAccountHolderContent(data);
        console.log("Account Details ", data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Account Holder...");
      });
  }, []);

  return (
    <Base>
      <Container className="mt-3">
        <Box sx={{ flexGrow: 1 }}>
          {/* {JSON.stringify(accountHolderContent)} */}
          <Container className="text-center mt-2">
            <CardHeader>
              <h3>List Of Account Details </h3>
            </CardHeader>
          </Container>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="mt-1"
          >
            {accountHolderContent &&
              accountHolderContent.items.map((holder) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={holder.id}>
                  <Card sx={{ maxWidth: 345, height: 200 }} color="dark">
                    {/* {JSON.stringify(holder)} */}
                    <CardContent>
                      <Typography gutterBottom variant="body2" component="div">
                        <strong>Name : </strong>
                        {holder.accountHolder}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>E - Mail :</strong>
                        {holder.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Date Of Request :</strong>
                        {holder.dateOfRequest}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Initial Balance :</strong>
                        {holder.initialBalance}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Account Type : </strong>
                        {holder.accountType.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </Base>
  );
};

export default AccountHolder;
