import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
  List,
  ListItem,
} from "@mui/material";
import { FiCheckCircle } from "react-icons/fi";

const plans = [
  { name: "Basic", price: "Free", features: ["Feature 1", "Feature 2", "Feature 3"] },
  { name: "Pro", price: "$9.99/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
  { name: "Premium", price: "$19.99/month", features: ["All Features", "Priority Support"] },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" style={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", color: "#333" }}
      >
        Choose Your Plan
      </Typography>

      <Grid container spacing={4} justifyContent="center" style={{ marginTop: "40px" }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              variant="outlined"
              style={{
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  align="center"
                  style={{ fontWeight: "600", color: "#007bff" }}
                >
                  {plan.name}
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  align="center"
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {plan.price}
                </Typography>

                <List style={{ marginTop: "20px" }}>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} style={{ display: "flex", alignItems: "center" }}>
                      <FiCheckCircle style={{ color: "#28a745", marginRight: "10px" }} />
                      <Typography style={{ color: "#555" }}>{feature}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  style={{
                    borderRadius: "8px",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Pricing;
