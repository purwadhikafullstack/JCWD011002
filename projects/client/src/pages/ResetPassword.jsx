import { Grid, GridItem } from "@chakra-ui/react";
import ResetPassword from "../components/ResetPassword";

const container = {
  // minH : "80vh",
  h: "fit-content",
  w: "full",
  templateColumns: "repeat(2, 1fr)",
};

const banner = {
  bgImage: "url(/images/reset_password.jpg)",
  bgPos: "center",
  bgSize: "cover",
  filter: "brightness(80%)",
};

function ResetPasswordPage() {
  return (
    <Grid {...container}>
      <GridItem {...banner}></GridItem>
      <GridItem>
        <ResetPassword />
      </GridItem>
    </Grid>
  );
}

export default ResetPasswordPage;
