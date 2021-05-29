import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

interface Props {
  history: any;
}
const useStyles = makeStyles({
  paper: {
    width: "100vw",
    height: "40vh",
    marginRight: 10,
    marginTop: 0,
    backgroundPosition: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
  },
  avatar: {
    width: "9.5rem",
    height: "9.5rem",
  },
  container: {
    marginTop: -100,
    marginBottom: 40,
  },
  typography: {
    fontFamily: "Raleway",
    color: "black",
    fontWeight: 500,
  },
  card: {
    maxWidth: 345,
  },
});
const CustomerDetails: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const customer = history.location.state;
  return (
    <>
      <Paper elevation={6} className={classes.paper} />

      <Box
        display="flex"
        alignItems="center"
        maxWidth="100vw"
        justifyContent="center"
        className={classes.container}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt="Remy Sharp"
            src={customer.avatarUrl}
            className={classes.avatar}
          />
          <Typography
            component="h6"
            variant="h6"
            className={classes.typography}
          >
            {customer.name}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {customer.bids && customer.bids.length > 0 ? (
            customer.bids.map((bids: any) => {
              const createdDate = new Date(
                Number(bids.created)
              ).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
              });
              return (
                <Grid item md={3} xs={6} key={bids.id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {bids.carTitle}
                      </Typography>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          ${bids.amount}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {createdDate}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
            >
              <img
                alt="not available"
                src="https://powerusers.microsoft.com/t5/image/serverpage/image-id/181811i232573FD6EB86A11/image-size/medium?v=v2&px=400"
              ></img>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default CustomerDetails;
